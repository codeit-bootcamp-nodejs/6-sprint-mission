import express from 'express';
import authenticateUser from '../middleware/authenticateUser.js';
import productControl from '../controller/productControl.js';
import withTryCatch from '../lib/withTryCatch.js';

const productRouter = express.Router();

productRouter.get('/', withTryCatch(productControl.getList));
productRouter.get('/:productId', withTryCatch(productControl.get));
productRouter.post('/', authenticateUser, withTryCatch(productControl.post));
productRouter.patch('/:productId', authenticateUser, withTryCatch(productControl.patch));
productRouter.delete('/:productId', authenticateUser, withTryCatch(productControl.erase));

export default productRouter;
