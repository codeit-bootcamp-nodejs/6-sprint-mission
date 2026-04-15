// TODO) Article-Routes: URL 매핑
import { Router } from 'express';
import asyncHandler from '../core/error/async-handler.js';
import { requireAuth } from '../middleware/auth.js';

import validate, { validateParams } from '../validator/validate.js';
import {
  ArticleParams,
  CreateArticle,
  PatchArticle,
} from '../validator/article-validator.js';

import { articleController } from '../controllers/article-controller.js';

const router = Router();

// 1) 게시글 목록 조회
router.get('/', asyncHandler(articleController.list));

// 2) 게시글 조회
router.get(
  '/:id',
  validateParams(ArticleParams),
  asyncHandler(articleController.detail)
);

// 3) 게시글 생성
router.post(
  '/',
  requireAuth,
  validate(CreateArticle),
  asyncHandler(articleController.create)
);

// 4) 게시글 수정
router.patch(
  '/:id',
  requireAuth,
  validateParams(ArticleParams),
  validate(PatchArticle),
  asyncHandler(articleController.update)
);

// 5) 게시글 삭제
router.delete(
  '/:id',
  requireAuth,
  validateParams(ArticleParams),
  asyncHandler(articleController.remove)
);

export default router;
