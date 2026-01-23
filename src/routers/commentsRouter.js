// Express 라우터를 가져옵니다
import express from 'express';
// 댓글 컨트롤러를 가져옵니다
import commentController from '../controllers/commentsControllers.js';
// 유효성 검증 미들웨어를 가져옵니다
import { validateCommentCreate, validateCommentUpdate } from '../lib/validation.js';
// 에러 핸들러를 가져옵니다
import { asyncHandler } from '../lib/errors/errorHandler.js';

// Express 라우터를 생성합니다
const router = express.Router();

// 상품 댓글 등록 API (POST /api/comments/products/:productId)
// 특정 상품에 댓글을 등록할 때 사용합니다
router.post(
  '/products/:productId',
  validateCommentCreate,
  asyncHandler(commentController.createProductComment),
);

// 게시글 댓글 등록 API (POST /api/comments/articles/:articleId)
// 특정 게시글에 댓글을 등록할 때 사용합니다
router.post(
  '/articles/:articleId',
  validateCommentCreate,
  asyncHandler(commentController.createArticleComment),
);

// 댓글 수정 API (PATCH /api/comments/:id)
// 기존 댓글의 내용을 수정할 때 사용합니다
router.patch('/:id', validateCommentUpdate, asyncHandler(commentController.updateComment));

// 댓글 삭제 API (DELETE /api/comments/:id)
// 댓글을 삭제할 때 사용합니다
router.delete('/:id', asyncHandler(commentController.deleteComment));

// 상품 댓글 목록 조회 API (GET /api/comments/products/:productId)
// 특정 상품의 댓글 목록을 조회할 때 사용합니다 (cursor 방식 페이지네이션)
router.get('/products/:productId', asyncHandler(commentController.getProductComments));

// 게시글 댓글 목록 조회 API (GET /api/comments/articles/:articleId)
// 특정 게시글의 댓글 목록을 조회할 때 사용합니다 (cursor 방식 페이지네이션)
router.get('/articles/:articleId', asyncHandler(commentController.getArticleComments));

// 라우터를 내보냅니다
export default router;
