import express from 'express';
import withAsync from '../lib/withAsync.js';
import { validate } from '../middlewares/validator.js';
import {
  ProductIdStruct,
  CreateProductStruct,
  PatchProductStruct,
  CreateCommentStruct,
} from '../lib/structs.js';
import {
  createProduct,
  getListProducts,
  getProductById,
  patchProductById,
  deleteProductById,
} from '../controllers/product.controller.js';
import {
  createCommentForProduct,
  getCommentListProduct,
} from '../controllers/comment.controller.js';

//.post (validate(CreateProductStruct, 'body'), createProduct);

const router = express.Router();

router
  .route('/')
  //POST, GET
  .post(validate(CreateProductStruct, 'body'), withAsync(createProduct))
  .get(withAsync(getListProducts));

router
  .route('/:productId')
  //GET id,
  .get(validate(ProductIdStruct, 'params'), withAsync(getProductById))

  //PATCH id,
  .patch(
    validate(ProductIdStruct, 'params'),
    validate(PatchProductStruct, 'body'),
    withAsync(patchProductById),
  )

  //DELETE id
  .delete(validate(ProductIdStruct, 'params'), withAsync(deleteProductById));

//중고 장터
router
  .route('/:productId/comments')
  //POST
  .post(
    validate(ProductIdStruct, 'params'),
    validate(CreateCommentStruct, 'body'),
    withAsync(createCommentForProduct),
  ) //중고장터 댓글

  //GET
  .get(validate(ProductIdStruct, 'params'), withAsync(getCommentListProduct)); //중고장터 댓글

export default router;
