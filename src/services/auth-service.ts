// TODO) Auth-Service: 비즈니스 로직 처리
import jwt, { type JwtPayload, type Secret } from 'jsonwebtoken';

/**
 * @see https://github.com/vercel/ms
 */

import type { StringValue } from 'ms';
import { logger } from '../core/error/logger.js';

import { userRepo } from '../repositories/user-repository.js';

// 1) TokenPayload 정의
export interface TokenPayload {
  id: number;
  email: string;
}

// 2) 환경변수 검증
const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    // 2-1) 누락 시 로그
    logger.error(`${key}: 환경 변수가 누락되었습니다`);
    // 2-2) 누락 시 에러
    throw new Error('환경 변수 설정이 올바르지 않으니 확인하세요');
  }
  return value;
};

// 3) JWT 설정 로드
const ACCESS_SECRET: Secret = getRequiredEnv('JWT_ACCESS_SECRET');
const REFRESH_SECRET: Secret = getRequiredEnv('JWT_REFRESH_SECRET');
const ACCESS_EXPIRES_IN: StringValue | number = (process.env
  .JWT_ACCESS_EXPIRES_IN ?? '1h') as StringValue;
const REFRESH_EXPIRES_IN: StringValue | number = (process.env
  .JWT_REFRESH_EXPIRES_IN ?? '14d') as StringValue;

export const authService = {
  // 4) 액세스 토큰 발급
  signAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES_IN });
  },

  // 5) 리프레시 토큰 발급
  signRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, REFRESH_SECRET, {
      expiresIn: REFRESH_EXPIRES_IN,
    });
  },

  // 6) 액세스 토큰 검증
  verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
  },

  // 7) 리프레시 토큰 검증
  verifyRefreshToken(token: string): TokenPayload & JwtPayload {
    return jwt.verify(token, REFRESH_SECRET) as TokenPayload & JwtPayload;
  },

  // 8) 토큰 세트 발급
  async generateTokens(user: TokenPayload) {
    const accessToken = this.signAccessToken({
      id: user.id,
      email: user.email,
    });

    const refreshToken = this.signRefreshToken({
      id: user.id,
      email: user.email,
    });

    await userRepo.setUserRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  },

  // 9) 액세스 토큰 재발급
  rotateAccessToken(refreshToken: string) {
    const decoded = this.verifyRefreshToken(refreshToken);

    return this.signAccessToken({
      id: decoded.id,
      email: decoded.email,
    });
  },

  // 10) 리프레시 토큰 제거
  clearRefreshToken(userId: number) {
    return userRepo.clearUserRefreshToken(userId);
  },
};
