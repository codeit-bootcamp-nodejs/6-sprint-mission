import prisma from '../config/prisma.js';
import { authService } from '../services/auth-service.js';
import { userService } from '../services/user-service.js';

export async function resetDb() {
  await prisma.notification.deleteMany();
  await prisma.productLike.deleteMany();
  await prisma.articleLike.deleteMany();
  await prisma.productComment.deleteMany();
  await prisma.articleComment.deleteMany();
  await prisma.purchase.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.user.deleteMany();
}

export async function createUserWithToken(email: string) {
  const user = await userService.registerUser({
    email,
    password: 'password1234',
    nickname: 'tester',
    image: null,
  });
  const accessToken = authService.signAccessToken({
    id: user.id,
    email: user.email,
  });

  return { user, accessToken };
}
