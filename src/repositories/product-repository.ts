// TODO) Product-Repository: DB 저장소
import type { Prisma } from '@prisma/client';
import prisma from '../config/prisma.js';

export const productRepo = {
  // 1) 상품 목록 조회
  findProducts(
    where: Prisma.ProductWhereInput,
    orderBy: Prisma.ProductOrderByWithRelationInput,
    offset: number,
    limit: number
  ) {
    return prisma.product.findMany({
      where,
      orderBy,
      skip: offset,
      take: limit,
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        createdAt: true,
        imagePath: true,
      },
    });
  },

  // 2) 상품 단건 조회
  findProductById(id: number) {
    return prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        stock: true,
        imagePath: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
    });
  },

  // 3) 상품 생성
  createProduct(data: Prisma.ProductUncheckedCreateInput) {
    return prisma.product.create({ data });
  },

  // 4) 상품 수정
  updateProduct(id: number, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({ where: { id }, data });
  },

  // 5) 상품 삭제
  deleteProduct(id: number) {
    return prisma.product.delete({ where: { id } });
  },

  // 6) 상품 구매 트랜잭션
  purchaseProductTx(productId: number, quantity: number, unitPrice: number) {
    return prisma.$transaction(async (pr) => {
      // 6-1) 재고 감소
      const updated = await pr.product.update({
        where: { id: productId },
        data: { stock: { decrement: quantity } },
        select: { id: true, name: true, stock: true },
      });

      // 6-2) 구매 이력
      const purchase = await pr.purchase.create({
        data: { productId, quantity, unitPrice },
      });

      return { updated, purchase };
    });
  },

  // 7) 유저가 등록한 상품 조회
  findProductsByUser(userId: number) {
    return prisma.product.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        imagePath: true,
        createdAt: true,
      },
    });
  },
};
