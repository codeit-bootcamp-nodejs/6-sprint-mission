import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import { getOrderBy } from '../lib/utils.js';
/**
200 OK: 일반적인 성공 (GET, UPDATE 후)
201 Created: 새로운 리소스 생성 성공 (POST)
204 No Content: 성공했지만 돌려줄 데이터가 없음 (DELETE)
400 Bad Request: 클라이언트 요청 오류 (유효성 검사 실패 등)
404 Not Found: 요청한 리소스가 없음
 */

//비밀번호 변경
export const updatePassword = async (req, res) => {
  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;

  // 유저가 있는지 확인
  const user = await prisma.user.findUniqueOrThrow({
    where: { id },
  });

  // 기존 비밀번호가 맞는지 확인
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: '기존 비밀번호와 일치하지 않습니다.' });
  }

  //새 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  //업데이트
  await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });
  return res.status(200).json({ message: '비밀번호가 성공적으로 변경되었습니다.' });
};

//내가 등록한 상품 목록 조회
export const getMyProducts = async (req, res) => {
  const { id } = req.user;

  const products = await prisma.product.findMany({
    where: { sellerId: id },
    orderBy: { createdAt: 'desc' },
    include: { images: true },
  });

  return res.status(200).json(products);
};

// 내 정보 조회     GET     (/users/me)
export const getUserMe = async (req, res, next) => {
  // authMiddleware 가 붙여준 req.user 확인
  // 미들웨어 통과 시 req.user 안에 {id, email , ...} 정보가 있을 것.  거기서 id 꺼내기
  const { id } = req.user;

  const user = await prisma.user.findUnique({
    where: { id }, // 위에서 가져온 아이디로 찾기
  });

  // 만약 없거나 탈퇴/삭제된 유저라면 return 404
  if (!user) {
    return res.status(404).json({ message: '유저 정보를 찾을 수 없습니다.' });
  }

  // 정보 포장하기
  const responseData = {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    description: user.description,
    image: user.image,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return res.status(200).json(responseData);
};

// 내 정보 수정     PATCH   (/users/me)
export const patchUserMe = async (req, res, next) => {
  const { id } = req.user; //토큰에서 아이디 쏙
  const inputData = req.body;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: inputData,
  });

  // 정보 포장하기
  const responseData = {
    id: updatedUser.id,
    email: updatedUser.email,
    nickname: updatedUser.nickname,
    description: updatedUser.description,
    image: updatedUser.image,
    updatedAt: updatedUser.updatedAt,
  };

  return res.status(200).json(responseData);
};

// 회원 탈퇴        DELETE  (/users/me)
export const deleteUserMe = async (req, res, next) => {
  const { id } = req.user;

  await prisma.user.delete({
    where: { id },
  });

  return res.status(200).json({ message: '회원 탈퇴가 완료되었습니다.' });
};
