import express from 'express';
import { withAsync } from '../lib/withAsync.js';
import * as ctrl from '../controllers/commentsController.js';
const router = express.Router();

router.post('/product/:productId', withAsync(ctrl.createCommentForProduct));
router.get('/product/:productId', withAsync(ctrl.listCommentsForProduct));

router.post('/article/:articleId', withAsync(ctrl.createCommentForArticle));
router.get('/article/:articleId', withAsync(ctrl.listCommentsForArticle));

router.patch('/:id', withAsync(ctrl.updateComment));
router.delete('/:id', withAsync(ctrl.deleteComment));

export default router;
