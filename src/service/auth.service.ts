import bcrypt from 'bcrypt';
import BadRequestError from '../middleware/errors/BadRequestError';
import userRepo from '../repository/user.repo';
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '../lib/constants';
import { generateTokens, verifyRefreshToken } from '../lib/token';
import NotFoundError from '../middleware/errors/NotFoundError';
import { assert } from 'superstruct';
import { CreateUser } from '../struct/userStruct';
import { Response } from 'express';
import { CreateUserDto, LoginDto } from '../dto/dto';
import { User } from '@prisma/client';
import { SafeUser, TokenType } from '../dto/interfaceType';
import { getIO } from '../websocket/socketIO';

async function register(data: CreateUserDto): Promise<SafeUser> {
  assert(data, CreateUser);
  const { email, nickname, password } = data;

  const user = await userRepo.findByEmail(email);
  if (!user) {
    console.log('User registered already');
    throw new BadRequestError('USER_FOUND');
  }

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
  if (!user) throw new NotFoundError('user', 0);

  const isPasswordOk = await check_passwordValidity(data.password, user.password);
  if (!isPasswordOk) {
    console.log('Invalid password');
    throw new BadRequestError('FORBIDDEN');
  }

  if (user.notifications.length) {
    const unreadCount = user.notifications.filter((n) => n.isRead === false).length;
    console.log(`You have ${unreadCount} unread notifications`);
  }

  const { accessToken, refreshToken } = generateTokens(user.id);
  return { accessToken, refreshToken };
}

function logout(userId: number, tokenData: Response): void {
  clearTokenCookies(tokenData);
  const io = getIO();
  io.in(`user:${userId}`).disconnectSockets(true);
}

async function issueTokens(
  tokenData: Record<string, string | undefined>
): ReturnType<typeof login> {
  const refreshToken = check_refreshTokenValidity(tokenData);
  const { userId } = verifyRefreshToken(refreshToken);
  const user = await verifyUserExist(userId);

  return generateTokens(user.id);
}

function viewTokens(tokenData: Record<string, string | undefined>): TokenType {
  const accessToken = tokenData[ACCESS_TOKEN_COOKIE_NAME];
  const refreshToken = tokenData[REFRESH_TOKEN_COOKIE_NAME];
  return { accessToken, refreshToken };
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

function clearTokenCookies(tokenData: Response): void {
  tokenData.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
  tokenData.clearCookie(REFRESH_TOKEN_COOKIE_NAME, { path: '/users/tokens' });
  // refreshToken은 지정된 path가 있음
}

function check_refreshTokenValidity(tokenData: Record<string, string | undefined>): string {
  const refreshToken = tokenData[REFRESH_TOKEN_COOKIE_NAME];
  if (!refreshToken) {
    console.log('Tokens expired');
    throw new BadRequestError('EXPIRED_TOKENS');
  }
  return refreshToken;
}

async function verifyUserExist(userId: number): Promise<User> {
  const user = await userRepo.findById(userId);
  if (!user) {
    console.log('No user found. Resgister again.');
    throw new NotFoundError(user, userId);
  }
  return user;
}

export default {
  register,
  login,
  logout,
  issueTokens,
  viewTokens,
  verifyUserExist,
  filterPassword,
  hashingPassword,
  check_passwordValidity
};
