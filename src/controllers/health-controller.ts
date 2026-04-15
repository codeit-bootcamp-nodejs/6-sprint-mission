// TODO) Helath-Controller: 요청 처리
import type { Request, Response } from 'express';
import prisma from '../config/prisma.js';

// 1) 서버 연결 확인
export const checkHealth = async (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: '서버 연결 성공',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
};

// 2) DB 연결 확인
export const checkDatabase = async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      success: true,
      message: 'DB 연결 성공',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';
    res.status(500).json({
      success: false,
      message: 'DB 연결 실패',
      error: message,
    });
  }
};
