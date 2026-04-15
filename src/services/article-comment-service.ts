// TODO) Article-Comment-Service: 비즈니스 로직 처리
import { NotFoundError, ForbiddenError } from '../core/error/error-handler.js';
import { assertContent } from '../utils/to-content.js';

import { articleCommentRepo } from '../repositories/article-comment-repository.js';
import { articleRepo } from '../repositories/article-repository.js';
import { notificationService } from './notification-service.js';

export const articleCommentService = {
  // 1) 댓글 목록 조회
  async list(articleId: number) {
    // 1-1) 댓글 대상 게시글 조회
    const article = await articleRepo.findArticleById(articleId);

    // 1-2) 게시글 검증
    if (!article) {
      throw new NotFoundError('게시글을 찾을 수 없습니다');
    }

    return articleCommentRepo.findByArticle(articleId);
  },

  // 2) 댓글 생성
  async create(
    { articleId, content }: { articleId: number; content: string },
    userId: number
  ) {
    // 2-1) 타입 string 변환
    const body = assertContent(content);

    // 2-2) 댓글 대상 게시글 조회
    const article = await articleRepo.findArticleById(articleId);

    // 2-3) 게시글 검증
    if (!article) {
      throw new NotFoundError('게시글을 찾을 수 없습니다');
    }

    const comment = await articleCommentRepo.create({
      articleId,
      content: body,
      userId,
    });

    await notificationService.create({
      userId: article.userId,
      type: 'ARTICLE_COMMENTED',
      message: `"${article.title}"에 새로운 댓글이 달렸습니다`,
      articleId: article.id,
    });

    return comment;
  },

  // 3) 댓글 수정
  async update(id: number, content: string, userId: number) {
    // 3-1) 타입 string 변환
    const body = assertContent(content);

    // 3-2) 기존 댓글 조회
    const exists = await articleCommentRepo.findById(id);

    // 3-3) 댓글 검증
    if (!exists) {
      throw new NotFoundError('댓글을 찾을 수 없습니다');
    }

    // 3-4) 권한 검증
    if (exists.userId !== userId) {
      throw new ForbiddenError('댓글 수정 권한이 없습니다.');
    }

    return articleCommentRepo.update(id, { content: body });
  },

  // 4) 댓글 삭제
  async remove(id: number, userId: number) {
    // 4-1) 기존 댓글 조회
    const exists = await articleCommentRepo.findById(id);

    // 4-2) 댓글 검증
    if (!exists) {
      throw new NotFoundError('댓글을 찾을 수 없습니다');
    }

    // 4-3) 권한 검증
    if (exists.userId !== userId) {
      throw new ForbiddenError('댓글 삭제 권한이 없습니다.');
    }

    return articleCommentRepo.remove(id);
  },
};
