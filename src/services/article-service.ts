// TODO) Article-Service: 비즈니스 로직 처리
import type { Prisma } from '@prisma/client';
import {
  NotFoundError,
  ValidationError,
  ForbiddenError,
} from '../core/error/error-handler.js';
import { toIntOrThrow } from '../utils/to-int.js';
import {
  ARTICLE_ORDER,
  ARTICLE_ORDER_MAP,
  DEFAULT_ARTICLE_ORDER,
} from '../constants/article.js';

import { articleRepo } from '../repositories/article-repository.js';
import { articleLikeRepo } from '../repositories/article-like-repository.js';

export const articleService = {
  // 1) 게시글 목록 조회
  async list(query: Record<string, unknown>) {
    // 1-1) 쿼리 파라미터 기본값 분리
    const { offset = 0, limit = 10, order = DEFAULT_ARTICLE_ORDER, q } = query;

    // 1-2) offset 타입 number 변환
    const skip = toIntOrThrow(offset, 'offset');

    // 1-3) limit 타입 number 변환
    const take = toIntOrThrow(limit, 'limit');

    // 1-4) 정렬 키 타입 string 변환
    const orderKey = String(
      order || DEFAULT_ARTICLE_ORDER
    ).toLowerCase() as (typeof ARTICLE_ORDER)[keyof typeof ARTICLE_ORDER];

    // 1-5) 정렬 매핑 조회
    const orderBy = ARTICLE_ORDER_MAP[orderKey];

    // 1-6) 정렬 검증
    if (!orderBy) {
      throw new ValidationError(
        'order',
        `${Object.keys(ARTICLE_ORDER_MAP).join(', ')} 중 하나여야 합니다`
      );
    }

    // 1-7) 검색 조건(where) 구성
    const where: Prisma.ArticleWhereInput = {};

    // 1-8) 검색 조건 있을 시 조건 반환, 없으면 전체 목록 반환
    if (q) {
      where.OR = [
        { title: { contains: String(q), mode: 'insensitive' as const } },
        { content: { contains: String(q), mode: 'insensitive' as const } },
      ];
    }

    return articleRepo.findArticles(where, orderBy, skip, take);
  },

  // 2) 게시글 조회
  async getOrThrow(id: number) {
    // 2-1) 게시글 조회
    const article = await articleRepo.findArticleById(id);

    // 2-3) 게시글 검증
    if (!article) {
      throw new NotFoundError('게시글을 찾을 수 없습니다');
    }

    return article;
  },

  // 3) 게시글 생성
  async create(data: Prisma.ArticleUncheckedCreateInput, userId: number) {
    return await articleRepo.createArticle({ ...data, userId });
  },

  // 4) 게시글 수정
  async update(id: number, data: Prisma.ArticleUpdateInput, userId: number) {
    // 4-1) 게시글 조회
    const article = await articleRepo.findArticleById(id);

    // 4-3) 게시글 검증
    if (!article) throw new NotFoundError('게시글을 찾을 수 없습니다');

    // 4-4) 권한 검증
    if (article.userId !== userId) {
      throw new ForbiddenError('게시글 수정 권한이 없습니다.');
    }

    return articleRepo.updateArticle(id, data);
  },

  // 5) 게시글 삭제
  async remove(id: number, userId: number) {
    // 5-1) 게시글 조회
    const article = await articleRepo.findArticleById(id);

    // 5-3) 게시글 검증
    if (!article) throw new NotFoundError('게시글을 찾을 수 없습니다');

    // 5-4) 권한 검증
    if (article.userId !== userId) {
      throw new ForbiddenError('게시글 삭제 권한이 없습니다.');
    }

    return articleRepo.deleteArticle(id);
  },

  // 6) 좋아요 여부 확인
  async isLiked(userId: number, articleId: number) {
    const like = await articleLikeRepo.findArticleLike(userId, articleId);

    return Boolean(like);
  },
};
