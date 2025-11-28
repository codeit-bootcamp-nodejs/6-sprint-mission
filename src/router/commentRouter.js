import express from 'express';
import commentControl from '../controller/commentControl.js';
import withTryCatch from '../lib/withTryCatch.js';
import authenticateUser from '../middleware/authenticateUser.js';
import authorizeUser from '../middleware/authorizeUser.js';

const commentRouter = express.Router();

commentRouter.get('/', withTryCatch(commentControl.getList));
commentRouter.get('/:commentId', withTryCatch(commentControl.get));
commentRouter.post(
  '/articles/:articleId',
  authenticateUser,
  withTryCatch(commentControl.postArticle)
);
commentRouter.post(
  '/products/:productId',
  authenticateUser,
  withTryCatch(commentControl.postProduct)
);
commentRouter.patch(
  '/:commentId',
  authenticateUser,
  authorizeUser,
  withTryCatch(commentControl.patch)
);
commentRouter.delete(
  '/:commentId',
  authenticateUser,
  authorizeUser,
  withTryCatch(commentControl.erase)
);

export default commentRouter;
