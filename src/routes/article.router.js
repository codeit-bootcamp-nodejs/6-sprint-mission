import express from 'express';
import withAsync from '../lib/withAsync.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validator.js';
// import upload from '../middlewares/uploadImages.js';
import {
  ArticleIdStruct,
  CommentIdStruct,
  CreateArticleStruct,
  CreateCommentStruct,
  PatchArticleStruct,
} from '../lib/structs.js';
import {
  createArticle,
  getListArticles,
  getArticleById,
  patchArticleById,
  deleteArticleById,
} from '../controllers/article.controller.js';
// import {
//   createCommentForArticle,
//   getCommentListArticle,
// } from '../controllers/comment.controller.js';

const router = express.Router();

router
  .route('/')
  //GET
  .get(withAsync(getListArticles))

  //POST
  .post(authMiddleware, validate(CreateArticleStruct, 'body'), withAsync(createArticle));

router
  .route('/:articleId')

  //GET id
  .get(validate(ArticleIdStruct, 'params'), withAsync(getArticleById))
  //PATCH id
  .patch(
    authMiddleware,
    validate(ArticleIdStruct, 'params'),
    validate(PatchArticleStruct, 'body'),
    withAsync(patchArticleById),
  )
  //DELETE id
  .delete(authMiddleware, validate(ArticleIdStruct, 'params'), withAsync(deleteArticleById));

// 자유게시판 댓글 ===================
// router
//   .route('/:articleId/comments')

//   //GET
//   .get(validate(ArticleIdStruct, 'params'), withAsync(getCommentListArticle)) //자유게시판

//   //POST
//   .post(
//     authMiddleware,
//     validate(ArticleIdStruct, 'params'),
//     validate(CreateCommentStruct, 'body'),
//     withAsync(createCommentForArticle),
//   ); //자유게시판 댓글

export default router;
