import express from 'express';
import authenticateUser from '../middleware/authenticateUser.js';
import authorizeUser from '../middleware/authorizeUser.js';
import productControl from '../controller/productControl.js';
import withTryCatch from '../lib/withTryCatch.js';

const productRouter = express.Router();

productRouter.get('/', withTryCatch(productControl.getList));
productRouter.get('/:id', withTryCatch(productControl.get));
productRouter.post('/:id/like', authenticateUser, withTryCatch(productControl.like));
productRouter.post('/:id/like/cancel', authenticateUser, withTryCatch(productControl.cancelLike));
productRouter.post('/', authenticateUser, withTryCatch(productControl.post));
productRouter.patch('/:id', authenticateUser, authorizeUser, withTryCatch(productControl.patch));
productRouter.delete('/:id', authenticateUser, authorizeUser, withTryCatch(productControl.erase));

export default productRouter;
