// TODO) User-Routes: URL 매핑
import { Router } from 'express';
import asyncHandler from '../core/error/async-handler.js';
import { requireAuth } from '../middleware/auth.js';

import validate from '../validator/validate.js';
import {
  RegisterUser,
  LoginUser,
  UpdateProfile,
} from '../validator/user-validator.js';

import { userController } from '../controllers/user-controller.js';

const router = Router();

// 1) 회원가입
router.post(
  '/register',
  validate(RegisterUser),
  asyncHandler(userController.register)
);

// 2) 로그인
router.post('/login', validate(LoginUser), asyncHandler(userController.login));

// 3) 내 정보 조회
router.get('/me', requireAuth, asyncHandler(userController.me));

// 4) 로그아웃
router.post('/logout', requireAuth, asyncHandler(userController.logout));

// 5) 프로필 수정
router.patch(
  '/name',
  requireAuth,
  validate(UpdateProfile),
  asyncHandler(userController.updateName)
);

// 6) 비밀번호 변경
router.patch(
  '/password',
  requireAuth,
  asyncHandler(userController.updatePassword)
);

// 7) 회원 탈퇴
router.delete('/', requireAuth, asyncHandler(userController.removeAccount));

// 8) 내가 등록한 상품 조회
router.get(
  '/me/products',
  requireAuth,
  asyncHandler(userController.myProducts)
);

// 9) 토큰 재발급
router.post('/token/refresh', asyncHandler(userController.refresh));

export default router;
