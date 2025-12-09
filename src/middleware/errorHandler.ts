import { StructError } from 'superstruct';
import BadRequestError from './errors/BadRequestError';
import NotFoundError from './errors/NotFoundError';
import { Prisma } from '@prisma/client';
import { ErrorRequestHandler, RequestHandler } from 'express';

export const defaultNotFoundHandler: RequestHandler = function (req, res, next) {
  return res.status(404).send({ message: '요청하신 페이지를 찾을 수 없습니다.' });
};

export const globalErrorHandler: ErrorRequestHandler = function (err, req, res, next) {
  console.error(err); // 개발용 로그

  // Superstruct 에러 처리
  if (err instanceof StructError) {
    const failures = typeof err.failures === 'function' ? err.failures() : [];
    const firstFailure = failures.length > 0 ? failures[0] : null;

    if (firstFailure && firstFailure.message && firstFailure.refinement) {
      return res.status(400).send({ message: firstFailure.message });
    }

    return res.status(400).send({ message: '잘못된 요청입니다.' });
  }

  // 서비스 계층에서 던진 BadRequestError 처리
  if (err instanceof BadRequestError) {
    switch (err.message) {
      case 'FORBIDDEN':
        return res.status(403).send({ message: '비밀번호가 틀렸습니다' });
      case 'USER_FOUND':
        return res.status(401).send({ message: '이미 등록된 사용자입니다' });
      case 'NO_USER_FOUND':
        return res.status(401).send({ message: '등록되지 않은 사용자입니다' });
      case 'EXPIRED_TOKENS':
        return res.status(400).send({ message: '유효한 토큰이 없습니다' });
      case 'UNAUTHORIZED':
        return res.status(401).send({ message: '권한이 없습니다' });
      case 'NOTHING_TO_CHANGE':
        return res.status(401).send({ message: '변경할 것이 없습니다' });
      default:
        return res.status(400).send({ message: err.message || '잘못된 요청입니다.' });
    }
  }

  // 403 Forbidden (비밀번호 오류)
  // throw new Error로 던지는 경우 여기 걸림
  if (err.message === 'FORBIDDEN') {
    return res.status(403).send({
      message: '비밀번호가 틀렸습니다.'
    });
  }

  // NotFoundError (서비스 계층에서 던진 404)
  if (err instanceof NotFoundError || err.message === 'NOT_FOUND') {
    return res.status(404).send({
      message: err.message || '존재하지 않습니다.'
    });
  }
  // if (err.code === 'P2002') {
  //   return res.status(409).send({
  //     message: '이미 이 큐레이션에는 댓글이 존재합니다.'
  //   });
  // }
  // Prisma 관련 오류 처리
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const prisma_errorCode = [
      'P2000',
      'P2006',
      'P2007',
      'P2009',
      'P2003',
      'P2008',
      'P2025',
      'P2001',
      'P2012',
      'P1016',
      'P1000',
      'P1001',
      'P1008'
    ];
    const HTTP_status = [400, 400, 400, 400, 403, 403, 404, 404, 500, 500, 500, 500, 500];
    const myHTTPstatus = HTTP_status[prisma_errorCode.indexOf(err.code)];

    //console.log(`메시지: ${err.message}`);

    if (myHTTPstatus === 400) {
      return res.status(400).send({ message: '잘못된 요청입니다.' });
    } else if (myHTTPstatus === 403) {
      return res.status(403).send({ message: '권한이 없습니다.' });
    } else if (myHTTPstatus === 404) {
      return res.status(404).send({ message: '존재하지 않습니다.' });
    } else {
      return res.status(500).send({ message: '서버 내부 문제가 발생했습니다.' });
    }
  }

  // JSON 파싱 오류
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).send({ message: '잘못된 요청입니다.' });
  }

  // 기타 알 수 없는 오류: 지금까지 에러가 안 걸러졌다면, 반드시 여기서 걸리게.
  return res.status(500).send({
    message: '서버 내부 문제가 발생했습니다'
  });
};
