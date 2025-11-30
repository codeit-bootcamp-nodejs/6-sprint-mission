import express from 'express';
import authenticateUser from '../middleware/authenticateUser.js';
import authorizeUser from '../middleware/authorizeUser.js';
import imageControl from '../controller/imageControl.js';
import withTryCatch from '../lib/withTryCatch.js';
import upload from '../middleware/multer.js';

const imageRouter = express.Router();

// 사용자
imageRouter.get('/users/:id', withTryCatch(imageControl.getList));
imageRouter.post(
  '/users/:id',
  authenticateUser,
  authorizeUser,
  upload.single('image'),
  withTryCatch(imageControl.post)
);
imageRouter.delete('/users/:id', authenticateUser, authorizeUser, withTryCatch(imageControl.erase));

// 상품
imageRouter.get('/products/:id', withTryCatch(imageControl.getList));
imageRouter.post(
  '/products/:id',
  authenticateUser,
  authorizeUser,
  upload.single('image'),
  withTryCatch(imageControl.post)
);
imageRouter.delete(
  '/products/:id',
  authenticateUser,
  authorizeUser,
  withTryCatch(imageControl.erase)
);

// 게시글
imageRouter.get('/articles/:id', withTryCatch(imageControl.getList));
imageRouter.post(
  '/articles/:id',
  authenticateUser,
  authorizeUser,
  upload.single('image'),
  withTryCatch(imageControl.post)
);
imageRouter.delete(
  '/articles/:id',
  authenticateUser,
  authorizeUser,
  withTryCatch(imageControl.erase)
);
export default imageRouter;

// imageUrls String[]? 로 스키마에 정의되어 있어
// 전체 삭제는 가능하지만, 개별 삭제가 어려움
// 다음 버전에서는 스키마에 image 모델 만드는 게 나을 듯함
