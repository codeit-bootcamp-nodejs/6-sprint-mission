import express from 'express';
import modelValidate from '../middleware/modelValidate.js';
import { CreateArticle, PatchArticle } from '../struct/structs.js';
import {
  postArticle, // 게시물 등록
  getArticleList, // 게시물 목록 조회
  getArticle, // 게시물 상세 조회
  patchArticle, // 게시물 수정
  deleteArticle // 게시물 삭제
} from '../controller/article.js';

const articleRouter = express.Router();

articleRouter.get('/:articleId', getArticle);
articleRouter.post('/', modelValidate(CreateArticle), postArticle);
articleRouter.get('/', getArticleList);
articleRouter.get('/:articleId', getArticle);
articleRouter.patch('/:articleId', modelValidate(PatchArticle), patchArticle);
articleRouter.delete('/:articleId', deleteArticle);

export default articleRouter;
