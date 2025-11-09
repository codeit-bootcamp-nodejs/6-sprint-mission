import bcrypt from 'bcrypt';
import BadRequestError from '../middleware/errors/BadRequestError.js';
import userRepository from '../repository/userRepository.js';
import { ACCESS_TOKEN_COOKIE_NAME, NODE_ENV, REFRESH_TOKEN_COOKIE_NAME } from '../lib/constants.js';
import { generateTokens, verifyRefreshToken } from '../lib/token.js';
import NotFoundError from '../middleware/errors/NotFoundError.js';
import { assert } from 'superstruct';
import { PatchUser } from '../struct/structs.js';
import { print, isEmpty } from '../lib/myFuns.js';

async function getList() {
  const users = await userRepository.getList();
  if (!users) throw new Error('NOT_FOUND');
  return filterPassword(users);
}

async function register(data) {
  const { email, nickname, password } = data;
  const isRegistered = await check_userRegistration(email);
  if (isRegistered) {
    console.log('User registered already');
    throw new BadRequestError('USER_EXISTS');
  }

  const newData = {
    email,
    nickname,
    password: await hashingPassword(password)
  };

  const newUser = await userRepository.create(newData);
  return filterPassword(newUser);
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await check_userRegistration(email);
  if (isEmpty(user)) throw new BadRequestError('USER_EXISTS');
  if (!check_passwordValidity(password, user.password)) {
    console.log('Invalid password');
    throw new BadRequestError('FORBIDDEN');
  }
  const { accessToken, refreshToken } = generateTokens(user.id);
  return { accessToken, refreshToken };
}

async function logout(res) {
  clearTokenCookies(res);
  res.status(200).send();
}

async function issueTokens(tokenData) {
  const refreshToken = check_refreshTokenValidity(tokenData);
  const { userId } = verifyRefreshToken(refreshToken);
  const user = await verifyUserExist(userId);

  return generateTokens(user.id);
}

async function getInfo(userId) {
  const user = await userRepository.findById(userId);
  return filterPassword(user);
}

async function patchInfo(userId, userData) {
  assert(userData, PatchUser);
  const user = await userRepository.update(userId, userData);
  return filterPassword(user);
}

async function patchPassword(userId, oldPassword, newPassword) {
  const user = await userRepository.findById(userId);
  console.log(await hashingPassword(oldPassword));
  console.log(user.password);
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
  const newUser = await userRepository.update(userId, userData);
  return filterPassword(newUser);
}

async function getProducts(userId) {
  const products = userRepository.getProducts(userId);
  if (isEmpty(products)) {
    print('No products registered by current user');
    throw new NotFoundError(products, userId);
  }
  return products;
}

async function getArticles(userId) {
  const articles = userRepository.getArticles(userId);
  if (isEmpty(articles)) {
    print('No products registered by current user');
    throw new NotFoundError(products, userId);
  }
  return articles;
}

//------------------------------------ local functions

function filterPassword(userData) {
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
  const user = await userRepository.findByEmail(email);
  return user;
}

async function check_passwordValidity(textPassword, savedPassword) {
  const isPasswordSame = await bcrypt.compare(textPassword, savedPassword);
  return isPasswordSame;
}

function clearTokenCookies(res) {
  res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
  res.clearCookie(REFRESH_TOKEN_COOKIE_NAME); // refreshToken 안 없어짐
}

function check_refreshTokenValidity(tokenData) {
  const refreshToken = tokenData[REFRESH_TOKEN_COOKIE_NAME];
  if (!refreshToken) {
    console.log('No valid refreshToken found. Try login.');
    throw new BadRequestError('NO_VALID_REFRESHTOKEN');
  }
  return refreshToken;
}

async function verifyUserExist(userId) {
  const user = await userRepository.findById(userId);
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
  getInfo,
  patchInfo,
  patchPassword,
  getProducts,
  getArticles,
  verifyUserExist
};
