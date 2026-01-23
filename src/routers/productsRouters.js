// Express 라우터를 가져옵니다
import express from 'express';
// 상품 컨트롤러를 가져옵니다
import productController from '../controllers/productsControllers.js';
// 유효성 검증 미들웨어를 가져옵니다
import { validateProductCreate, validateProductUpdate } from '../lib/validation.js';
// 에러 핸들러를 가져옵니다
import { asyncHandler } from '../lib/errors/errorHandler.js';

// Express 라우터를 생성합니다
const router = express.Router();

// 상품 목록 조회 API (GET /api/products)
// 상품 목록을 조회할 때 사용합니다 (페이지네이션, 정렬, 검색 기능 포함)
router.get('/', asyncHandler(productController.getProducts));

// 상품 등록 API (POST /api/products)
// 새로운 상품을 등록할 때 사용합니다
router.post('/', validateProductCreate, asyncHandler(productController.createProduct));

// app.route()를 사용하여 중복 라우트 통합 (/api/products/:id)
router
  .route('/:id')
  // 상품 상세 조회 API (GET /api/products/:id)
  .get(asyncHandler(productController.getProductById))
  // 상품 수정 API (PATCH /api/products/:id)
  .patch(validateProductUpdate, asyncHandler(productController.updateProduct))
  // 상품 삭제 API (DELETE /api/products/:id)
  .delete(asyncHandler(productController.deleteProduct));

// 라우터를 내보냅니다
export default router;
