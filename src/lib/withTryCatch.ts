import { Request, Response, NextFunction, RequestHandler } from 'express';

export default function withTryCatch(handler: RequestHandler) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await handler(req, res, next); // 여기서 next 전달
    } catch (e) {
      next(e);
    }
  };
}
