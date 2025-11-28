import express from 'express';
import withAsync from '../lib/withAsync.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validator.js';
import { CommentIdStruct, CreateCommentStruct, PatchCommentStruct } from '../lib/structs.js';
import {
  getCommentById,
  patchCommentById,
  deleteCommentById,
} from '../controllers/comment.controller.js';
// import upload from '../middlewares/uploadImages.js';

const router = express.Router();

//Article/Product comment는 각 라우터에 있음
router
  .route('/:commentId')
  //GET id //PATCH id //DELETE id
  .get(validate(CommentIdStruct, 'params'), withAsync(getCommentById))
  .patch(
    authMiddleware,
    validate(CommentIdStruct, 'params'),
    validate(PatchCommentStruct, 'body'),
    withAsync(patchCommentById),
  )
  .delete(authMiddleware, validate(CommentIdStruct, 'params'), withAsync(deleteCommentById));

export default router;
