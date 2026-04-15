// TODO) Prisma-Singleton: 환경, 설정, 공통 미들웨어 정의
// ?) PrismaClient DB 연결 중복 예방
import './env.js';
// 1) PrismaClient가 생성되기 전에 .env를 반드시 로드해야 오류 안터짐!
import { PrismaClient } from '@prisma/client';

// 2) 새로운 PrismaClient 생성
const prisma = new PrismaClient({
  // 3) 로그 옵션
  log:
    process.env.DEBUG_MODE === 'true'
      ? ['query', 'info', 'warn', 'error'] // ← 개발: 모든 로그 출력
      : ['error'], // ← 배포: 에러 로그만 출력
});

export default prisma;
