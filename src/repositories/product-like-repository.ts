// TODO) Product-Like-Repository: 상품 좋아요 저장소
import prisma from '../config/prisma.js';

export const productLikeRepo = {
  // 1) 좋아요 조회
  findProductLike(userId: number, productId: number) {
    return prisma.productLike.findUnique({
      where: { userId_productId: { userId, productId } },
    });
  },

  // 2) 좋아요 등록
  createProductLike(userId: number, productId: number) {
    return prisma.productLike.create({ data: { userId, productId } });
  },

  // 3) 좋아요 취소
  deleteProductLike(userId: number, productId: number) {
    return prisma.productLike.delete({
      where: { userId_productId: { userId, productId } },
    });
  },

  // 4) 좋아요 목록 조회
  listLikedProducts(userId: number) {
    return prisma.productLike.findMany({
      where: { userId },
      select: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            imagePath: true,
            createdAt: true,
          },
        },
      },
    });
  },

  // 5) 상품 좋아요 유저 목록 조회
  listUserIdsByProduct(productId: number) {
    return prisma.productLike.findMany({
      where: { productId },
      select: { userId: true },
    });
  },
};
