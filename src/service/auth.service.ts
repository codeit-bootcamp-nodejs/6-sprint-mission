import bcrypt from 'bcrypt';
import userRepo from '../repository/user.repo';
import { REFRESH_TOKEN_COOKIE_NAME } from '../lib/constants';
import { generateTokens, verifyRefreshToken } from '../lib/token';
import { assert } from 'superstruct';
import { CreateUser } from '../struct/user.struct';
import { Response } from 'express';
import { CreateUserDto, LoginDto } from '../types/dto';
import { User } from '@prisma/client';
import { SafeUser, TokenType } from '../types/interfaceType';
import { getIO } from '../websocket/socketIO';
import ConflictError from '../middleware/errors/ConflictError';
import ForbiddenError from '../middleware/errors/ForbiddenError';
import NotFoundError from '../middleware/errors/NotFoundError';

async function register(data: CreateUserDto): Promise<SafeUser> {
  assert(data, CreateUser);
  const { email, nickname, password } = data;

  const user = await userRepo.findByEmail(email);
  if (user) throw new ConflictError('이미 등록된 이메일입니다');

  const newData = {
    email,
    nickname,
    password: await hashingPassword(password)
  };

  const newUser = await userRepo.create(newData);
  return filterPassword(newUser) as SafeUser;
}

async function login(data: LoginDto): Promise<TokenType> {
  const user = await userRepo.findByEmail(data.email);
  if (!user) throw new NotFoundError();

  const isPasswordOk = await check_passwordValidity(data.password, user.password);
  if (!isPasswordOk) throw new ForbiddenError('비밀번호가 틀렸습니다');

  if (user.notifications.length) {
    const unreadCount = user.notifications.filter((n) => n.isRead === false).length;
    console.log(`You have ${unreadCount} unread notifications`);
  }

  const { accessToken, refreshToken } = generateTokens(user.id);
  return { accessToken, refreshToken };
}

function logout(userId: number, tokenData: Response): void {
  tokenData.clearCookie(REFRESH_TOKEN_COOKIE_NAME, { path: '/auth/tokens' });

  const io = getIO();
  for (const s of io.of('/').sockets.values()) {
    if (s.data.userId === userId) {
      s.disconnect(true);
    }
  }
}

async function issueTokens(refreshToken: string): ReturnType<typeof login> {
  const { userId } = verifyRefreshToken(refreshToken);
  const user = await verifyUserExist(userId);

  return generateTokens(user.id);
}

//------------------------------------ local functions

export function filterPassword(userData: User | User[]): SafeUser | SafeUser[] {
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

export async function hashingPassword(textPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(textPassword, salt);
}

export async function check_passwordValidity(
  textPassword: string,
  savedPassword: string
): Promise<Boolean> {
  const isPasswordSame = await bcrypt.compare(textPassword, savedPassword);
  return isPasswordSame;
}

//function clearTokenCookies(tokenData: Response): void {
//tokenData.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
//tokenData.clearCookie(REFRESH_TOKEN_COOKIE_NAME, { path: '/users/tokens' });
// refreshToken은 지정된 path가 있음
//}

// function check_refreshTokenValidity(tokenData: Record<string, string | undefined>): string {
//   const refreshToken = tokenData[REFRESH_TOKEN_COOKIE_NAME];
//   if (!refreshToken) {
//     console.log('Tokens expired');
//     throw new UnauthorizedError('토큰이 만료되었습니다');
//   }
//   return refreshToken;
// }

async function verifyUserExist(userId: number): Promise<User> {
  const user = await userRepo.findById(userId);
  // if (!user) {
  //   throw new NotFoundError('등록되지 않은 사용자입니다');
  // }
  return user;
}

export default {
  register,
  login,
  logout,
  issueTokens,
  verifyUserExist,
  filterPassword,
  hashingPassword,
  check_passwordValidity
};
