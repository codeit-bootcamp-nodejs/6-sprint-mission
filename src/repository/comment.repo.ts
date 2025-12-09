import prisma from '../lib/prismaClient';
import { Prisma } from '@prisma/client';

async function getList(where: object, type: string, limit: number, cursor: number | undefined) {
  return await prisma.comment.findMany({
    skip: cursor ? 1 : 0, // 첫 검색 0, 이후 1
    take: limit, // default 10
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

async function findById(id: number) {
  return await prisma.comment.findUniqueOrThrow({
    where: { id }
  });
}

async function post(data: Prisma.CommentCreateInput) {
  return await prisma.comment.create({ data });
}

async function patch(id: number, commentData: Prisma.CommentUpdateInput) {
  return await prisma.comment.update({
    where: { id },
    data: commentData
  });
}

async function erase(id: number) {
  return await prisma.comment.delete({ where: { id } });
}

export default {
  getList,
  findById,
  post,
  patch,
  erase
};
