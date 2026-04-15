// TODO) Notification-Routes: URL 매핑
import { Router } from 'express';
import asyncHandler from '../core/error/async-handler.js';
import { requireAuth } from '../middleware/auth.js';
import { validateParams } from '../validator/validate.js';
import { NotificationIdParams } from '../validator/notification-validator.js';
import { notificationController } from '../controllers/notification-controller.js';

const router = Router();

// 1) 알림 목록 조회
router.get('/', requireAuth, asyncHandler(notificationController.list));

// 2) 미읽음 개수 조회
router.get(
  '/unread-count',
  requireAuth,
  asyncHandler(notificationController.unreadCount)
);

// 3) 읽음 처리
router.patch(
  '/:id/read',
  requireAuth,
  validateParams(NotificationIdParams),
  asyncHandler(notificationController.markRead)
);

export default router;
