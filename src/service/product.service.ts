import { assert } from 'superstruct';
import { includedOk } from '../lib/myFuns';
import productRepo from '../repository/product.repo';
import { PatchProduct } from '../struct/userStruct';
import { selectFields } from '../lib/selectFields';
import {
  CreateProductDto,
  UpdateProductDto,
  CreateNotificationDto,
  CreateProductPriceHistoryDto
} from '../dto/dto';
import { Prisma, Product, ProductPriceHistory, NotificationType } from '@prisma/client';
import NotFoundError from '../middleware/errors/NotFoundError';
import { ProductListToShow, ProductToShow } from '../dto/interfaceType';
import prisma from '../lib/prismaClient';
import {
  CreateProduct,
  CreateProductPriceHistory,
  CreateNotification
} from '../struct/productStruct';
import { getIO } from '../websocket/socketIO';

async function post(data: CreateProductDto): Promise<[Product, ProductPriceHistory]> {
  assert(data, CreateProduct);
  const { userId, ...rest } = data;
  const productData = { ...rest, user: { connect: { id: userId } } } as Prisma.ProductCreateInput;

  const { product, newPriceRecord } = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const product = await tx.product.create({ data: productData });

      const priceData = {
        price: data.price,
        product: { connect: { id: product.id } }
      } as Prisma.ProductPriceHistoryCreateInput;

      assert({ productId: product.id, price: data.price }, CreateProductPriceHistory);
      const newPriceRecord = await tx.productPriceHistory.create({ data: priceData });
      return { product, newPriceRecord };
    }
  );
  return [product, newPriceRecord];
}

async function patch(productId: number, productData: UpdateProductDto): Promise<Product> {
  assert(productData, PatchProduct);
  const prevPrice = await priceToBeChanged(productId, productData);
  let newProduct;

  // 상품 가격 변동이 있는 경우, 가격 변동 기록 생성
  if (Number(prevPrice)) {
    const priceData = {
      prevPrice,
      price: productData.price,
      productId
    } as CreateProductPriceHistoryDto;
    assert(priceData, CreateProductPriceHistory);

    const priceDataToRepo = {
      prevPrice,
      price: productData.price,
      product: { connect: { id: productId } }
    } as Prisma.ProductPriceHistoryCreateInput;

    const product = await productRepo.findById(productId);
    if (!product) throw new NotFoundError('product', productId);

    let priceRecord;
    let notifications = [];

    // 그 상품에 좋아요를 누른 사람이 있는 경우 알림 생성
    if (product.likedUsers.length !== 0) {
      const message = `상품${productId} 가격 변동 알림: (${prevPrice} --> ${productData.price})`;

      for (let likedUser of product.likedUsers) {
        let notificationData = {
          userId: likedUser.id,
          type: NotificationType.PRODUCT,
          message,
          productId
        } as CreateNotificationDto;
        assert(notificationData, CreateNotification);
      }

      const notificationQueries = product.likedUsers.map((likedUser) =>
        prisma.notification.create({
          data: {
            user: { connect: { id: likedUser.id } },
            type: NotificationType.PRODUCT,
            message: message,
            product: { connect: { id: productId } }
          } as Prisma.NotificationCreateInput
        })
      );

      [priceRecord, newProduct, ...notifications] = await prisma.$transaction([
        prisma.productPriceHistory.create({ data: priceDataToRepo }),
        prisma.product.update({ data: productData, where: { id: productId } }),
        ...notificationQueries
      ]);

      const io = getIO();
      for (const likeUser of product.likedUsers) {
        io.to(`user:${likeUser.id}`).emit('notification', { message });
      }
    } else {
      // 좋아요를 누른 유저가 없는 상품인 경우 알림 없음
      [priceRecord, newProduct] = await prisma.$transaction([
        prisma.productPriceHistory.create({ data: priceDataToRepo }),
        prisma.product.update({ data: productData, where: { id: productId } })
      ]);
    }
  } else {
    newProduct = await productRepo.patch(productId, productData);
  }

  if (!newProduct) throw new NotFoundError('product', productId);
  return newProduct;
}

async function erase(productId: string): Promise<void> {
  await productRepo.erase(Number(productId));
}

// 상품 목록 조회
// 조회 필드: id, name, price, createdAt
// 페이지네이션: offset 방식 (default: offset=0, limit=10)
// 조회순: order='recent'(default)/'oldest'
// 조건 검색: namd and/or description에 포함된 단어
async function getList(
  offset: number,
  limit: number,
  orderStr: string,
  nameStr: string | undefined,
  descriptionStr: string | undefined
): Promise<ProductListToShow[]> {
  const orderBy = { createdAt: 'desc' };
  if (orderStr === 'oldest') {
    orderBy.createdAt = 'asc';
  } else orderBy.createdAt = 'desc';

  const where = { name: { contains: '' }, description: { contains: '' } };
  if (nameStr) where.name = { contains: nameStr };
  if (descriptionStr) where.description = { contains: descriptionStr };

  const products = await productRepo.getList(where, orderBy, offset, limit);
  const productsToShow = products.map((p) => {
    const { id, name, price, createdAt, ...rest } = p;
    return { id, name, price, createdAt };
  });

  return productsToShow;
}

// 상품 상세 조회
// 조회 필드: id, name, description, price, tags, createdAt
async function get(
  userId: number | undefined,
  productId: string
): Promise<ProductToShow | Product> {
  const product = await productRepo.findById(Number(productId));
  const product2show = selectFields(product);
  if (!userId) return product2show;
  const isLiked = includedOk(product.likedUsers, 'id', userId);
  return { isLiked, ...product2show };
}

// 좋아요와 좋아요취소 토글
async function likeToggle(userId: number, productId: string): Promise<ProductToShow> {
  const product = await productRepo.findById(Number(productId));

  const isLiked = includedOk(product.likedUsers, 'id', userId);

  const updated = isLiked
    ? await productRepo.cancelLike(Number(productId), userId)
    : await productRepo.like(Number(productId), userId);

  console.log(isLiked ? 'Now, not your favorite product' : 'Now, your favorite product');

  const product2show = selectFields(updated);

  return {
    isLiked: !isLiked,
    ...product2show
  };
}

//-----------------------------------

async function priceToBeChanged(productId: number, productData: UpdateProductDto): Promise<Number> {
  if (productData.price === undefined) return 0;

  const currentProduct = await productRepo.findById(productId);
  if (!currentProduct) throw new NotFoundError('product', productId);
  if (productData.price === currentProduct.price) return 0;
  return currentProduct.price;
}

export default {
  post,
  patch,
  erase,
  getList,
  get,
  likeToggle
};
