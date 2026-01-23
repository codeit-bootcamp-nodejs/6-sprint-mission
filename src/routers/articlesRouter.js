import express from 'express';
import articleController from '../controllers/articlesController.js';
import {
  validateArticleCreate,
  validateArticleUpdate,
  validateId,
  validatePagination,
} from '../lib/validation.js';
import { asyncHandler } from '../lib/errors/errorHandler.js';

const router = express.Router();

// 게시글 목록 조회 API (GET /api/articles)
router.get('/', validatePagination, asyncHandler(articleController.getArticles));

// 게시글 등록 API (POST /api/articles)
router.post('/', validateArticleCreate, asyncHandler(articleController.createArticle));

// app.route()를 사용하여 중복 라우트 통합 (/api/articles/:id)
router
  .route('/:id')
  // 게시글 상세 조회 API (GET /api/articles/:id)
  .get(validateId, asyncHandler(articleController.getArticleById))
  // 게시글 수정 API (PATCH /api/articles/:id)
  .patch(validateId, validateArticleUpdate, asyncHandler(articleController.updateArticle))
  // 게시글 삭제 API (DELETE /api/articles/:id)
  .delete(validateId, asyncHandler(articleController.deleteArticle));

export default router;
