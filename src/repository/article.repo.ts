import prisma from '../lib/prismaClient.js';
import { Prisma } from '@prisma/client';

async function post(data: Prisma.ArticleCreateInput) {
  return await prisma.article.create({ data });
}

async function patch(id: number, articleData: Prisma.ArticleUpdateInput) {
  return prisma.article.update({
    where: { id },
    data: articleData,
    include: { comments: true, likedUsers: true }
  });
}

async function erase(id: number) {
  return prisma.article.delete({ where: { id } });
}

async function getList(where: object, orderBy: object, offset: string, limit: string) {
  return await prisma.article.findMany({
    skip: parseInt(offset) || 0,
    take: parseInt(limit) || 10,
    orderBy,
    where
  });
}

async function findById(id: number) {
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
