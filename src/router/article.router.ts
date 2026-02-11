import express from 'express';
import articleControl from '../controller/article.control';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';
import withTryCatch from '../lib/withTryCatch';
import { validateReqBody } from '../middleware/validateReqBody';
import { allowedArticleKeys } from '../lib/constants';

const articleRouter = express.Router();

articleRouter.get('/', withTryCatch(articleControl.getList));
articleRouter.get('/:id', authenticate(), withTryCatch(articleControl.get));
articleRouter.post('/:id/like/toggle', authenticate(), withTryCatch(articleControl.likeToggle));
articleRouter.post(
  '/',
  authenticate(),
  validateReqBody(allowedArticleKeys, true),
  withTryCatch(articleControl.post)
);
articleRouter.patch(
  '/:id',
  authenticate(),
  authorize,
  validateReqBody(allowedArticleKeys),
  withTryCatch(articleControl.patch)
);
articleRouter.delete('/:id', authenticate(), authorize, withTryCatch(articleControl.erase));

export default articleRouter;
