import express from 'express';
import commentControl from '../controller/comment.control';
import withTryCatch from '../lib/withTryCatch';
import authenticateUser from '../middleware/authenticate.user';
import authorizeUser from '../middleware/authorize.user';

const commentRouter = express.Router();

commentRouter.get('/', withTryCatch(commentControl.getList));
commentRouter.get('/:id', withTryCatch(commentControl.get));
commentRouter.post('/articles/:id', authenticateUser, withTryCatch(commentControl.postArticle));
commentRouter.post('/products/:id', authenticateUser, withTryCatch(commentControl.postProduct));
commentRouter.patch('/:id', authenticateUser, authorizeUser, withTryCatch(commentControl.patch));
commentRouter.delete('/:id', authenticateUser, authorizeUser, withTryCatch(commentControl.erase));

export default commentRouter;
