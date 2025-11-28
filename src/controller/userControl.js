import { assert } from 'superstruct';
import { CreateUser } from '../struct/structs.js';
import userService from '../service/userService.js';
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
  assert(req.body, CreateUser);
  const newUser = await userService.register(req.body);
  console.log(`User_${newUser.id} registered successfully`);
  res.status(201).json(newUser);
}

async function login(req, res) {
  const { accessToken, refreshToken } = await userService.login(req, res);
  setTokenCookies(res, accessToken, refreshToken);
  console.log(`User logged-in`);
  res.status(200).json({ message: 'User logged-in' });
}

async function logout(req, res) {
  await userService.logout(res);
  console.log(`User logged-out`);
}

async function viewTokens(req, res) {
  console.log('');
  console.log(`accessToken:  ${req.cookies[ACCESS_TOKEN_COOKIE_NAME]}`);
  console.log(`refreshToken: ${req.cookies[REFRESH_TOKEN_COOKIE_NAME]}`);
  console.log('');
}

async function issueTokens(req, res) {
  const { accessToken, refreshToken } = await userService.issueTokens(req.cookies);
  setTokenCookies(res, accessToken, refreshToken);
  console.log(`Tokens refreshed`);
  res.status(201).json({ accessToken });
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
  res.status(200).json({ message: 'User password changed' });
}

async function getProducts(req, res) {
  const { id: userId } = req.user;
  const products = await userService.getProducts(userId);
  console.log(`User${req.user.id}: user products fetched`);
  res.status(200).json(products);
}

async function getArticles(req, res) {
  const { id: userId } = req.user;
  const articles = await userService.getArticles(userId);
  console.log(`User${req.user.id}: user articles fetched`);
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
  getArticles
};
