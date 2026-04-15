// TODO) Express-Type-Extension: req.user 전역 선언
import type { AuthUser } from '../middleware/auth.js';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
