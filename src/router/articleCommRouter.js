import express from 'express';
import articleCommControl from '../controller/articleCommControl.js';
import withTryCatch from '../lib/withTryCatch.js';
import authenticateUser from '../middleware/authenticateUser.js';

const articleCommRouter = express.Router();

// articleCommRouter.get('/comments', withTryCatch(articleCommControl.getList));
// articleCommRouter.get('/:articleId/comments', withTryCatch(articleCommControl.article.get));
articleCommRouter.post(
  '/:articleId/comments',
  authenticateUser,
  withTryCatch(articleCommControl.post)
);
articleCommRouter.patch(
  '/:articleId/comments/:commentId',
  authenticateUser,
  withTryCatch(articleCommControl.patch)
);
articleCommControl.erase(
  '/:articleId/comments/:commentId',
  authenticateUser,
  withTryCatch(articleCommControl.erase)
);

export default articleCommRouter;
