import express from 'express';
import authenticateUser from '../middleware/authenticate.user.js';
import authorizeUser from '../middleware/authorize.user.js';
import productControl from '../controller/product.control.js';
import withTryCatch from '../lib/withTryCatch.js';

const productRouter = express.Router();

productRouter.get('/', withTryCatch(productControl.getList));
productRouter.get('/:id', authenticateUser, withTryCatch(productControl.get));
productRouter.post('/:id/like', authenticateUser, withTryCatch(productControl.like));
productRouter.post('/:id/like/cancel', authenticateUser, withTryCatch(productControl.cancelLike));
productRouter.post('/', authenticateUser, withTryCatch(productControl.post));
productRouter.patch('/:id', authenticateUser, authorizeUser, withTryCatch(productControl.patch));
productRouter.delete('/:id', authenticateUser, authorizeUser, withTryCatch(productControl.erase));

export default productRouter;
