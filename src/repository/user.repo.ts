import prisma from '../lib/prismaClient';
import { Prisma, User, Product, Article } from '@prisma/client';

async function getList(): Promise<User[]> {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

async function create(data: Prisma.UserCreateInput): Promise<User> {
  return await prisma.user.create({ data });
}

async function findByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({ where: { email } });
}

async function findById(id: number): Promise<
  Prisma.UserGetPayload<{
    include: {
      products: true;
      articles: true;
      comments: true;
      likedProducts: true;
      likedArticles: true;
    };
  }>
> {
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

async function patch(id: number, userData: Prisma.UserUpdateInput): Promise<User> {
  return prisma.user.update({
    where: { id },
    data: userData
  });
}

async function getProducts(userId: number): Promise<Product[]> {
  return prisma.product.findMany({
    where: { userId }
  });
}

async function getArticles(userId: number): Promise<Article[]> {
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
