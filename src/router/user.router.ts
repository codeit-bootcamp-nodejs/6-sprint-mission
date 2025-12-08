import express from 'express';
import userControl from '../controller/user.control';
import withTryCatch from '../lib/withTryCatch';
import authenticateUser from '../middleware/authenticate.user';

const userRouter = express.Router();

userRouter.get('/', withTryCatch(userControl.getList)); // 부가기능

userRouter.post('/register', withTryCatch(userControl.register));
userRouter.post('/login', withTryCatch(userControl.login));
userRouter.post('/logout', withTryCatch(userControl.logout)); // 부가 기능

// 토큰 발생
userRouter.get('/tokens/view', withTryCatch(userControl.viewTokens));
userRouter.post('/tokens/refresh', withTryCatch(userControl.issueTokens));

// 토큰 인증 (비번은 res로 보여주지 않음)
userRouter.get('/info', authenticateUser, withTryCatch(userControl.getInfo)); // 자신의 정보 조회
userRouter.patch('/info/edit', authenticateUser, withTryCatch(userControl.patchInfo)); // 토큰 인증 정보 수정, 비번 제외
userRouter.patch(
  '/info/password/change',
  authenticateUser,
  withTryCatch(userControl.patchPassword)
);
userRouter.get('/products', authenticateUser, withTryCatch(userControl.getProducts)); // 자신이 등록한 상품 목록 조회
userRouter.get('/articles', authenticateUser, withTryCatch(userControl.getArticles)); // 부가 기능

userRouter.get('/like/products', authenticateUser, withTryCatch(userControl.getLikedProducts)); // 자신이 등록한 상품 목록 조회
userRouter.get('/like/articles', authenticateUser, withTryCatch(userControl.getLikedArticles)); // 부가 기능

//userRouter.post('/myInfo/delete', deleteUser); // 부가 기능

export default userRouter;
