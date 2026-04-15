// TODO) Product-Routes: URL 매핑
import { Router } from 'express';
import asyncHandler from '../core/error/async-handler.js';
import { requireAuth } from '../middleware/auth.js';

import validate, { validateParams } from '../validator/validate.js';
import {
  CreateProduct,
  PatchProduct,
  ProductParams,
} from '../validator/product-validator.js';
import { PurchaseProduct } from '../validator/purchase-validator.js';

import { productController } from '../controllers/product-controller.js';

const router = Router();

// 1) 상품 목록 조회
router.get('/', asyncHandler(productController.list));

// 2) 상품 조회
router.get(
  '/:id',
  validateParams(ProductParams),
  asyncHandler(productController.detail)
);

// 3) 상품 생성
router.post(
  '/',
  requireAuth,
  validate(CreateProduct),
  asyncHandler(productController.create)
);

// 4) 상품 수정
router.patch(
  '/:id',
  requireAuth,
  validateParams(ProductParams),
  validate(PatchProduct),
  asyncHandler(productController.update)
);

// 5) 상품 삭제
router.delete(
  '/:id',
  requireAuth,
  validateParams(ProductParams),
  asyncHandler(productController.remove)
);

// 6) 상품 구매
router.post(
  '/purchase',
  requireAuth,
  validate(PurchaseProduct),
  asyncHandler(productController.purchase)
);

export default router;
