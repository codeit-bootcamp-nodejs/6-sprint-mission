// TODO) Article-Repository: DB 저장소
import type { Prisma } from '@prisma/client';
import prisma from '../config/prisma.js';

export const articleRepo = {
  // 1) 게시글 목록 조회
  findArticles(
    where: Prisma.ArticleWhereInput,
    orderBy: Prisma.ArticleOrderByWithRelationInput,
    offset: number,
    limit: number
  ) {
    return prisma.article.findMany({
      where,
      orderBy,
      skip: offset,
      take: limit,
      select: { id: true, title: true, content: true, createdAt: true },
    });
  },

  // 2) 게시글 단건 조회
  findArticleById(id: number) {
    return prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
    });
  },

  // 3) 게시글 생성
  createArticle(data: Prisma.ArticleUncheckedCreateInput) {
    return prisma.article.create({ data });
  },

  // 4) 게시글 수정
  updateArticle(id: number, data: Prisma.ArticleUpdateInput) {
    return prisma.article.update({ where: { id }, data });
  },

  // 5) 게시글 삭제
  deleteArticle(id: number) {
    return prisma.article.delete({ where: { id } });
  },
};
