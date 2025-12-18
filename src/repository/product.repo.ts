import prisma from '../lib/prismaClient';
import { Prisma, Product } from '@prisma/client';

async function post(data: Product) {
  return await prisma.product.create({
    data
    // user: { connect: { id: userId } }
  });
}

async function patch(id: number, productData: Prisma.ProductUpdateInput) {
  return await prisma.product.update({
    where: { id },
    data: productData,
    include: { comments: true, likedUsers: true }
  });
}

async function erase(id: number) {
  return await prisma.product.delete({ where: { id } });
}

async function countById(id: number) {
  return await prisma.product.count({ where: { id } });
}

async function getList(where: object, orderBy: object, offset: number, limit: number) {
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
