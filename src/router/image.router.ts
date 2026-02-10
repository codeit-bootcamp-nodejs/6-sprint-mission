import express from 'express';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';
import imageControl from '../controller/image.control';
import withTryCatch from '../lib/withTryCatch';
import upload from '../middleware/multer';

const imageRouter = express.Router();

// 사용자
imageRouter.get('/users/:id', withTryCatch(imageControl.getList));
imageRouter.post(
  '/users/:id',
  authenticate,
  authorize,
  upload.single('image'),
  withTryCatch(imageControl.post)
);
imageRouter.delete('/users/:id', authenticate, authorize, withTryCatch(imageControl.delList));

// 상품
imageRouter.get('/products/:id', withTryCatch(imageControl.getList));
imageRouter.post(
  '/products/:id',
  authenticate,
  authorize,
  upload.single('image'),
  withTryCatch(imageControl.post)
);
imageRouter.delete('/products/:id', authenticate, authorize, withTryCatch(imageControl.delList));

// 게시글
imageRouter.get('/articles/:id', withTryCatch(imageControl.getList));
imageRouter.delete('/articles/:articleId/:filename', withTryCatch(imageControl.del));
imageRouter.post(
  '/articles/:id',
  authenticate,
  authorize,
  upload.single('image'),
  withTryCatch(imageControl.post)
);
imageRouter.delete('/articles/:id', authenticate, authorize, withTryCatch(imageControl.delList));
export default imageRouter;

// imageUrls String[]? 로 스키마에 정의되어 있어
// 전체 삭제는 가능하지만, 개별 삭제가 어려움
// 다음 버전에서는 스키마에 image 모델 만드는 게 나을 듯함
