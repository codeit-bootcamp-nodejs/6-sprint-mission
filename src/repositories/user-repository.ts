// TODO) User-Repository: DB 저장소
import type { Prisma } from '@prisma/client';
import prisma from '../config/prisma.js';

export const userRepo = {
  // 1) 유저 생성
  createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  },

  // 2) 이메일로 조회
  findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  // 3) 아이디로 조회
  findUserById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  },

  // 4) 유저 수정
  updateUser(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data });
  },

  // 5) 유저 삭제
  deleteUser(id: number) {
    return prisma.user.delete({ where: { id } });
  },

  // 6) 토큰 저장
  setUserRefreshToken(userId: number, token: string | null) {
    return prisma.user.update({
      where: { id: userId },
      data: { refreshToken: token },
    });
  },

  // 7) 토큰 제거
  clearUserRefreshToken(userId: number) {
    return prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  },
};
