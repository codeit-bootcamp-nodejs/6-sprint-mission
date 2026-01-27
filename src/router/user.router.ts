import express from 'express';
import userControl from '../controller/user.control';
import withTryCatch from '../lib/withTryCatch';
import authenticate from '../middleware/authenticate';
import { allowedUserKeys } from '../lib/constants';
import { validateReqBody } from '../middleware/validateReqBody';

const userRouter = express.Router();

userRouter.get('/', withTryCatch(userControl.getList)); // 부가기능

// 인증된 유저 APIs (비번은 res로 보여주지 않음)
userRouter.get('/info', authenticate, withTryCatch(userControl.getInfo)); // 자신의 정보 조회
userRouter.patch(
  '/info/edit',
  authenticate,
  validateReqBody(allowedUserKeys),
  withTryCatch(userControl.patchInfo)
); // 토큰 인증 정보 수정, 비번 제외
userRouter.patch('/info/password/change', authenticate, withTryCatch(userControl.patchPassword));
userRouter.get('/products', authenticate, withTryCatch(userControl.getProducts)); // 자신이 등록한 상품 목록 조회
userRouter.get('/articles', authenticate, withTryCatch(userControl.getArticles)); // 자신이 등록한 게시물 목록 조회: 부가 기능

userRouter.get('/like/products', authenticate, withTryCatch(userControl.getLikedProducts)); // 자신이 좋아요 누른 상품 조회
userRouter.get('/like/articles', authenticate, withTryCatch(userControl.getLikedArticles)); // 자신이 좋아요 누른 게시물 조회: 부가 기능

//userRouter.post('/myInfo/delete', deleteUser); // 부가 기능

export default userRouter;
