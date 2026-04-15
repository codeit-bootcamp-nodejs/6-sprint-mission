// TODO) Notification-Repository: 알림 저장소
import type { Prisma } from '@prisma/client';
import prisma from '../config/prisma.js';

export const notificationRepo = {
  // 1) 알림 목록 조회
  findByUser(userId: number) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        type: true,
        message: true,
        isRead: true,
        productId: true,
        articleId: true,
        createdAt: true,
      },
    });
  },

  // 2) 알림 단건 조회
  findById(id: number) {
    return prisma.notification.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        type: true,
        message: true,
        isRead: true,
        productId: true,
        articleId: true,
        createdAt: true,
      },
    });
  },

  // 3) 미읽음 개수 조회
  countUnread(userId: number) {
    return prisma.notification.count({
      where: { userId, isRead: false },
    });
  },

  // 4) 알림 생성
  create(data: Prisma.NotificationUncheckedCreateInput) {
    return prisma.notification.create({
      data,
      select: {
        id: true,
        type: true,
        message: true,
        isRead: true,
        productId: true,
        articleId: true,
        createdAt: true,
      },
    });
  },

  // 5) 읽음 처리
  markRead(id: number) {
    return prisma.notification.update({
      where: { id },
      data: { isRead: true },
      select: {
        id: true,
        type: true,
        message: true,
        isRead: true,
        productId: true,
        articleId: true,
        createdAt: true,
      },
    });
  },
};
