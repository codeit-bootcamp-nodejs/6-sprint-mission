import express from 'express';
import commentControl from '../controller/comment.control';
import withTryCatch from '../lib/withTryCatch';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';
import { validateReqBody } from '../middleware/validateReqBody';
import { allowedCommentKeys } from '../lib/constants';

const commentRouter = express.Router();

commentRouter.get('/', authenticate({ optional: true }), withTryCatch(commentControl.getList));
commentRouter.get('/:id', authenticate(), withTryCatch(commentControl.get));
commentRouter.post(
  '/articles/:id',
  authenticate(),
  validateReqBody(allowedCommentKeys, true),
  withTryCatch(commentControl.postArticle)
);
commentRouter.post(
  '/products/:id',
  authenticate(),
  validateReqBody(allowedCommentKeys, true),
  withTryCatch(commentControl.postProduct)
);
commentRouter.patch(
  '/:id',
  authenticate(),
  authorize,
  validateReqBody(allowedCommentKeys),
  withTryCatch(commentControl.patch)
);
commentRouter.delete('/:id', authenticate(), authorize, withTryCatch(commentControl.erase));

export default commentRouter;
