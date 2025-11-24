import express from 'express';

import {
  getCommentById,
  patchCommentById,
  deleteCommentById,
} from '../controllers/commentController.js';
import upload from '../middlewares/uploadImages.js';

const router = express.Router();

//Article/Product comment는 각 라우터에 있음
router
  .route('/:id')
  //GET id //PATCH id //DELETE id
  .get(getCommentById)
  .patch(patchCommentById)
  .delete(deleteCommentById);

export default router;
