import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';

// 회원가입     POST (/auth/sign-up)
export const signUp = async (req, res, next) => {
  //요청바디 (입력 내용들에서 정보 꺼내기)
  const { email, nickname, password } = req.body;

  // 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, 10);

  // 해싱된 비밀번호로 유저 생성하기
  const user = await prisma.user.create({
    data: {
      email,
      nickname,
      password: hashedPassword,
    },
  });

  // 비번을 제외한 정보 보여주기
  const responseData = {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    description: user.description,
    image: user.image,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return res.status(201).json(responseData);
};

// 로그인       POST (/auth/login)

// 토큰 재발급   POST (/auth/refresh)

// 로그아웃     POST (/auth/logout)
