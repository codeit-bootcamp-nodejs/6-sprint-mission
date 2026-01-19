import { Notification } from '@prisma/client';
import prisma from '../lib/prismaClient';

async function findById(id: number): Promise<Notification | null> {
  return prisma.notification.findUnique({ where: { id } });
}

async function findMany(userId: number): Promise<Notification[]> {
  return prisma.notification.findMany({ where: { userId } });
}

async function countUnread(userId: number): Promise<number> {
  return prisma.notification.count({ where: { userId, isRead: false } });
}

async function patch(id: number): Promise<Notification> {
  return prisma.notification.update({
    where: { id },
    data: { isRead: true }
  });
}

export default {
  findById,
  findMany,
  countUnread,
  patch
};
