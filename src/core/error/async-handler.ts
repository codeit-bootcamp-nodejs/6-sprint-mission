// TODO) Async-Handler: 비동기 라우터 에러 자동 처리 래퍼
// ?) Express 비동기 컨트롤러에서 발생하는 에러를 자동으로 next(err)로 전달하는 헬퍼
import type { NextFunction, Request, Response } from 'express';

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown> | unknown;

const asyncHandler =
  (fn: AsyncController) =>
  (req: Request, res: Response, next: NextFunction) => {
    // fn(req, res, next)가 Promise이므로 자동으로 resolve/catch 가능
    Promise.resolve(fn(req, res, next)).catch(next);
    // catch(next) → 오류 발생 시 Express 에러 핸들러로 넘김
  };

export default asyncHandler;
