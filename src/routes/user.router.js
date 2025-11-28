import express from 'express';
import withAsync from '../lib/withAsync.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validator.js';
import { PatchUserStruct, PatchPasswordStruct } from '../lib/structs.js';
import {
  getUserMe,
  patchUserMe,
  deleteUserMe,
  updatePassword,
  getMyProducts,
} from '../controllers/user.controller.js';

const router = express.Router();

// (/users -> /me)
// 내 정보 조회     GET     (/users/me)
router
  .route('/me')
  .get(authMiddleware, withAsync(getUserMe))

  // 내 정보 수정     PATCH   (/users/me)
  .patch(
    authMiddleware, // 로그인 확인
    validate(PatchUserStruct, 'body'), // 패치 내용 유효성 검사
    withAsync(patchUserMe), // 수정 실행
  )

  // 회원 탈퇴        DELETE  (/users/me)
  .delete(authMiddleware, withAsync(deleteUserMe));

//비밀번호 변경 (/users/me/password)
router
  .route('/me/password')
  .patch(authMiddleware, validate(PatchPasswordStruct, 'body'), withAsync(updatePassword));

//내가 등록한 상품 조회
router.route('/me/products').get(authMiddleware, withAsync(getMyProducts));

export default router;
