// TODO) User-Service: 비즈니스 로직 처리
import type { Prisma } from '@prisma/client';
import {
  ConflictError,
  UnauthorizedError,
  NotFoundError,
} from '../core/error/error-handler.js';
import { hashPassword, verifyPassword } from '../utils/to-hash.js';

import { userRepo } from '../repositories/user-repository.js';

// 1) 회원가입 타입 정의
type RegisterInput = {
  email: string;
  password: string;
  nickname: string;
  image?: string | null;
};

export const userService = {
  // 1) 회원 가입
  async registerUser({
    email,
    password,
    nickname,
    image = null,
  }: RegisterInput) {
    // 1-1) 이메일 조회
    const exists = await userRepo.findUserByEmail(email);

    // 1-2) 이메일 검증
    if (exists) {
      throw new ConflictError('이미 존재하는 email입니다');
    }

    // 1-3) 비번 해쉬화
    const hashed = await hashPassword(password);

    return userRepo.createUser({ email, password: hashed, nickname, image });
  },

  // 2) 로그인
  async loginUser(email: string, password: string) {
    // 2-1) 이메일 조회
    const user = await userRepo.findUserByEmail(email);

    // 2-2) 이메일 검증
    if (!user) {
      throw new UnauthorizedError('이메일 또는 비밀번호가 유효하지 않습니다');
    }

    // 2-3) 비번 조회
    const ok = await verifyPassword(password, user.password);

    // 2-4) 비번 검증
    if (!ok) {
      throw new UnauthorizedError('이메일 또는 비밀번호가 유효하지 않습니다');
    }

    return user;
  },

  // 3) 내 정보 조회
  async getMe(userId: number) {
    // 3-1) 가존 유저 조회
    const user = await userRepo.findUserById(userId);

    // 3-2) 유저 검증
    if (!user) {
      throw new NotFoundError('유저를 찾을 수 없습니다');
    }

    // 3-3) 민감 정보 제거
    const { password, refreshToken, ...safeUser } = user;

    return safeUser;
  },

  // 4) 프로필 수정
  async changeProfile(
    userId: number,
    { nickname, image }: { nickname?: string; image?: string | null }
  ) {
    // 4-1) 기존 유저 조회
    const user = await userRepo.findUserById(userId);

    // 4-2) 유저 검증
    if (!user) throw new NotFoundError('유저를 찾을 수 없습니다');

    // 4-3) 부분 업데이트용 데이터 객체
    const data: Prisma.UserUpdateInput = {};

    // 4-4) 부분 업데이트용 데이터 반영
    if (nickname !== undefined) data.nickname = nickname;
    if (image !== undefined) data.image = image;

    // 4-5) 새로운 프로필 저장
    const updated = await userRepo.updateUser(userId, data);

    // 4-6) 민감 정보 제거
    const { password, refreshToken, ...safeUser } = updated;

    return safeUser;
  },

  // 5) 비밀번호 변경
  async changePassword(userId: number, oldPw: string, newPw: string) {
    // 5-1) 기존 유저 조회
    const user = await userRepo.findUserById(userId);

    // 5-2) 유저 검증
    if (!user) {
      throw new NotFoundError('유저를 찾을 수 없습니다');
    }

    // 5-3) 기존 비번 조회
    const ok = await verifyPassword(oldPw, user.password);

    // 5-4) 비번 검증
    if (!ok) {
      throw new UnauthorizedError('기존 비밀번호가 일치하지 않습니다');
    }

    // 5-5) 새로운 비번 해쉬화
    const hashed = await hashPassword(newPw);

    return userRepo.updateUser(userId, { password: hashed });
  },

  // 6) 회원 탈퇴
  async deleteAccount(userId: number) {
    // 6-1) 기존 유저 조회
    const user = await userRepo.findUserById(userId);

    // 6-2) 유저 검증
    if (!user) {
      throw new NotFoundError('유저를 찾을 수 없습니다');
    }

    return userRepo.deleteUser(userId);
  },
};
