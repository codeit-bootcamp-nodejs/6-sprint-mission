import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../middleware/errors/BadRequestError';

export function validateReqBody(allowedKeys: readonly string[], requireAll?: boolean) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const bodyKeys = Object.keys(req.body ?? {});
      if (!bodyKeys.length) throw new BadRequestError('수정할 필드가 없습니다');

      const invalidKeys = bodyKeys.filter((k) => !allowedKeys.includes(k));
      if (invalidKeys.length) {
        throw new BadRequestError(`허용되지 않은 필드 (${invalidKeys.join(', ')})`);
      }

      if (requireAll) {
        const missingKeys = allowedKeys.filter((k) => !bodyKeys.includes(k));
        if (missingKeys.length) {
          throw new BadRequestError(`필수 필드 누락 (${missingKeys.join(', ')})`);
        }
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
