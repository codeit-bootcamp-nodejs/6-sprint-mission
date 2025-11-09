import express from 'express';
import modelValidate from '../middleware/modelValidate.js';
import { CreateProductComment, PatchProductComment } from '../struct/structs.js';
import {
  getAllProductComments,
  getProductComments,
  postProductComment,
  patchProductComment,
  deleteProductComment
} from '../controller/commentController_product.js';

const commentRouter_product = express.Router();

commentRouter_product.get('/comments', getAllProductComments);
commentRouter_product.get('/:productId/comments', getProductComments);
commentRouter_product.post('/:productId/comments', modelValidate(CreateProductComment), postProductComment);
commentRouter_product.patch('/:productId/comments/:commentId', modelValidate(PatchProductComment), patchProductComment);
commentRouter_product.delete('/:productId/comments/:commentId', deleteProductComment);

export default commentRouter_product;
