import express from 'express';
import userControl from '../controller/userControl.js';
import withTryCatch from '../lib/withTryCatch.js';
import authenticateUser from '../middleware/authenticateUser.js';

const userRouter = express.Router();

userRouter.get('/', withTryCatch(userControl.getList)); // 부가기능
userRouter.post('/register', withTryCatch(userControl.register));
userRouter.post('/login', withTryCatch(userControl.login));
userRouter.post('/logout', withTryCatch(userControl.logout)); // 부가 기능

// 토큰 발생
userRouter.get('/tokens', withTryCatch(userControl.viewTokens));
userRouter.post('/tokens/refresh', withTryCatch(userControl.issueTokens));

// 토큰 인증 (비번은 res로 보여주지 않음)
userRouter.get('/myInfo', authenticateUser, withTryCatch(userControl.getInfo)); // 자신의 정보 조회
userRouter.patch('/MyInfo/edit', authenticateUser, withTryCatch(userControl.patchInfo)); // 토큰 인증 정보 수정, 비번 제외
userRouter.patch(
  '/MyInfo/password/change',
  authenticateUser,
  withTryCatch(userControl.patchPassword)
);
userRouter.get('/myProducts', authenticateUser, withTryCatch(userControl.getProducts)); // 자신이 등록한 상품 목록 조회
userRouter.get('/myArticles', authenticateUser, withTryCatch(userControl.getArticles)); // 부가 기능

userRouter.get('/myLikedProducts', authenticateUser, withTryCatch(userControl.getLikedProducts)); // 자신이 등록한 상품 목록 조회
userRouter.get('/myLikedArticles', authenticateUser, withTryCatch(userControl.getLikedArticles)); // 부가 기능

//userRouter.post('/myInfo/delete', deleteUser); // 부가 기능

export default userRouter;
