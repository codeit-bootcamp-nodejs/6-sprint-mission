import { Prisma, Notification } from '@prisma/client';
import prisma from '../lib/prismaClient';

async function findById(id: number, type: string): Promise<Notification | null> {
  return prisma.notification.findUnique({ where: { id } });
}

async function findMany(userId: number, type: string): Promise<Notification[]> {
  let notifications;
  if (type === 'unread')
    notifications = await prisma.notification.findMany({ where: { userId, isRead: false } });
  else if (type === 'read')
    notifications = await prisma.notification.findMany({ where: { userId, isRead: true } });
  else notifications = await prisma.notification.findMany({ where: { userId } });
  return notifications;
}

async function countUnread(userId: number): Promise<number> {
  return prisma.notification.count({ where: { userId, isRead: false } });
}

async function patch(id: number): Promise<Notification> {
  return prisma.notification.update({
    where: { id },
    data: { isRead: true, readAt: new Date() }
  });
}

async function post(data: Prisma.NotificationCreateInput): Promise<Notification> {
  return prisma.notification.create({ data });
}

export default {
  findById,
  findMany,
  countUnread,
  patch,
  post
};
