import { assert } from 'superstruct';
import { isEmpty } from '../lib/myFuns';
import productRepo from '../repository/product.repo';
import { CreateProduct, PatchProduct } from '../struct/structs';
import { selectProductFields } from '../lib/selectFields';
import { createProductDTO, updateProductDTO, updateUserDTO } from '../dto/dto';
import { Prisma } from '@prisma/client';
import NotFoundError from '../middleware/errors/NotFoundError';

async function post(userId: number, data: createProductDTO) {
  const productData = { ...data, userId };
  assert(productData, CreateProduct);
  const prismaData: Prisma.ProductCreateInput = {
    ...data, // name, description, price, tags, imageUrls 등
    user: { connect: { id: userId } } // userId → user 연결
  };
  const product = await productRepo.post(prismaData);
  //if (isEmpty(product)) throw new Error('NOT_FOUND');
  return product;
}

async function patch(productId: string, productData: updateProductDTO) {
  assert(productData, PatchProduct);
  const product = await productRepo.patch(
    Number(productId),
    productData as Prisma.ProductUpdateInput
  );
  if (isEmpty(product)) throw new NotFoundError('product', Number(productId));
  return product;
}

async function erase(productId: string) {
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
) {
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
async function get(userId: number | undefined, productId: string) {
  let product = await productRepo.findById(Number(productId));
  const product2show = selectProductFields(product);
  if (!userId) return product2show;
  const isLiked = product.likedUsers.some((u) => u.id === userId);
  return { isLiked, ...product2show };
}

async function like(userId: number, productId: string) {
  let product = await productRepo.findById(Number(productId));
  if (product.likedUsers.some((n) => n.id === userId)) {
    console.log('Already your favorite product');
  } else {
    console.log('Now, one of your favorite products');
    product = await productRepo.patch(Number(productId), {
      likedUsers: { connect: { id: userId } }
    });
  }
  const product2show = selectProductFields(product);
  return { isLiked: true, ...product2show };
}

async function cancelLike(userId: number, productId: string) {
  let product = await productRepo.findById(Number(productId));
  if (!product.likedUsers.some((n) => n.id === userId)) {
    console.log('Already not one of your liked products');
  } else {
    console.log('Now, not one of your liked products');
    product = await productRepo.patch(Number(productId), {
      likedUsers: { disconnect: { id: userId } }
    });
  }
  const product2show = selectProductFields(product);
  return { isLiked: false, ...product2show };
}

export default {
  post,
  patch,
  erase,
  getList,
  get,
  like,
  cancelLike
};
