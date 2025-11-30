import { verifyAccessToken } from '../lib/token.js';
import { ACCESS_TOKEN_COOKIE_NAME } from '../lib/constants.js';
import NotFoundError from './errors/NotFoundError.js';
import userService from '../service/userService.js';
import { print } from '../lib/myFuns.js';

async function authenticateUser(req, res, next) {
  try {
    const accessToken = check_accessTokenExist(req.cookies);
    const { userId } = verifyAccessToken(accessToken);
    if (!userId) throw new NotFoundError('NO_USERID_FOUND');

    const user = await userService.verifyUserExist(userId);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

function check_accessTokenExist(cookieData) {
  const accessToken = cookieData[ACCESS_TOKEN_COOKIE_NAME];
  if (!accessToken) {
    print('No accessToken found');
    throw new NotFoundError('NO_ACCESSTOKEN_FOUND');
  }
  return accessToken;
}

export default authenticateUser;
