import { StructError } from 'superstruct';
import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

export function defaultNotFoundHandler(req: Request, res: Response, next: NextFunction) {
  return res.status(404).send({ message: '요청하신 페이지를 찾을 수 없습니다' });
}

const defaultMessageByStatus: Record<number, string> = {
  400: '잘못된 요청입니다',
  401: '인증이 필요합니다',
  403: '권한이 없습니다',
  404: '존재하지 않습니다',
  409: '중복 상태/관계가 존재합니다',
  500: '서버 내부 문제가 발생했습니다',
  503: '일시적 서버 문제가 발생했습니다. 잠시 후 다시 시도해 주세요'
};

export function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // console.error(err); // 개발용

  let statusCode: number | undefined = err.statusCode;
  let message: string | undefined = err.message;

  // 1) Superstruct
  if (!statusCode && err instanceof StructError) {
    statusCode = 400;

    const failures = typeof err.failures === 'function' ? err.failures() : [];
    const firstFailure = failures[0];

    if (!message && firstFailure?.message) {
      message = firstFailure.message;
    }
  }

  // 2) Prisma
  if (!statusCode && err instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaToHttp: Record<string, number> = {
      P2002: 409,
      P2003: 400,
      P2007: 400,
      P2015: 404,
      P2025: 404,
      P1000: 500,
      P1010: 500,
      P1012: 500,
      P1017: 503,
      P2021: 500
    };
    statusCode = prismaToHttp[err.code] ?? 500;
    message = defaultMessageByStatus[statusCode] ?? defaultMessageByStatus[500];
  }

  // 3) JSON 파싱 에러
  if (!statusCode && err instanceof SyntaxError && 'body' in err) {
    statusCode = 400;
  }

  // 4) 최종 폴백
  statusCode ??= 500;
  message ??= defaultMessageByStatus[statusCode] ?? defaultMessageByStatus[500];

  return res.status(statusCode).send({ message });
}
