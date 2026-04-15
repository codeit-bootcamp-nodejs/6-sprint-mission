// TODO) Article-Like-Repository: 게시글 좋아요 저장소
import prisma from '../config/prisma.js';

export const articleLikeRepo = {
  // 1) 좋아요 조회
  findArticleLike(userId: number, articleId: number) {
    return prisma.articleLike.findUnique({
      where: { userId_articleId: { userId, articleId } },
    });
  },

  // 2) 좋아요 등록
  createArticleLike(userId: number, articleId: number) {
    return prisma.articleLike.create({ data: { userId, articleId } });
  },

  // 3) 좋아요 취소
  deleteArticleLike(userId: number, articleId: number) {
    return prisma.articleLike.delete({
      where: { userId_articleId: { userId, articleId } },
    });
  },

  // 4) 좋아요 목록 조회
  listLikedArticles(userId: number) {
    return prisma.articleLike.findMany({
      where: { userId },
      select: {
        article: {
          select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
          },
        },
      },
    });
  },
};
