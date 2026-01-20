import express from 'express';
import authControl from '../controller/auth.control';
import withTryCatch from '../lib/withTryCatch';
import authenticateUser from '../middleware/authenticate.user';

const authRouter = express.Router();

authRouter.post('/register', withTryCatch(authControl.register));
authRouter.post('/login', withTryCatch(authControl.login));
authRouter.post('/logout', authenticateUser, withTryCatch(authControl.logout));

// 토큰 재발행
authRouter.get('/tokens/view', withTryCatch(authControl.viewTokens)); // 토큰 확인: 부가 기능
authRouter.post('/tokens/refresh', withTryCatch(authControl.issueTokens));

export default authRouter;
