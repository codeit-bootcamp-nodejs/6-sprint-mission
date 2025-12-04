import { assert } from 'superstruct';
import { CreateUser } from '../struct/structs.js';
import userService from '../service/user.service.js';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
  NODE_ENV,
  ACCESS_TOKEN_MAXAGE,
  REFRESH_TOKEN_MAXAGE
} from '../lib/constants.js';

async function getList(req, res) {
  const users = await userService.getList();
  if (users.length > 1) console.log('User list fetched');
  res.status(200).json(users);
}

async function register(req, res) {
  const newUser = await userService.register(req.body);
  console.log(`User_${newUser.id} registered successfully`);
  res.status(201).json(newUser);
}

async function login(req, res) {
  const { accessToken, refreshToken } = await userService.login(req, res);
  setTokenCookies(res, accessToken, refreshToken);
  console.log(`User logged-in`);
  res.status(200).send({ message: '사용자가 로그인 하였습니다' });
}

async function logout(req, res) {
  userService.logout(res);
  console.log(`User logged-out`);
  res.status(200).send({ message: '사용자가 로그아웃 하였습니다' });
}

async function viewTokens(req, res) {
  if (NODE_ENV === 'development') {
    const { accessToken, refreshToken } = userService.viewTokens(req.cookies);
    console.log('');
    console.log(`accessToken:  ${accessToken}`);
    console.log(`refreshToken: ${refreshToken}`);
    console.log('');
    if (!refreshToken) res.status(404).send({ message: '로그인 하세요' });
  } else {
    res.status(403).send({ message: '개발자 옵션입니다' });
  }
}

async function issueTokens(req, res) {
  const { accessToken, refreshToken } = await userService.issueTokens(req.cookies);
  setTokenCookies(res, accessToken, refreshToken);
  console.log(`Tokens refreshed`);
  res.status(201).send({ accessToken });
}

async function getInfo(req, res) {
  const user = await userService.getInfo(req.user.id);
  console.log(`User${req.user.id}: user info fetched`);
  res.status(200).json(user);
}

async function patchInfo(req, res) {
  const user = await userService.patchInfo(req.user.id, req.body);
  console.log(`User${req.user.id}: user info edited`);
  res.status(200).json(user);
}

async function patchPassword(req, res) {
  const { id: userId } = req.user;
  const { password_now: oldPassword, password_new: newPassword } = req.body;
  const user = await userService.patchPassword(userId, oldPassword, newPassword);
  console.log(`User${req.user.id}: user password changed`);
  res.status(200).send({ message: '패스워드가 변경되었습니다' });
}

async function getProducts(req, res) {
  const products = await userService.getProducts(req.user.id);
  console.log(`User${req.user.id}: user products fetched`);
  res.status(200).json(products);
}

async function getArticles(req, res) {
  const articles = await userService.getArticles(req.user.id);
  console.log(`User${req.user.id}: user articles fetched`);
  res.status(200).json(articles);
}

async function getLikedProducts(req, res) {
  const products = await userService.getLikedProducts(req.user.id);
  res.status(200).json(products);
}

async function getLikedArticles(req, res) {
  const articles = await userService.getLikedArticles(req.user.id);
  res.status(200).json(articles);
}

//-------------------------------------------------- local functions
function setTokenCookies(res, accessToken, refreshToken) {
  res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: NODE_ENV === 'production', // false: 쓸데없이 우회적인 표현
    maxAge: ACCESS_TOKEN_MAXAGE || 1 * 60 * 60 * 1000 // 1 hour
  });
  res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    maxAge: REFRESH_TOKEN_MAXAGE || 1 * 24 * 60 * 60 * 1000, // 1 day,
    path: '/users/tokens'
  });
}

export default {
  getList,
  register,
  login,
  logout,
  viewTokens,
  issueTokens,
  getInfo,
  patchInfo,
  patchPassword,
  getProducts,
  getArticles,
  getLikedProducts,
  getLikedArticles
};
