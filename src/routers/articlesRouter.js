import express from 'express';
import { withAsync } from '../lib/withAsync.js';
import * as ctrl from '../controllers/articlesController.js';
const router = express.Router();

router.route('/')
  .post(withAsync(ctrl.createArticle))
  .get(withAsync(ctrl.listArticles));

router.route('/:id')
  .get(withAsync(ctrl.getArticle))
  .patch(withAsync(ctrl.updateArticle))
  .delete(withAsync(ctrl.deleteArticle));

export default router;
