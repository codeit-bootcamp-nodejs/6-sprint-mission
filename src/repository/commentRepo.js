import prisma from '../lib/prismaClient.js';

async function getList(where, type, limit, cursor) {
  return await prisma.comment.findMany({
    skip: cursor ? 1 : 0, // 첫 검색 0, 이후 1
    take: limit || 10, // 페이지 사이즈는 조정 가능 (default 10)
    cursor: cursor ? { id: cursor } : undefined, // 첫 검색 undefined, 이후 전 검색의 최종 id
    where, // type과 content에 포함된 단어로 조건 검색
    orderBy: { id: 'asc' }, // 조회순: id 오름순으로 고정
    select: {
      id: true,
      content: true,
      productId: type == 'article' ? false : true,
      articleId: type == 'product' ? false : true,
      createdAt: true,
      updatedAt: false
    }
  });
}

async function findById(id) {
  return await prisma.comment.findUniqueOrThrow({
    where: { id }
  });
}

async function post(data) {
  return await prisma.comment.create({ data });
}

async function patch(id, data) {
  return await prisma.comment.update({
    where: { id },
    data
  });
}

async function erase(id) {
  return await prisma.comment.delete({ where: { id } });
}

export default {
  getList,
  findById,
  post,
  patch,
  erase
};
