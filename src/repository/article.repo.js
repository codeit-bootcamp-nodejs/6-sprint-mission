import prisma from '../lib/prismaClient.js';

async function post(data) {
  return await prisma.article.create({ data });
}

async function patch(id, articleData) {
  return prisma.article.update({
    where: { id },
    data: articleData,
    include: { comments: true, likedUsers: true }
  });
}

async function erase(id) {
  return prisma.article.delete({ where: { id } });
}

async function getList(where, orderBy, offset, limit) {
  return await prisma.article.findMany({
    skip: parseInt(offset) || 0,
    take: parseInt(limit) || 10,
    orderBy,
    where
  });
}

async function findById(id) {
  return prisma.article.findUniqueOrThrow({
    where: { id },
    include: { comments: true, likedUsers: true } // 관계형 필드도 일단 가져온다
  });
}

export default {
  post,
  patch,
  erase,
  findById,
  getList
};
