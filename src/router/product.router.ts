import express from 'express';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';
import productControl from '../controller/product.control';
import withTryCatch from '../lib/withTryCatch';
import { validateReqBody } from '../middleware/validateReqBody';
import { allowedProductKeys } from '../lib/constants';

const productRouter = express.Router();

productRouter.get('/', authenticate({ optional: true }), withTryCatch(productControl.getList));
productRouter.get('/:id', authenticate(), withTryCatch(productControl.get));
productRouter.post('/:id/like/toggle', authenticate(), withTryCatch(productControl.likeToggle));
productRouter.post(
  '/',
  authenticate(),
  validateReqBody(allowedProductKeys, true),
  withTryCatch(productControl.post)
);
productRouter.patch(
  '/:id',
  authenticate(),
  validateReqBody(allowedProductKeys),
  authorize,
  withTryCatch(productControl.patch)
);
productRouter.delete('/:id', authenticate(), authorize, withTryCatch(productControl.erase));

productRouter.get(
  '/:productId/price-records',
  authenticate(),
  withTryCatch(productControl.getPriceRecords)
);
productRouter.get(
  '/price-records/:id',
  authenticate(),
  withTryCatch(productControl.getPriceRecord)
);

export default productRouter;
