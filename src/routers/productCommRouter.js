import express from 'express';
import { asyncHandler } from '../lib/asyncHandler.js';
import { validate } from '../middlewares/validationMiddleware.js';
import {
  CreateProductComment,
  PatchProductComment,
} from '../structs/commentStructs.js';
import {
  createProductComment,
  patchProductComment,
  getProductCommentList,
  getProductCommentDetail,
  deleteProductComment,
} from '../controllers/productCommController.js';

const router = express.Router();

router
  .route('/')
  .post(validate(CreateProductComment), asyncHandler(createProductComment))
  .get(asyncHandler(getProductCommentList));

router
  .route('/:id')
  .patch(validate(PatchProductComment), asyncHandler(patchProductComment))
  .get(asyncHandler(getProductCommentDetail))
  .delete(asyncHandler(deleteProductComment));

export default router;
