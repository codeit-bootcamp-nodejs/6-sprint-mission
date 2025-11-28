import { assert } from 'superstruct';
import { isEmpty } from '../lib/myFuns.js';
import productRepo from '../repository/productRepo.js';
import { CreateProduct, PatchProduct } from '../struct/structs.js';
import BadRequestError from '../middleware/errors/BadRequestError.js';

async function post(userId, Data) {
  const productData = { ...Data, userId };
  assert(productData, CreateProduct);

  const product = await productRepo.post(productData);
  if (isEmpty(product)) throw new Error('NOT_FOUND');
  return product;
}

async function patch(userId, productId, productData) {
  assert(productData, PatchProduct);
  await check_sameAuthor(userId, productId);

  const product = await productRepo.patch(productId, productData);
  if (isEmpty(product)) throw new Error('NOT_FOUND');
  return product;
}

async function erase(userId, productId) {
  await check_sameAuthor(userId, productId);
  await productRepo.erase(productId);
}

// 상품 목록 조회
// 조회 필드: id, name, price, createdAt
// 페이지네이션: offset 방식 (default: offset=0, limit=10)
// 조회순: order='recent'(default)/'oldest'
// 조건 검색: namd and/or description에 포함된 단어
async function getList(offset, limit, orderStr, nameStr, descriptionStr) {
  const orderBy = {};
  if (orderStr === 'oldest') {
    orderBy.createdAt = 'asc';
  } else orderBy.createdAt = 'desc';

  const where = {};
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
async function get(productId) {
  const product = await productRepo.get(productId);

  // 댓글을 조회하는 경우, updatedAt 필드 감춤
  // if (product.hasOwnProperty('comments')) {
  //   product.comments = product.comments.map(({ articleId, updatedAt, ...rest }) => rest);
  // }
  // const { updatedAt, imageUrls, comments, ...rest } = product;
  return product;
}

//-------------------------------------------------------- local functions
// async function check_productExist(productId) {
//   const productExist = await productRepository.countById(productId);
//   if (!productExist) throw new NotFoundError(product, productId);
// }

async function check_sameAuthor(userId, productId) {
  const product = await productRepo.findById(productId);
  if (userId !== product.userId) {
    print('Unauthorized');
    throw new BadRequestError('UNAUTHORIZED');
  }
}

export default {
  post,
  patch,
  erase,
  getList,
  get
};
