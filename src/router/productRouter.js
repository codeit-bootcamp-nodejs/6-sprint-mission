import express from 'express';
import modelValidate from '../middleware/modelValidate.js';
import { CreateProduct, PatchProduct } from '../struct/structs.js';
import {
  postProduct, // 상품 등록
  getProductList, // 상품 목록 조회
  getProduct, // 상품 상세 조회
  patchProduct, // 상품 수정
  deleteProduct // 상품 삭제
} from '../controller/productController.js';

const productRouter = express.Router();

productRouter.post('/', modelValidate(CreateProduct), postProduct);
productRouter.get('/', getProductList);
productRouter.get('/:productId', getProduct);
productRouter.patch('/:productId', modelValidate(PatchProduct), patchProduct);
productRouter.delete('/:productId', deleteProduct);

export default productRouter;
