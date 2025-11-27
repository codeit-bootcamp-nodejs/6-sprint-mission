import * as s from 'superstruct';

//===== 문자열을 숫자로 =====
//Integer = 1보다 큰 정수: 패치 및 삭제 id 유효성 검사)
//예: Coerce를 이용해 문자열을 숫자로 변환한 후 refine적용, 이제 문자열 "3"도 Number 으로 바뀌어 들어감
const CoercedNumber = s.coerce(s.number(), s.union([s.string(), s.number()]), (value) =>
  Number(value),
);
const Integer = s.refine(CoercedNumber, 'Integer', (value) => Number.isInteger(value) && value > 0);

//===== ID 검사 =====
//----- productId, articleId, commentId -----
export const ProductIdStruct = s.object({
  productId: Integer,
});

export const ArticleIdStruct = s.object({
  articleId: Integer,
});

export const CommentIdStruct = s.object({
  commentId: Integer,
});

//===== req.body 검사 =====
//----- User / Auth -----

// sign-up
export const CreateUserStruct = s.object({
  email: s.size(s.string(), 1, 100),
  nickname: s.size(s.string(), 1, 10),
  password: s.size(s.string(), 4, 20),
});

// login
export const LoginUserStruct = s.object({
  email: s.size(s.string(), 1, 100),
  password: s.size(s.string(), 4, 20),
});

// partial을 쓰면 내부의 모든 필드가 자동으로 s.optional() 처리가 됨.
export const PatchUserStruct = s.object({
  nickname: s.optional(s.size(s.string(), 1, 20)),
  description: s.optional(s.size(s.string(), 1, 300)),
  image: s.optional(s.size(s.string())),
  // (보안상 이메일과 비밀번호 변경은 별도 API로 빼기로 함.)
});

// 비밀번호 변경용
export const PatchPasswordStruct = s.object({
  oldPassword: s.size(s.string(), 4, 20),
  newPassword: s.size(s.string(), 4, 20),
});

//----- product -----
export const CreateProductStruct = s.object({
  name: s.size(s.string(), 1, 30),
  description: s.size(s.string(), 1, 500),
  price: s.min(s.number(), 0),
  tags: s.optional(s.array(s.string())),
});

export const PatchProductStruct = s.partial(CreateProductStruct);

//----- article -----
export const CreateArticleStruct = s.object({
  title: s.size(s.string(), 1, 30),
  content: s.size(s.string(), 10, 1000),
});

export const PatchArticleStruct = s.partial(CreateArticleStruct);

//----- comment -----
export const CreateCommentStruct = s.object({
  content: s.size(s.string(), 1, 200),
});

export const PatchCommentStruct = s.partial(CreateCommentStruct);
