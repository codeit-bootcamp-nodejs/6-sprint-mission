import express from 'express';
import articleControl from '../controller/articleControl.js';
import authenticateUser from '../middleware/authenticateUser.js';
import authorizeUser from '../middleware/authorizeUser.js';
import withTryCatch from '../lib/withTryCatch.js';

const articleRouter = express.Router();

articleRouter.get('/', withTryCatch(articleControl.getList));
articleRouter.get('/:id', withTryCatch(articleControl.get));
articleRouter.post('/', authenticateUser, withTryCatch(articleControl.post));
articleRouter.patch('/:id', authenticateUser, authorizeUser, withTryCatch(articleControl.patch));
articleRouter.delete('/:id', authenticateUser, authorizeUser, withTryCatch(articleControl.erase));

export default articleRouter;
