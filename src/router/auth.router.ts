import authControl from '../controller/auth.control';
import withTryCatch from '../lib/withTryCatch';
import authenticate from '../middleware/authenticate';
import express from 'express';
import { allowedUserKeys } from '../lib/constants';
import { validateReqBody } from '../middleware/validateReqBody';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateReqBody(allowedUserKeys, true),
  withTryCatch(authControl.register)
);
authRouter.post('/login', validateReqBody(allowedUserKeys), withTryCatch(authControl.login));
authRouter.post('/logout', authenticate(), withTryCatch(authControl.logout));

// 토큰 재발행
authRouter.get('/tokens/view', authenticate(), withTryCatch(authControl.viewTokens)); // 토큰 확인: 부가 기능
authRouter.post('/tokens/refresh', withTryCatch(authControl.issueTokens));

export default authRouter;
