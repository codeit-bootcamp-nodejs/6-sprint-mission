import express from 'express';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';
import imageControl from '../controller/image.control';
import withTryCatch from '../lib/withTryCatch';
import upload from '../middleware/multer';

const imageRouter = express.Router();

imageRouter.get('/:type/:id', authenticate(), withTryCatch(imageControl.getList));
imageRouter.get('/:type/:id/:filename', authenticate(), withTryCatch(imageControl.get));
imageRouter.post(
  '/:type/:id',
  authenticate(),
  authorize,
  upload.single('image'),
  withTryCatch(imageControl.post)
);
imageRouter.delete('/:type/:id', authenticate(), authorize, withTryCatch(imageControl.delList));
imageRouter.delete(
  '/:type/:id/:filename',
  authenticate(),
  authorize,
  withTryCatch(imageControl.del)
);

export default imageRouter;
