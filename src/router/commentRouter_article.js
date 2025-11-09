import express from 'express';
import modelValidate from '../middleware/modelValidate.js';
import { CreateArticleComment, PatchArticleComment } from '../struct/structs.js';
import {
  getAllArticleComments,
  getArticleComments,
  postArticleComment,
  patchArticleComment,
  deleteArticleComment
} from '../controller/commentController_article.js';

const commentRouter_article = express.Router();

commentRouter_article.get('/comments', getAllArticleComments);
commentRouter_article.get('/:articleId/comments', getArticleComments);
commentRouter_article.post('/:articleId/comments', modelValidate(CreateArticleComment), postArticleComment);
commentRouter_article.patch('/:articleId/comments/:commentId', modelValidate(PatchArticleComment), patchArticleComment);
commentRouter_article.delete('/articles/:articleId/comments/:commentId', deleteArticleComment);

export default commentRouter_article;
