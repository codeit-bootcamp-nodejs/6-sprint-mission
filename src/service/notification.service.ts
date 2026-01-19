import notificationRepo from '../repository/notification.repo';
import NotFoundError from '../middleware/errors/NotFoundError';
import { Notification } from '@prisma/client';
import notiRepo from '../repository/notification.repo';

async function getList(id: number): Promise<Notification[]> {
  return await notiRepo.findMany(id);
}

async function countUnread(id: number): Promise<number> {
  return await notiRepo.countUnread(id);
}

async function patch(id: number): Promise<Notification> {
  let notification = await notiRepo.findById(id);
  if (!notification) throw new NotFoundError('notification', id);
  if (notification.isRead === false) notification = await notiRepo.patch(id);
  return notification;
}

export default {
  getList,
  countUnread,
  patch
};
