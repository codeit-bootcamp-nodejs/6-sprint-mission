import express from 'express';
import productCommControl from '../controller/productCommControl.js';
import withTryCatch from '../lib/withTryCatch.js';
import authenticateUser from '../middleware/authenticateUser.js';

const productCommRouter = express.Router();

// productCommRouter.get('/comments', withTryCatch(productCommControl.getList));
// productCommRouter.get('/:productId/comments', withTryCatch(productCommControl.get));
productCommRouter.post(
  '/:productId/comments',
  authenticateUser,
  withTryCatch(productCommControl.post)
);
productCommRouter.patch(
  '/:productId/comments/:commentId',
  authenticateUser,
  withTryCatch(productCommControl.patch)
);
productCommRouter.erase(
  '/:productId/comments/:commentId',
  authenticateUser,
  withTryCatch(productCommControl.erase)
);

export default productCommRouter;
