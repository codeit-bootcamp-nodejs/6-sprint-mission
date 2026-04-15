// TODO) Article-Comment-Routes: URL 매핑
import { Router } from 'express';
import asyncHandler from '../core/error/async-handler.js';
import { requireAuth } from '../middleware/auth.js';

import validate, { validateParams } from '../validator/validate.js';
import {
  ArticleCommentIdParams,
  ArticleCommentParams,
  CreateArticleComment,
  PatchArticleComment,
} from '../validator/article-comment-validator.js';

import { articleCommentController } from '../controllers/article-comment-controller.js';

const router = Router();

// 1) 댓글 목록 조회
router.get(
  '/:articleId',
  validateParams(ArticleCommentParams),
  asyncHandler(articleCommentController.list)
);

// 2) 댓글 생성
router.post(
  '/',
  requireAuth,
  validate(CreateArticleComment),
  asyncHandler(articleCommentController.create)
);

// 3) 댓글 수정
router.patch(
  '/:id',
  requireAuth,
  validateParams(ArticleCommentIdParams),
  validate(PatchArticleComment),
  asyncHandler(articleCommentController.update)
);

// 4) 댓글 삭제
router.delete(
  '/:id',
  requireAuth,
  validateParams(ArticleCommentIdParams),
  asyncHandler(articleCommentController.remove)
);

export default router;
