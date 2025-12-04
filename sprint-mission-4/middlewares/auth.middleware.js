import { verifyAccessToken } from '../lib/token.js';
import prisma from '../lib/prisma.js';
import { ACCESS_TOKEN_COOKIE_NAME } from '../lib/constants.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies[ACCESS_TOKEN_COOKIE_NAME];
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const { userId } = verifyAccessToken(accessToken);
    if (!userId) {
      throw new Error('Invalid access token');
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: ' + error.message });
  }
};

export const softAuthMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies[ACCESS_TOKEN_COOKIE_NAME];
    if (!accessToken) {
      return next();
    }

    const { userId } = verifyAccessToken(accessToken);
    if (!userId) {
      return next();
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      req.user = user;
    }
    next();
  } catch (error) {
    next();
  }
};
