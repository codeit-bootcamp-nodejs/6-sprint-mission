import { Request, Response } from 'express';
import { assert } from 'superstruct';
import { CreateUser } from '../struct/userStruct';
import { REFRESH_TOKEN_COOKIE_NAME, NODE_ENV, REFRESH_TOKEN_MAXAGE } from '../lib/constants';
import authService from '../service/auth.service';
import path from 'path';

async function register(req: Request, res: Response): Promise<void> {
  assert(req.body, CreateUser);
  const newUser = await authService.register(req.body);
  console.log(`User_${newUser.id} registered successfully`);
  res.status(201).json(newUser);
}

async function login(req: Request, res: Response): Promise<void> {
  const { accessToken, refreshToken } = await authService.login(req, res);
  setTokenCookies(res, accessToken, refreshToken);
  console.log(`User logged-in`);
  res.status(200).send({ message: '사용자가 로그인 하였습니다', accessToken });
}

async function logout(req: Request, res: Response): Promise<void> {
  authService.logout(req.user.id, res);
  console.log(`User logged-out`);
  res.status(200).send({ message: '사용자가 로그아웃 하였습니다' });
}

async function viewTokens(req: Request, res: Response): Promise<void> {
  if (NODE_ENV === 'development') {
    const { accessToken, refreshToken } = authService.viewTokens(req.cookies);
    console.log('');
    console.log(`accessToken:  ${accessToken}`);
    console.log(`refreshToken: ${refreshToken}`);
    console.log('');
    if (!refreshToken) res.status(404).send({ message: '로그인 하세요' });
  } else {
    res.status(403).send({ message: '개발자 옵션입니다' });
  }
}

async function issueTokens(req: Request, res: Response): Promise<void> {
  const { accessToken, refreshToken } = await authService.issueTokens(req.cookies);
  setTokenCookies(res, accessToken, refreshToken);
  console.log(`Tokens refreshed`);
  res.status(201).send({ accessToken });
}

async function connectSocketIO(req: Request, res: Response): Promise<void> {
  const filePath = path.join(__dirname, '../../public/socket-client-test.html');
  res.sendFile(filePath);
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
  register,
  login,
  logout,
  viewTokens,
  issueTokens,
  connectSocketIO
};
