import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import { JWT_SECRET } from '../lib/constants.js';

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
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  //이메일로 유저찾기
  const user = await prisma.user.findUnique({
    //OrThrow를 안 쓰는 이유 => 보안을 위해서 정확히 무슨 오류인지 안 알려주려고
    where: { email },
  });

  // 유저가 없거나 비밀번호가 틀리면 -> 401 (인증실패)
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
  }

  // 로그인 성공 시 토큰 발급
  const accessToken = jwt.sign(
    { id: user.id, email: user.email, nickname: user.nickname },
    JWT_SECRET,
    { expiresIn: '1h' },
  );

  return res.status(200).json({ accessToken });
};
// 토큰 재발급   POST (/auth/refresh)

// 로그아웃     POST (/auth/logout)
