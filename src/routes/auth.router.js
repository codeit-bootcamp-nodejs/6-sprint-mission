import express from 'express';
import withAsync from '../lib/withAsync.js';
import { validate } from '../middlewares/validator.js';
import { login, signUp } from '../controllers/auth.controller.js';
import { CreateUserStruct, LoginUserStruct } from '../lib/structs.js';

const router = express.Router();

// =========== 회원가입     POST (/auth/signUp)
router.route('/sign-up').post(validate(CreateUserStruct), withAsync(signUp));

// =========== 로그인       POST (/auth/login)
router.route('/login').post(validate(LoginUserStruct), withAsync(login));

// =========== 토큰 재발급   POST (/auth/refresh)
// router.route('/refresh').post(validate(), withAsync());

// =========== 로그아웃     POST (/auth/logout)
// router.route('/logout').post(validate(), withAsync());

export default router;
