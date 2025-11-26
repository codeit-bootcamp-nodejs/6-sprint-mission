import express from 'express';
import withAsync from '../lib/withAsync.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validator.js';
import { PatchUserStruct } from '../lib/structs.js';
import { getUserMe, patchUserMe, deleteUserMe } from '../controllers/user.controller.js';

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

export default router;
