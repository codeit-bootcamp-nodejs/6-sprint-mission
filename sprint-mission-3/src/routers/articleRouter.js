import express from 'express';
import {
  createArticle,
  getListArticles,
  getArticleById,
  patchArticleById,
  deleteArticleById,
} from '../controllers/articleController.js';
import {
  createCommentForArticle,
  getCommentListArticle,
} from '../controllers/commentController.js';
import { validateArticle, validateComment } from '../middlewares/validator.js';
import upload from '../middlewares/uploadImages.js';

const router = express.Router();

router
  .route('/')
  //POST  //GET
  .get(getListArticles)
  .post(validateArticle, createArticle);

router
  .route('/:id')
  //GET id //PATCH id //DELETE id
  .get(getArticleById)
  .patch(patchArticleById)
  .delete(deleteArticleById);

router
  .route('/:articleId/comments')
  //POST  //GET
  .post(validateComment, createCommentForArticle) //자유게시판 댓글
  .get(getCommentListArticle); //자유게시판

export default router;
