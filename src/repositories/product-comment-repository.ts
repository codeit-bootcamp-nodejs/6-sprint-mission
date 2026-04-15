// TODO) Product-Comment-Repository: DB 저장소
import type { Prisma } from '@prisma/client';
import prisma from '../config/prisma.js';

export const productCommentRepo = {
  // 1) 댓글 목록 조회
  findCommentsByProduct(productId: number) {
    return prisma.productComment.findMany({
      where: { productId },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        content: true,
        createdAt: true,
        userId: true,
      },
    });
  },

  // 2) 특정 댓글 조회
  findProductCommentById(id: number) {
    return prisma.productComment.findUnique({
      where: { id },
      select: {
        id: true,
        productId: true,
        content: true,
        createdAt: true,
        userId: true,
      },
    });
  },

  // 3) 댓글 생성
  createProductComment(data: Prisma.ProductCommentUncheckedCreateInput) {
    return prisma.productComment.create({ data });
  },

  // 4) 댓글 수정
  updateProductComment(id: number, data: Prisma.ProductCommentUpdateInput) {
    return prisma.productComment.update({ where: { id }, data });
  },

  // 5) 댓글 삭제
  deleteProductComment(id: number) {
    return prisma.productComment.delete({ where: { id } });
  },
};
