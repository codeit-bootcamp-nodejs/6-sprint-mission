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

async function patch(productId, productData) {
  assert(productData, PatchProduct);
  const product = await productRepo.patch(productId, productData);
  if (isEmpty(product)) throw new Error('NOT_FOUND');
  return product;
}

async function erase(productId) {
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
  const product = await productRepo.findById(productId);

  // 댓글은 조회 요구 필드가 아니지만....userId와 content만 남기고 삭제
  product.comments = product.comments.map((c) => {
    return c.userId, c.content;
  });
  // likedUsers는 조회 요구 필드가 아니지만....nickname만 남기고 삭제
  product.likedUsers = product.likedUsers.map((u) => {
    return u.nickname;
  });

  const { updatedAt, imageUrls, ...rest } = product; // 조회 항목 선택

  return rest;
}

async function like(userId, productId) {
  let product = await productRepo.findById(Number(productId));
  if (product.likedUsers.find((n) => n.id === userId)) {
    console.log('Already one of your liked products');
  } else {
    console.log('Now, one of your liked products');
    product = await productRepo.patch(Number(productId), {
      likedUsers: { connect: { id: userId } }
    });
  }
  return { isLiked: true, ...product };
}

async function cancelLike(userId, productId) {
  let product = await productRepo.findById(Number(productId));
  if (!product.likedUsers.find((n) => n.id === userId)) {
    console.log('Already not one of your liked products');
  } else {
    console.log('Now, not one of your liked products');
    product = await productRepo.patch(Number(productId), {
      likedUsers: { disconnect: { id: userId } }
    });
  }
  return { isLiked: false, ...product };
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
