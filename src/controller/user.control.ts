import { Request, Response } from 'express';
import userService from '../service/user.service';
import { SafeCompleteUser } from '../dto/interfaceType';
import { REFRESH_TOKEN_COOKIE_NAME, NODE_ENV, REFRESH_TOKEN_MAXAGE } from '../lib/constants';

async function getList(req: Request, res: Response): Promise<void> {
  const users = (await userService.getList()) as SafeCompleteUser[];
  if (users.length > 1) console.log('User list fetched');
  res.status(200).json(users);
}

async function getInfo(req: Request, res: Response): Promise<void> {
  const user = await userService.getInfo(req.user.id);
  console.log(`User${req.user.id}: user info fetched`);
  res.status(200).json(user);
}

async function patchInfo(req: Request, res: Response): Promise<void> {
  const user = await userService.patchInfo(req.user.id, req.body);
  console.log(`User${req.user.id}: user info edited`);
  res.status(200).json(user);
}

async function patchPassword(req: Request, res: Response): Promise<void> {
  const { id: userId } = req.user;
  const { password_now: oldPassword, password_new: newPassword } = req.body;
  const user = await userService.patchPassword(userId, oldPassword, newPassword);
  console.log(`User${req.user.id}: user password changed`);
  res.status(200).send({ message: '비밀번호가 변경되었습니다' });
}

async function getProducts(req: Request, res: Response): Promise<void> {
  const products = await userService.getProducts(req.user.id);
  console.log(`User${req.user.id}: products posted by the user`);
  res.status(200).json(products);
}

async function getArticles(req: Request, res: Response): Promise<void> {
  const articles = await userService.getArticles(req.user.id);
  console.log(`User${req.user.id}: articles posted by the user`);
  res.status(200).json(articles);
}

async function getLikedProducts(req: Request, res: Response): Promise<void> {
  const products = await userService.getLikedProducts(req.user.id);
  console.log(`User${req.user.id}: favorite products`);
  res.status(200).json(products);
}

async function getLikedArticles(req: Request, res: Response): Promise<void> {
  const articles = await userService.getLikedArticles(req.user.id);
  console.log(`User${req.user.id}: favorite articles`);
  res.status(200).json(articles);
}

//-------------------------------------------------- local functions
function setTokenCookies(
  res: Response,
  accessToken: string | undefined,
  refreshToken: string | undefined
): void {
  // res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
  //   httpOnly: true,
  //   secure: NODE_ENV === 'production', // false: 쓸데없이 우회적인 표현
  //   sameSite: 'lax',
  //   maxAge: ACCESS_TOKEN_MAXAGE || 1 * 60 * 60 * 1000 // 1 hour
  // });
  res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: REFRESH_TOKEN_MAXAGE || 1 * 24 * 60 * 60 * 1000, // 1 day,
    path: '/users/tokens'
  });
}

export default {
  getList,
  getInfo,
  patchInfo,
  patchPassword,
  getProducts,
  getArticles,
  getLikedProducts,
  getLikedArticles
};
