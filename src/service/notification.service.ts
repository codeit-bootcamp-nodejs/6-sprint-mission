import { Notification } from '@prisma/client';
import notiRepo from '../repository/notification.repo';

async function getList(id: number, type: string): Promise<Notification[]> {
  return await notiRepo.findMany(id, type);
}

async function countUnread(id: number): Promise<number> {
  const count = await notiRepo.countUnread(id);
  return count;
}

async function patch(id: number): Promise<Notification> {
  return await notiRepo.patch(id);
}

export default {
  getList,
  countUnread,
  patch
};
