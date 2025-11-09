import express from 'express';
import userController from '../controller/userController.js';
import withTryCatch from '../lib/withTryCatch.js';
import authenticateUser from '../middleware/authenticateUser.js';

const userRouter = express.Router();

userRouter.get('/', withTryCatch(userController.getList)); // 부가기능
userRouter.post('/register', withTryCatch(userController.register));
userRouter.post('/login', withTryCatch(userController.login));
userRouter.post('/logout', withTryCatch(userController.logout)); // 부가 기능

// 토큰 발생
userRouter.get('/tokens', withTryCatch(userController.viewTokens));
userRouter.post('/tokens/refresh', withTryCatch(userController.issueTokens));

// 토큰 인증 (비번은 res로 보여주지 않음)
userRouter.get('/myInfo', authenticateUser, withTryCatch(userController.getInfo)); // 자신의 정보 조회
userRouter.patch('/MyInfo/edit', authenticateUser, withTryCatch(userController.patchInfo)); // 토큰 인증 정보 수정, 비번 제외
userRouter.patch(
  '/MyInfo/password/change',
  authenticateUser,
  withTryCatch(userController.patchPassword)
);
userRouter.get('/myProducts', authenticateUser, withTryCatch(userController.getProducts)); // 자신이 등록한 상품 목록 조회
userRouter.get('/myArticles', authenticateUser, withTryCatch(userController.getArticles)); // 부가 기능

//userRouter.post('/myInfo/delete', deleteUser); // 부가 기능

export default userRouter;
