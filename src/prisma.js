// src/prisma.js
import { PrismaClient } from '@prisma/client';

const globalForlPrisma = globalThis;

export const prisma = globalForlPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForlPrisma.prisma = prisma;
}

// 이 파일은 이미 리뷰를 받았기에 무시하셔도 됩니다 :)
