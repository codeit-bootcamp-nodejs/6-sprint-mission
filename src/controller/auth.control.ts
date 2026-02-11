import { Request, Response } from 'express';
import { assert } from 'superstruct';
import { CreateUser } from '../struct/user.struct';
import { NODE_ENV, REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_MAXAGE } from '../lib/constants';
import authService from '../service/auth.service';
import UnauthorizedError from '../middleware/errors/UnauthorizedError';

async function register(req: Request, res: Response): Promise<void> {
  assert(req.body, CreateUser);
  const newUser = await authService.register(req.body);
  res.status(201).json(newUser);
}

async function login(req: Request, res: Response): Promise<void> {
  const { accessToken, refreshToken } = await authService.login(req.body);
  setTokenCookies(res, refreshToken);
  res.status(200).json({ accessToken });
}

function logout(req: Request, res: Response) {
  authService.logout(req.user.id, res);
  res.status(200).send({ message: '사용자가 로그아웃 하였습니다' });
}

function viewTokens(req: Request, res: Response) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) throw new UnauthorizedError();
  const accessToken = auth.slice(7);
  const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

  console.log('');
  console.log(`accessToken:  ${accessToken}`);
  console.log(`refreshToken: ${refreshToken}`);
  console.log('');
  //if (!refreshToken) res.status(404).send({ message: '로그인 하세요' });
}

async function issueTokens(req: Request, res: Response): Promise<void> {
  //console.log(req.cookies[REFRESH_TOKEN_COOKIE_NAME]);
  const { accessToken, refreshToken } = await authService.issueTokens(
    req.cookies[REFRESH_TOKEN_COOKIE_NAME]
  );
  setTokenCookies(res, refreshToken);
  res.status(201).send({ accessToken });
}

//-------------------------------------------------- local functions
function setTokenCookies(
  res: Response,
  //accessToken: string | undefined,
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
    path: '/auth/tokens'
  });
}

export default {
  register,
  login,
  logout,
  viewTokens,
  issueTokens
};
