import { verifyAccessToken } from '../lib/token.js';
import { ACCESS_TOKEN_COOKIE_NAME } from '../lib/constants.js';
import NotFoundError from './errors/NotFoundError.js';
import userService from '../service/user.service.js';
import { print } from '../lib/myFuns.js';
import BadRequestError from './errors/BadRequestError.js';

async function authenticateUser(req, res, next) {
  try {
    const accessToken = check_accessTokenExist(req.cookies);
    if (!accessToken) {
      // 로그인 안 한 사용자도 상품/게시물 상세정보 얻을 수 있게 함
      if (req.method === 'GET' && typeof req.params.id === 'string') return next();

      console.log('Unauthorized');
      throw new BadRequestError('UNAUTHORIZED');
    }
    const { userId } = verifyAccessToken(accessToken);

    if (!userId) {
      console.log('No user found under the authorized token');
      throw new BadRequestError('NO_USER_FOUND');
    }

    const user = await userService.verifyUserExist(userId);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

function check_accessTokenExist(cookieData) {
  const accessToken = cookieData[ACCESS_TOKEN_COOKIE_NAME];
  // if (!accessToken) {
  //   print('No accessToken found');
  //   throw new NotFoundError('NO_ACCESSTOKEN_FOUND');
  // }
  return accessToken;
}

export default authenticateUser;
