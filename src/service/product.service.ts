import { assert } from 'superstruct';
import { isEmpty, includedOk } from '../lib/myFuns';
import productRepo from '../repository/product.repo';
import { CreateProduct, PatchProduct } from '../struct/structs';
import { selectFields } from '../lib/selectFields';
import { CreateProductDto, UpdateProductDto } from '../dto/dto';
import { Product } from '@prisma/client';
import NotFoundError from '../middleware/errors/NotFoundError';

async function post(userId: number, data: CreateProductDto): Promise<Product> {
  const productData = { ...data, userId };
  assert(productData, CreateProduct);
  const product = await productRepo.post(productData);
  return product;
}

async function patch(productId: string, productData: UpdateProductDto) {
  assert(productData, PatchProduct);
  const product = await productRepo.patch(Number(productId), productData);
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
  const product2show = selectFields(product);
  if (!userId) return product2show;
  const isLiked = includedOk(product.likedUsers, 'id', userId);
  return { isLiked, ...product2show };
}

// 좋아요와 좋아요취소 토글
async function likeToggle(userId: number, productId: string) {
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

export default {
  post,
  patch,
  erase,
  getList,
  get,
  likeToggle
};
