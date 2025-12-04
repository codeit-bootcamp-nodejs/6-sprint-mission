import express from 'express';
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import { generateTokens, verifyRefreshToken } from '../lib/token.js';
import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
  NODE_ENV,
} from '../lib/constants.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { email, nickname, password, image } = req.body;

    if (!email || !nickname || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        nickname,
        password: hashedPassword,
        image,
      },
    });

    // Don't return password
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    // 1. 요청 본문(body)에서 email과 password를 가져옵니다.
    const { email, password } = req.body;

    // 2. 유효성 검사: email 또는 password가 없는 경우 에러 처리
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: '이메일과 비밀번호는 필수 입력 항목입니다.' });
    }

    // 3. email로 사용자를 찾습니다.
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: '인증 정보가 유효하지 않습니다.' });
    }

    // 4. 비밀번호를 비교합니다.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: '인증 정보가 유효하지 않습니다.' });
    }

    // 5. 토큰을 생성합니다.
    const { accessToken, refreshToken } = generateTokens(user.id);

    // 6. Refresh Token을 데이터베이스에 저장합니다.
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
      },
    });

    // 7. 토큰을 쿠키에 담아 응답합니다.
    const cookieOptions = {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'lax',
    };
    res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, cookieOptions);
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieOptions);

    res.json({ message: '로그인에 성공했습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Refresh Token
router.post('/refresh', async (req, res) => {
  try {
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    const { userId } = verifyRefreshToken(refreshToken);

    // Check if refresh token exists in DB
    const savedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!savedToken) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } =
      generateTokens(userId);

    // Rotate refresh token (delete old, create new)
    // Transaction to ensure atomicity
    await prisma.$transaction([
      prisma.refreshToken.delete({ where: { token: refreshToken } }),
      prisma.refreshToken.create({
        data: {
          token: newRefreshToken,
          userId,
        },
      }),
    ]);

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, { httpOnly: true });
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, newRefreshToken, { httpOnly: true });

    res.json({ message: 'Token refreshed' });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];
    if (refreshToken) {
      // Delete the token from DB only if it exists
      await prisma.refreshToken
        .delete({ where: { token: refreshToken } })
        .catch(() => {}); // Ignore errors if token is not found
    }

    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
