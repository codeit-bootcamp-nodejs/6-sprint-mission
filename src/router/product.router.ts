import express from 'express';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';
import productControl from '../controller/product.control';
import withTryCatch from '../lib/withTryCatch';

const productRouter = express.Router();

productRouter.get('/', withTryCatch(productControl.getList));
productRouter.get('/:id', authenticate, withTryCatch(productControl.get));
productRouter.post('/:id/like/toggle', authenticate, withTryCatch(productControl.likeToggle));
productRouter.post('/', authenticate, withTryCatch(productControl.post));
productRouter.patch('/:id', authenticate, authorize, withTryCatch(productControl.patch));
productRouter.delete('/:id', authenticate, authorize, withTryCatch(productControl.erase));

export default productRouter;
