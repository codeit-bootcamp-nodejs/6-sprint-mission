import express from 'express';
import articleCommRouter from './articleComRouter.js';
import { asyncHandler } from '../lib/asyncHandler.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { CreateArticle, PatchArticle } from '../structs/articleStructs.js';
import {
  createArticle,
  patchArticle,
  getArticle,
  getArticleList,
  deleteArticle,
} from '../controllers/articleController.js';

const router = express.Router();

// articleComment
router.use('/comments', articleCommRouter);

router
  .route('/')
  .post(validate(CreateArticle), asyncHandler(createArticle))
  .get(asyncHandler(getArticleList));

router
  .route('/:id')
  .get(asyncHandler(getArticle))
  .patch(validate(PatchArticle), asyncHandler(patchArticle))
  .delete(asyncHandler(deleteArticle));

export default router;
