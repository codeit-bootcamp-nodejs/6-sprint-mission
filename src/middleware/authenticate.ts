import { verifyAccessToken } from '../lib/token';
import authService from '../service/auth.service';
import { Request, Response, NextFunction } from 'express';
import UnauthorizedError from './errors/UnauthorizedError';

function authenticate(options?: { optional?: boolean }) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const auth = req.headers.authorization;

      if (!auth) {
        if (options?.optional) return next();
        throw new UnauthorizedError();
      }

      if (!auth.startsWith('Bearer ')) throw new UnauthorizedError();

      const accessToken = auth.slice(7);
      const { userId } = verifyAccessToken(accessToken);

      const user = await authService.verifyUserExist(userId);
      if (!user) throw new UnauthorizedError();

      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  };
}

export default authenticate;
