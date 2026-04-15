// TODO) Article-Like-Service: 비즈니스 로직 처리
import { NotFoundError, ConflictError } from '../core/error/error-handler.js';

import { articleRepo } from '../repositories/article-repository.js';
import { articleLikeRepo } from '../repositories/article-like-repository.js';

export const articleLikeService = {
  // 1) 게시글 좋아요 등록
  async like(userId: number, articleId: number) {
    // 1-1) 좋아요 대상 게시글 조회
    const article = await articleRepo.findArticleById(articleId);

    // 1-2) 게시글 검증
    if (!article) {
      throw new NotFoundError('게시글을 찾을 수 없습니다');
    }

    // 1-3) 기존 좋아요 여부 확인
    const existed = await articleLikeRepo.findArticleLike(userId, articleId);

    // 1-4) 좋아요 검증
    if (existed) {
      throw new ConflictError('이미 좋아요한 게시글입니다');
    }

    await articleLikeRepo.createArticleLike(userId, articleId);

    return { articleId, liked: true };
  },

  // 2) 게시글 좋아요 취소
  async unlike(userId: number, articleId: number) {
    // 2-1) 기존 좋아요 여부 조회
    const like = await articleLikeRepo.findArticleLike(userId, articleId);

    // 2-2) 좋아요 검증
    if (!like) {
      throw new NotFoundError('좋아요가 존재하지 않습니다');
    }

    await articleLikeRepo.deleteArticleLike(userId, articleId);

    return { articleId, liked: false };
  },

  // 3) 좋아요한 게시글 조회
  list(userId: number) {
    return articleLikeRepo.listLikedArticles(userId);
  },
};
