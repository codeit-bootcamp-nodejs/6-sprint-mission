import prisma from '../lib/prisma.js';
/**
200 OK: 일반적인 성공 (GET, UPDATE 후)
201 Created: 새로운 리소스 생성 성공 (POST)
204 No Content: 성공했지만 돌려줄 데이터가 없음 (DELETE)
400 Bad Request: 클라이언트 요청 오류 (유효성 검사 실패 등)
404 Not Found: 요청한 리소스가 없음
 */

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
// 회원 탈퇴        DELETE  (/users/me)
