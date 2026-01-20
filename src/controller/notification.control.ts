import { NextFunction, Request, Response } from 'express';
import notiService from '../service/notification.service';

async function getList(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { type } = req.query;
  const typeStr = typeof type === 'string' ? type : 'all';
  const notifications = await notiService.getList(req.user.id, typeStr);
  res.status(200).send({ total: notifications.length, data: notifications });
}

async function countUnread(req: Request, res: Response, next: NextFunction): Promise<void> {
  const unreadCount = await notiService.countUnread(req.user.id);
  res.status(200).json({ unreadCount });
}

async function patch(req: Request, res: Response, next: NextFunction): Promise<void> {
  const notification = await notiService.patch(Number(req.params.id));
  res.status(200).json(notification);
}

export default {
  getList,
  countUnread,
  patch
};
