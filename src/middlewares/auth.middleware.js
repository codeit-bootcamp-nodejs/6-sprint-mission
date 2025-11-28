import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../lib/constants.js';

export const authMiddleware = (req, res, next) => {
  // req.헤더에서 토큰 꺼내기
  const authHeader = req.headers['authorization'];

  // 토큰이 없다면 ? return 401
  if (!authHeader) {
    return res.status(401).json({ message: '인증 토큰이 필요합니다.' });
  }

  // Bearer 떼어내기 (보낸사람: 내용 토큰 < 뭐 이렇게 있으면 보낸사람 빼고 '토큰'만 들고오겠다고 하는거)
  // 근데 덜렁 내용만 보내져있다면 그냥 그거 갖다 쓰겠다는 뜻
  const token = authHeader.split(' ')[1] || authHeader;

  // 위조 검사
  try {
    //JWT_SECRET은 대충 나의 도장이고, 토큰은 저 도장으로 찍은 것이다. => 도장 그림과 토큰에 찍힌 도장의 그림이 일치하는지 확인
    const decoded = jwt.verify(token, JWT_SECRET);

    //위조심사를 통과했다면?
    req.user = decoded;

    next(); //관문 통과
  } catch (error) {
    return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
  }
};
