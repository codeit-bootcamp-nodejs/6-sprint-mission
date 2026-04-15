// TODO) User-Validator: 유효성 검사
import * as s from 'superstruct';

// 1) 이메일 스키마 정의
const Email = s.refine(s.string(), 'emailPattern', (v: string) => {
  const trimmed = v.trim();
  if (!trimmed.includes('@')) return false;

  const [local, domain] = trimmed.split('@');
  return Boolean(local && domain && domain?.includes('.'));
});

// 2) 패스워드 스키마 정의
const Password = s.size(s.string(), 8, 64);

// 3) 닉네임 스키마 정의
const Nickname = s.size(s.string(), 1, 30);

// 4) 프로필 사진 스키마 정의
const validExt = ['.jpg', '.jpeg', '.png'];

const Image = s.optional(
  s.union([
    s.refine(s.string(), 'imagePathExt', (v: string) =>
      validExt.some((ext) => v.toLowerCase().endsWith(ext))
    ),
    s.literal(null),
  ])
);

// 5) 회원가입 스키마 정의
export const RegisterUser = s.object({
  email: Email,
  password: Password,
  nickname: Nickname,
  image: Image,
});

// 6) 로그인 스키마 정의
export const LoginUser = s.object({
  email: Email,
  password: Password,
});

// 7) 프로필 사진 수정 스키마 정의
export const UpdateProfile = s.object({
  nickname: s.optional(Nickname),
  image: Image,
});
