import express from 'express';
import articleControl from '../controller/article.control';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';
import withTryCatch from '../lib/withTryCatch';

const articleRouter = express.Router();

articleRouter.get('/', withTryCatch(articleControl.getList));
articleRouter.get('/:id', authenticate, withTryCatch(articleControl.get));
articleRouter.post('/:id/like/toggle', authenticate, withTryCatch(articleControl.likeToggle));
articleRouter.post('/', authenticate, withTryCatch(articleControl.post));
articleRouter.patch('/:id', authenticate, authorize, withTryCatch(articleControl.patch));
articleRouter.delete('/:id', authenticate, authorize, withTryCatch(articleControl.erase));

export default articleRouter;
