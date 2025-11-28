import express from 'express';
import articleControl from '../controller/articleControl.js';
import authenticateUser from '../middleware/authenticateUser.js';
import withTryCatch from '../lib/withTryCatch.js';

const articleRouter = express.Router();

articleRouter.get('/', withTryCatch(articleControl.getList));
articleRouter.get('/:articleId', withTryCatch(articleControl.get));
articleRouter.post('/', authenticateUser, withTryCatch(articleControl.post));
articleRouter.patch('/:articleId', authenticateUser, withTryCatch(articleControl.patch));
articleRouter.delete('/:articleId', authenticateUser, withTryCatch(articleControl.erase));

export default articleRouter;
