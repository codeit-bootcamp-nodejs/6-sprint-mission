import { verifyAccessToken } from '../lib/token';
import { ACCESS_TOKEN_COOKIE_NAME } from '../lib/constants';
import authService from '../service/auth.service';
import { Request, Response, NextFunction } from 'express';
import NotFoundError from './errors/NotFoundError';
import UnauthorizedError from './errors/UnauthorizedError';

async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken = check_accessTokenExist(req.cookies);
    if (!accessToken) {
      // 인증 예외: 로그인 안 한 사용자도 상품/게시물 상세정보 얻을 수 있게 함
      if (req.method === 'GET' && typeof req.params.id === 'string') return next();

      console.log('Unauthorized');
      throw new UnauthorizedError('인증 토큰이 없습니다');
    }
    const { userId } = verifyAccessToken(accessToken);

    if (!userId) {
      console.log('No user found under the authorized token');
      throw new NotFoundError();
    }

    const user = await authService.verifyUserExist(userId);
    if (!user) {
      console.log('No user foundwith the given ID by accessToken');
      throw new NotFoundError();
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

function check_accessTokenExist(cookieData: Record<string, string | undefined>) {
  const accessToken = cookieData[ACCESS_TOKEN_COOKIE_NAME];
  // if (!accessToken) {
  //   print('No accessToken found');
  //   throw new NotFoundError('NO_ACCESSTOKEN_FOUND');
  // }
  return accessToken;
}

export default authenticate;
