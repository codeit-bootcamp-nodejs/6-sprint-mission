// TODO) To-Hash: 비밀번호 해시/검증 유틸
import bcrypt from 'bcrypt';

// 1) 해쉬 강도
const SALT_ROUNDS = 10;

// 2) 비번 해쉬화
export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// 3) 해쉬화 검증
export async function verifyPassword(plain: string, hashed: string) {
  return bcrypt.compare(plain, hashed);
}
