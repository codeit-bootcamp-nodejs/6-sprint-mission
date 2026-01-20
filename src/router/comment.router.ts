import express from 'express';
import commentControl from '../controller/comment.control';
import withTryCatch from '../lib/withTryCatch';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';

const commentRouter = express.Router();

commentRouter.get('/', withTryCatch(commentControl.getList));
commentRouter.get('/:id', withTryCatch(commentControl.get));
commentRouter.post('/articles/:id', authenticate, withTryCatch(commentControl.postArticle));
commentRouter.post('/products/:id', authenticate, withTryCatch(commentControl.postProduct));
commentRouter.patch('/:id', authenticate, authorize, withTryCatch(commentControl.patch));
commentRouter.delete('/:id', authenticate, authorize, withTryCatch(commentControl.erase));

export default commentRouter;
