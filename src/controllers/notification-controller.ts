// TODO) Notification-Controller: 요청 처리
import type { Request, Response } from 'express';
import { notificationService } from '../services/notification-service.js';

export const notificationController = {
  // 1) 알림 목록 조회
  async list(req: Request, res: Response) {
    const notifications = await notificationService.list(req.user!.id);

    res.status(200).json({
      success: true,
      message: '알림 목록 조회 성공',
      data: notifications,
    });
  },

  // 2) 미읽음 개수 조회
  async unreadCount(req: Request, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: '인증 정보가 없습니다',
      });
    }

    const count = await notificationService.countUnread(userId);

    res.status(200).json({
      success: true,
      message: '미읽음 알림 개수 조회 성공',
      data: { count },
    });
  },

  // 3) 읽음 처리
  async markRead(req: Request, res: Response) {
    const id = Number(req.params.id);
    const notification = await notificationService.markRead(id, req.user!.id);

    res.status(200).json({
      success: true,
      message: '알림을 읽음 처리했습니다',
      data: notification,
    });
  },
};
