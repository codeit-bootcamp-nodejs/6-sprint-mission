import prisma from '../lib/prismaClient.js';
import { Prisma } from '@prisma/client';

async function getList() {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, email: true, nickname: true, createdAt: true }
  });
}

async function create(data: Prisma.UserCreateInput) {
  return await prisma.user.create({ data });
}

async function findByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

async function findById(id: number) {
  return await prisma.user.findUniqueOrThrow({
    where: { id },
    include: {
      products: true,
      articles: true,
      comments: true,
      likedProducts: true,
      likedArticles: true
    }
  });
}

async function patch(id: number, userData: Prisma.UserUpdateInput) {
  return prisma.user.update({
    where: { id },
    data: userData
  });
}

async function getProducts(userId: number) {
  return prisma.product.findMany({
    where: { userId }
  });
}

async function getArticles(userId: number) {
  return prisma.article.findMany({
    where: { userId }
  });
}

export default {
  getList,
  create,
  patch,
  findByEmail,
  findById,
  getProducts,
  getArticles
};
