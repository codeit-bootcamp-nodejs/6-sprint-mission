import prisma from '../lib/prismaClient';
import { Article, Prisma } from '@prisma/client';

async function post(data: Article) {
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

async function getList(where: object, orderBy: object, offset: number, limit: number) {
  return await prisma.article.findMany({
    skip: offset, // default 0
    take: limit, // default 10
    orderBy,
    where
  });
}

async function findById(
  id: number
): Promise<Prisma.ArticleGetPayload<{ include: { comments: true; likedUsers: true } }>> {
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
