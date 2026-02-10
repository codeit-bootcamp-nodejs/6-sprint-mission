import express from 'express';
import authenticate from '../middleware/authenticate';
import authorize from '../middleware/authorize';
import imageControl from '../controller/image.control';
import withTryCatch from '../lib/withTryCatch';
import upload from '../middleware/multer';

const imageRouter = express.Router();
// type
imageRouter.get('/:type/:id', authenticate, withTryCatch(imageControl.getList));
imageRouter.get('/:type/:id/:filename', authenticate, withTryCatch(imageControl.get));
imageRouter.post(
  '/:type/:id',
  authenticate,
  authorize,
  upload.single('image'),
  withTryCatch(imageControl.post)
);
imageRouter.delete('/:type/:id', authenticate, authorize, withTryCatch(imageControl.delList));
imageRouter.delete('/:type/:id/:filename', authenticate, authorize, withTryCatch(imageControl.del));

// 사용자
// imageRouter.get('/users/:id', authenticate, withTryCatch(imageControl.getList));
// imageRouter.get('/users/:id/:filename', authenticate, withTryCatch(imageControl.get));
// imageRouter.post(
//   '/users/:id',
//   authenticate,
//   authorize,
//   upload.single('image'),
//   withTryCatch(imageControl.post)
// );
// imageRouter.delete('/users/:id', authenticate, authorize, withTryCatch(imageControl.delList));
// imageRouter.delete('/users/:id/:filename', authenticate, authorize, withTryCatch(imageControl.del));

// // 상품
// imageRouter.get('/products/:id', authenticate, withTryCatch(imageControl.getList));
// imageRouter.get('/products/:id/:filename', authenticate, withTryCatch(imageControl.get));
// imageRouter.post(
//   '/products/:id',
//   authenticate,
//   authorize,
//   upload.single('image'),
//   withTryCatch(imageControl.post)
// );
// imageRouter.delete('/products/:id', authenticate, authorize, withTryCatch(imageControl.delList));
// imageRouter.delete(
//   '/products/:id/:filename',
//   authenticate,
//   authorize,
//   withTryCatch(imageControl.del)
// );

// // 게시글
// imageRouter.get('/articles/:id', authenticate, withTryCatch(imageControl.getList));
// imageRouter.get('/articles/:id/:filename', authenticate, withTryCatch(imageControl.get));
// imageRouter.post(
//   '/articles/:id',
//   authenticate,
//   authorize,
//   upload.single('image'),
//   withTryCatch(imageControl.post)
// );
// imageRouter.delete('/articles/:id', authenticate, authorize, withTryCatch(imageControl.delList));
// imageRouter.delete(
//   '/articles/:id/:filename',
//   authenticate,
//   authorize,
//   withTryCatch(imageControl.del)
// );

export default imageRouter;

// imageUrls String[]? 로 스키마에 정의되어 있어
// 전체 삭제는 가능하지만, 개별 삭제가 어려움
// 다음 버전에서는 스키마에 image 모델 만드는 게 나을 듯함
