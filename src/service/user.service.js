import bcrypt from 'bcrypt';
import BadRequestError from '../middleware/errors/BadRequestError.js';
import userRepo from '../repository/user.repo.js';
import { ACCESS_TOKEN_COOKIE_NAME, NODE_ENV, REFRESH_TOKEN_COOKIE_NAME } from '../lib/constants.js';
import { generateTokens, verifyRefreshToken } from '../lib/token.js';
import NotFoundError from '../middleware/errors/NotFoundError.js';
import { assert } from 'superstruct';
import { CreateUser } from '../struct/structs.js';
import { PatchUser } from '../struct/structs.js';
import { print, isEmpty } from '../lib/myFuns.js';
import { selectUserFields } from '../lib/selectFields.js';

async function getList() {
  if (NODE_ENV === 'development') {
    const users = await userRepo.getList();
    if (!users) throw new Error('NOT_FOUND');
    return filterPassword(users);
  } else {
    return { message: '개발자 옵션 입니다' };
  }
}

async function register(data) {
  assert(data, CreateUser);
  const { email, nickname, password } = data;

  const { isNew } = await check_userRegistration(email);
  if (!isNew) {
    console.log('User registered already');
    throw new BadRequestError('USER_FOUND');
  }

  const newData = {
    email,
    nickname,
    password: await hashingPassword(password)
  };

  const newUser = await userRepo.create(newData);
  return filterPassword(newUser);
}

async function login(req, res) {
  const { email, password } = req.body;
  const { isNew, user } = await check_userRegistration(email);
  if (isNew) throw new BadRequestError('NO_USER_FOUND');

  if (!check_passwordValidity(password, user.password)) {
    console.log('Invalid password');
    throw new BadRequestError('FORBIDDEN');
  }

  const { accessToken, refreshToken } = generateTokens(user.id);
  return { accessToken, refreshToken };
}

function logout(tokenData) {
  clearTokenCookies(tokenData);
}

async function issueTokens(tokenData) {
  const refreshToken = check_refreshTokenValidity(tokenData);
  const { userId } = verifyRefreshToken(refreshToken);
  const user = await verifyUserExist(userId);

  return generateTokens(user.id);
}

function viewTokens(tokenData) {
  const accessToken = tokenData[ACCESS_TOKEN_COOKIE_NAME];
  const refreshToken = tokenData[REFRESH_TOKEN_COOKIE_NAME];
  return { accessToken, refreshToken };
}

async function getInfo(userId) {
  const user = await userRepo.findById(userId);
  return selectUserFields(user, 'all');
}

async function patchInfo(userId, userData) {
  assert(userData, PatchUser);
  const user = await userRepo.patch(userId, userData);
  return selectUserFields(user, 'core');
}

async function patchPassword(userId, oldPassword, newPassword) {
  const user = await userRepo.findById(userId);
  if (!(await check_passwordValidity(oldPassword, user.password))) {
    print('Invalid current password');
    throw new BadRequestError('FORBIDDEN');
  }

  // 현재 패스워드 입력을 요구하므로 비교는 불필요하지만 넣어 보았음
  if (await check_passwordValidity(newPassword, user.password)) {
    print('Invalid new password: same');
    throw new BadRequestError('NOTHING_TO_CHANGE');
  }

  const userData = { password: await hashingPassword(newPassword) };
  assert(userData, PatchUser);
  const newUser = await userRepo.patch(userId, userData);
  return selectUserFields(newUser, 'core');
}

// async function getProducts(userId) {
//   const products = await userRepo.getProducts(userId);
//   if (isEmpty(products)) {
//     print(`No products registered by user_${userId}`);
//     throw new NotFoundError(products, userId);
//   }
//   return selectUserFields(products, 'myProducts');
// }

// async function getArticles(userId) {
//   const articles = await userRepo.getArticles(userId);
//   if (isEmpty(articles)) {
//     print(`No articles registered by user_${userId}`);
//     throw new NotFoundError(articles, userId);
//   }
//   return selectUserFields(articles, 'myArticles');
// }

async function getProducts(userId) {
  const user = await userRepo.findById(Number(userId));
  const selectedInfo = selectUserFields(user, 'myProducts');
  if (isEmpty(selectedInfo)) {
    print(`No products registered by user_${userId}`);
    throw new NotFoundError(user, userId);
  }
  return selectedInfo;
}

async function getArticles(userId) {
  const user = await userRepo.findById(Number(userId));
  const selectedInfo = selectUserFields(user, 'myArticles');
  if (isEmpty(selectedInfo)) {
    print(`No articles registered by user_${userId}`);
    throw new NotFoundError(user, userId);
  }
  return selectedInfo;
}

async function getLikedProducts(userId) {
  const user = await userRepo.findById(Number(userId));
  if (isEmpty(user.likedProducts)) {
    print(`No products liked by user_${userId}`);
    throw new NotFoundError(user.likedProducts, userId);
  }
  return selectUserFields(user, 'likedProducts');
}

async function getLikedArticles(userId) {
  const user = await userRepo.findById(Number(userId));
  if (isEmpty(user.likedArticles)) {
    print(`No articles liked by user_${userId}`);
    throw new NotFoundError(user.likedArticles, userId);
  }
  return selectUserFields(user, 'likedArticles');
}

//------------------------------------ local functions

export function filterPassword(userData) {
  if (Array.isArray(userData)) {
    return userData.map((user) => {
      const { password: _, ...rest } = user;
      return rest;
    });
  } else {
    const { password: _, ...rest } = userData;
    return rest;
  }
}

async function hashingPassword(textPassword) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(textPassword, salt);
}

async function check_userRegistration(email) {
  const user = await userRepo.findByEmail(email);
  if (isEmpty(user)) return { isNew: true };
  else {
    return { isNew: false, user };
  }
}

async function check_passwordValidity(textPassword, savedPassword) {
  const isPasswordSame = await bcrypt.compare(textPassword, savedPassword);
  return isPasswordSame;
}

function clearTokenCookies(tokenData) {
  tokenData.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
  tokenData.clearCookie(REFRESH_TOKEN_COOKIE_NAME, { path: '/users/tokens' });
  // refreshToken은 지정된 path가 있음
}

function check_refreshTokenValidity(tokenData) {
  const refreshToken = tokenData[REFRESH_TOKEN_COOKIE_NAME];
  if (!refreshToken) {
    console.log('Tokens expired');
    throw new BadRequestError('EXPIRED_TOKENS');
  }
  return refreshToken;
}

async function verifyUserExist(userId) {
  const user = await userRepo.findById(userId);
  if (!user) {
    console.log('No user found. Resgister again.');
    throw new NotFoundError(user, userId);
  }
  return user;
}

export default {
  getList,
  register,
  login,
  logout,
  issueTokens,
  viewTokens,
  getInfo,
  patchInfo,
  patchPassword,
  getProducts,
  getArticles,
  verifyUserExist,
  filterPassword,
  getLikedProducts,
  getLikedArticles,
  filterPassword
};
