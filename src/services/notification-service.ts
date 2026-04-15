// TODO) Notification-Service: 알림 비즈니스 로직
import type { NotificationType } from '@prisma/client';
import { NotFoundError } from '../core/error/error-handler.js';
import { notificationRepo } from '../repositories/notification-repository.js';
import { emitToUser, SOCKET_EVENT_NOTIFICATION } from '../socket/io.js';

type CreateNotificationPayload = {
  userId: number;
  type: NotificationType;
  message: string;
  productId?: number | null;
  articleId?: number | null;
};

export const notificationService = {
  // 1) 알림 목록 조회
  async list(userId: number) {
    return notificationRepo.findByUser(userId);
  },

  // 2) 미읽음 개수 조회
  async countUnread(userId: number) {
    return notificationRepo.countUnread(userId);
  },

  // 3) 읽음 처리
  async markRead(id: number, userId: number) {
    const notification = await notificationRepo.findById(id);

    if (!notification || notification.userId !== userId) {
      throw new NotFoundError('알림을 찾을 수 없습니다');
    }

    return notificationRepo.markRead(id);
  },

  // 4) 알림 생성 + 실시간 전송
  async create(payload: CreateNotificationPayload) {
    const created = await notificationRepo.create({
      userId: payload.userId,
      type: payload.type,
      message: payload.message,
      productId: payload.productId ?? null,
      articleId: payload.articleId ?? null,
    });

    emitToUser(payload.userId, SOCKET_EVENT_NOTIFICATION, created);

    return created;
  },
};
