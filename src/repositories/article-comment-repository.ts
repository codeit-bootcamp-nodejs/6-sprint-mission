// TODO) Article-Comment-Repository: DB 저장소
import type { Prisma } from '@prisma/client';
import prisma from '../config/prisma.js';

export const articleCommentRepo = {
  // 1) 댓글 목록 조회
  findByArticle(articleId: number) {
    return prisma.articleComment.findMany({
      where: { articleId },
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
  findById(id: number) {
    return prisma.articleComment.findUnique({
      where: { id },
      select: {
        id: true,
        articleId: true,
        content: true,
        createdAt: true,
        userId: true,
      },
    });
  },

  // 3) 댓글 생성
  create(data: Prisma.ArticleCommentUncheckedCreateInput) {
    return prisma.articleComment.create({ data });
  },

  // 4) 댓글 수정
  update(id: number, data: Prisma.ArticleCommentUpdateInput) {
    return prisma.articleComment.update({
      where: { id },
      data,
    });
  },

  // 5) 댓글 삭제
  remove(id: number) {
    return prisma.articleComment.delete({
      where: { id },
    });
  },
};
