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

//----- User -----
export const CreateUserStruct = s.object({
  email: s.size(s.string(), 1, 100),
  nickname: s.size(s.string(), 1, 10),
  password: s.size(s.string(), 4, 20),
});

// partial을 쓰면 내부의 모든 필드가 자동으로 s.optional() 처리가 됨.
export const PatchUserStruct = s.partial(CreateUserStruct);

//----- product -----
export const CreateProductStruct = s.object({
  name: s.size(s.string(), 1, 30),
  description: s.size(s.string(), 1, 500),
  price: s.min(s.number(), 0),
  tags: s.optional(s.array(s.string())),
  // 🚧 [임시] 로그인 만들기 전까지만
  sellerId: Integer,
});

export const PatchProductStruct = s.partial(CreateProductStruct);

//----- article -----
export const CreateArticleStruct = s.object({
  title: s.size(s.string(), 1, 30),
  content: s.size(s.string(), 10, 1000),

  // 🚧 [임시] 로그인 만들기 전까지만
  authorId: Integer,
});

export const PatchArticleStruct = s.partial(CreateArticleStruct);

//----- comment -----
export const CreateCommentStruct = s.object({
  content: s.size(s.string(), 10, 200),

  // 🚧 [임시] 로그인 만들기 전까지만
  authorId: Integer,
});

export const PatchCommentStruct = s.partial(CreateCommentStruct);
