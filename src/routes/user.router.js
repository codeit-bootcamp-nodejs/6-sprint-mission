import express from 'express';
import withAsync from '../lib/withAsync.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getUserMe } from '../controllers/user.controller.js';

const router = express.Router();

// (/users -> /me)
router.route('/me').get(authMiddleware, withAsync(getUserMe));
// 내 정보 조회     GET     (/users/me)
// 내 정보 수정     PATCH   (/users/me)
// 회원 탈퇴        DELETE  (/users/me)

export default router;
