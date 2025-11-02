import express from 'express';
import { asyncHandler } from '../lib/asyncHandler.js';
import { validate } from '../middlewares/validationMiddleware.js';
import {
  CreateArticleComment,
  PatchArticleComment,
} from '../structs/commentStructs.js';
import {
  createArticleComment,
  patchArticleComment,
  deleteArticleComment,
  getArticleCommentList,
  getArticleComment,
} from '../controllers/articleCommController.js';

const router = express.Router();

router
  .route('/')
  .post(validate(CreateArticleComment), asyncHandler(createArticleComment))
  .get(asyncHandler(getArticleCommentList));

router
  .route('/:id')
  .patch(validate(PatchArticleComment), asyncHandler(patchArticleComment))
  .get(asyncHandler(getArticleComment))
  .delete(asyncHandler(deleteArticleComment));

export default router;
