import express from 'express';
import articleControl from '../controller/article.control';
import authenticateUser from '../middleware/authenticate.user';
import authorizeUser from '../middleware/authorize.user';
import withTryCatch from '../lib/withTryCatch';

const articleRouter = express.Router();

articleRouter.get('/', withTryCatch(articleControl.getList));
articleRouter.get('/:id', authenticateUser, withTryCatch(articleControl.get));
articleRouter.post('/:id/like', authenticateUser, withTryCatch(articleControl.like));
articleRouter.post('/:id/like/cancel', authenticateUser, withTryCatch(articleControl.cancelLike));
articleRouter.post('/', authenticateUser, withTryCatch(articleControl.post));
articleRouter.patch('/:id', authenticateUser, authorizeUser, withTryCatch(articleControl.patch));
articleRouter.delete('/:id', authenticateUser, authorizeUser, withTryCatch(articleControl.erase));

export default articleRouter;
