// TODO) Product-Comment-Routes: URL 매핑
import { Router } from 'express';
import asyncHandler from '../core/error/async-handler.js';
import { requireAuth } from '../middleware/auth.js';

import validate, { validateParams } from '../validator/validate.js';
import {
  ProductCommentIdParams,
  ProductCommentParams,
  CreateProductComment,
  PatchProductComment,
} from '../validator/product-comment-validator.js';

import { productCommentController } from '../controllers/product-comment-controller.js';

const router = Router();

// 1) 상품 댓글 목록 조회
router.get(
  '/:productId',
  validateParams(ProductCommentParams),
  asyncHandler(productCommentController.list)
);

// 2) 상품 댓글 생성
router.post(
  '/',
  requireAuth,
  validate(CreateProductComment),
  asyncHandler(productCommentController.create)
);

// 3) 상품 댓글 수정
router.patch(
  '/:id',
  requireAuth,
  validateParams(ProductCommentIdParams),
  validate(PatchProductComment),
  asyncHandler(productCommentController.update)
);

// 4) 상품 댓글 삭제
router.delete(
  '/:id',
  requireAuth,
  validateParams(ProductCommentIdParams),
  asyncHandler(productCommentController.remove)
);

export default router;
