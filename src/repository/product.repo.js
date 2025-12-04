import prisma from '../lib/prismaClient.js';

async function post(data) {
  return await prisma.product.create({ data });
}

async function patch(id, productData) {
  return await prisma.product.update({
    where: { id },
    data: productData,
    include: { comments: true, likedUsers: true }
  });
}

async function erase(id) {
  return await prisma.product.delete({ where: { id } });
}

async function countById(id) {
  return await prisma.product.count({ where: { id } });
}

async function getList(where, orderBy, offset, limit) {
  return await prisma.product.findMany({
    skip: parseInt(offset) || 0, // offset 방식 페이지네이션: default 0
    take: parseInt(limit) || 10, // default 10
    orderBy,
    where
  });
}

async function findById(id) {
  return await prisma.product.findFirstOrThrow({
    where: { id },
    include: { comments: true, likedUsers: true } // 관계형 필드도 일단 가져온다
  });
}

export default {
  post,
  patch,
  erase,
  findById,
  countById,
  getList
};
