import { assert } from 'superstruct';
import { print } from '../lib/myFuns.js';
import { CreateUser } from '../struct/structs.js';
import userService from '../service/userService.js';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
  NODE_ENV,
  ACCESS_TOKEN_MAXAGE,
  REFRESH_TOKEN_MAXAGE
} from '../lib/constants.js';
import { ARTICLECOMMENTS } from '../../prisma/mock.js';

async function getList(req, res) {
  const users = await userService.getList();
  console.log('User list fetched');
  res.status(200).json(users);
}

async function register(req, res) {
  assert(req.body, CreateUser);
  const newUser = await userService.register(req.body);
  console.log('User registered successfully');
  res.status(201).json(newUser);
}

async function login(req, res) {
  const { accessToken, refreshToken } = await userService.login(req, res);
  setTokenCookies(res, accessToken, refreshToken);
  console.log('User logged-in');
  res.status(200).json({ message: 'User logged-in' });
}

async function logout(req, res) {
  await userService.logout(res);
  console.log('User logged-out');
}

async function viewTokens(req, res) {
  console.log('');
  console.log(`accessToken:  ${req.cookies[ACCESS_TOKEN_COOKIE_NAME]}`);
  console.log(`refreshToken: ${req.cookies[REFRESH_TOKEN_COOKIE_NAME]}`);
}

async function issueTokens(req, res) {
  const { accessToken, refreshToken } = await userService.issueTokens(req.cookies);
  setTokenCookies(res, accessToken, refreshToken);
  print('Tokens refreshed');
  res.status(201).json({ accessToken });
}

async function getInfo(req, res) {
  const user = await userService.getInfo(req.user.id);
  console.log('User information fetched');
  res.status(200).json(user);
}

async function patchInfo(req, res) {
  const user = await userService.patchInfo(req.user.id, req.body);
  console.log('User Information edited');
  res.status(200).json(user);
}

async function patchPassword(req, res) {
  const { id: userId } = req.user;
  const { password_now: oldPassword, password_new: newPassword } = req.body;
  const user = await userService.patchPassword(userId, oldPassword, newPassword);
  console.log('User password changed');
  res.status(200).json({ message: 'User password changed' });
}

async function getProducts(req, res) {
  const { id: userId } = req.user;
  const products = await userService.getProducts(userId);
  console.log(`${products.length} products fetched`);
  res.status(200).json(products);
}

async function getArticles(req, res) {
  const { id: userId } = req.user;
  const articles = await userService.getArticles(userId);
  console.log(`${articles.length} articles fetched`);
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

// export async function getMyInfo(req, res) {
//   const user = await userService.getMyInfo(req.body);
//   res.status(200).json(user);
// }

// export async function patchUser(req, res) {
//   const user = await patchUserService(req.body);
//   res.status(200).json(user);
// }

// export async function patchUserPassword(req, res) {
//   const user = await patchUserPasswordService(req.body);
//   res.status(200).json(user);
// }

// export async function getUserProducts(req, res) {
//   const user = await getUserProductsService(req.body);
//   res.status(200).json(user);
// }

// export async function getUserArticles(req, res) {
//   const user = await getUserArticlesService(req.body);
//   res.status(200).json(user);
// }

// export async function deleteUser(req, res) {
//   const user = await deleteUserService(req.body);
//   res.status(200).json(user);
// }

// export default {
//   getList,
//   register,
//   login,
//   logout,
//   viewTokens,
//   issueTokens
// };
