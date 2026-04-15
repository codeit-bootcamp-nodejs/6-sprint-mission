// TODO) Article-Like-Routes: URL 매핑
import { Router } from 'express';
import asyncHandler from '../core/error/async-handler.js';
import { requireAuth } from '../middleware/auth.js';
import { validateParams } from '../validator/validate.js';
import { ArticleParams } from '../validator/article-validator.js';

import { articleLikeController } from '../controllers/article-like-controller.js';

const router = Router();

// 1) 좋아요한 게시글 조회
router.get('/me/likes', requireAuth, asyncHandler(articleLikeController.list));

// 2) 게시글 좋아요 등록
router.post(
  '/:id/like',
  requireAuth,
  validateParams(ArticleParams),
  asyncHandler(articleLikeController.like)
);

// 3) 게시글 좋아요 취소
router.delete(
  '/:id/like',
  requireAuth,
  validateParams(ArticleParams),
  asyncHandler(articleLikeController.unlike)
);

export default router;
