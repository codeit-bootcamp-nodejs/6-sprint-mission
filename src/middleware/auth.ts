// TODO) Auth: 요청마다 실행되는 커스텀 로직
import type { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../core/error/error-handler.js';

import { authService, type TokenPayload } from '../services/auth-service.js';

// 1) 토큰 payload 형태
export type AuthUser = TokenPayload;

// 2) 인증 미들웨어 함수
export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // 2-1) Authorization 헤더 파싱
  const auth = req.headers.authorization || '';
  const [type, token] = auth.split(' ');

  // 2-2) Bearer 토큰 검증
  if (type !== 'Bearer' || !token) {
    return next(
      new UnauthorizedError(
        'authorization',
        '승인 헤더가 없거나 형식이 잘못되었습니다'
      )
    );
  }

  // 2-3) 토큰 검증 & req.user 주입
  try {
    const decoded = authService.verifyAccessToken(token) as TokenPayload;
    req.user = { id: decoded.id, email: decoded.email };

    return next();
  } catch (error) {
    return next(
      new UnauthorizedError(
        'authorization',
        '유효하지 않거나 만료된 토큰입니다'
      )
    );
  }
}
