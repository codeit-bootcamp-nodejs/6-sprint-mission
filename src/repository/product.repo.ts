import { CreateProductDto } from '../types/dto';
import prisma from '../lib/prismaClient';
import { Prisma, Product, ProductPriceHistory } from '@prisma/client';
import NotFoundError from '../middleware/errors/NotFoundError';

async function post(data: CreateProductDto): Promise<Product> {
  return await prisma.product.create({ data });
}

async function patch(
  id: number,
  productData: Prisma.ProductUpdateInput
): Promise<Prisma.ProductGetPayload<{ include: { comments: true; likedUsers: true } }>> {
  return await prisma.product.update({
    where: { id },
    data: productData,
    include: { comments: true, likedUsers: true }
  });
}

async function like(
  productId: number,
  userId: number
): Promise<Prisma.ProductGetPayload<{ include: { likedUsers: true } }>> {
  return await prisma.product.update({
    where: { id: productId },
    data: { likedUsers: { connect: { id: userId } } },
    include: { likedUsers: true }
  });
}

async function cancelLike(
  productId: number,
  userId: number
): Promise<Prisma.ProductGetPayload<{ include: { likedUsers: true } }>> {
  return await prisma.product.update({
    where: { id: productId },
    data: { likedUsers: { disconnect: { id: userId } } },
    include: { likedUsers: true }
  });
}

async function erase(id: number): Promise<void> {
  await prisma.product.delete({ where: { id } });
}

async function countById(id: number): Promise<Number> {
  return await prisma.product.count({ where: { id } });
}

async function getList(
  where: object,
  orderBy: object,
  offset: number,
  limit: number
): Promise<Product[]> {
  return await prisma.product.findMany({
    skip: offset, // offset 방식 페이지네이션: default 0
    take: limit, // default 10
    orderBy,
    where
  });
}

async function findById(
  id: number
): Promise<Prisma.ProductGetPayload<{ include: { comments: true; likedUsers: true } }>> {
  return await prisma.product.findUniqueOrThrow({
    where: { id },
    include: { comments: true, likedUsers: true } // 관계형 필드도 일단 가져온다
  });
}

async function findImgUrls(id: number): Promise<string[]> {
  const result = await prisma.product.findUniqueOrThrow({
    where: { id },
    select: { imageUrls: true }
  });
  if (result.imageUrls) {
    throw new NotFoundError('imageUrls not found');
  }
  return result.imageUrls;
}

async function createPriceRecord(
  data: Prisma.ProductPriceHistoryCreateInput
): Promise<ProductPriceHistory> {
  return prisma.productPriceHistory.create({ data });
}

async function getPriceRecord(id: number): Promise<ProductPriceHistory | null> {
  return prisma.productPriceHistory.findUnique({ where: { id } });
}

async function getPriceRecords(productId: number): Promise<ProductPriceHistory[]> {
  return prisma.productPriceHistory.findMany({
    where: { productId },
    orderBy: { createdAt: 'asc' }
  });
}

export default {
  post,
  patch,
  like,
  cancelLike,
  erase,
  findById,
  findImgUrls,
  countById,
  getList,
  createPriceRecord,
  getPriceRecords,
  getPriceRecord
};
