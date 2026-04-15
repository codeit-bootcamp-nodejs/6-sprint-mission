// TODO) Product-Comment-Validator: 유효성 검사
import * as s from 'superstruct';

const IdFromParams = s.coerce(s.integer(), s.string(), Number);

// 1) 댓글 본문 길이 제한
const Content = s.size(s.string(), 1, 100);

// 1-1) path params 스키마
export const ProductCommentParams = s.object({
  productId: IdFromParams,
});

export const ProductCommentIdParams = s.object({
  id: IdFromParams,
});

// 2) 댓글 생성 스키마 정의
export const CreateProductComment = s.object({
  productId: s.integer(),
  content: Content,
});

// 3) 댓글 수정 스키마 정의
export const PatchProductComment = s.object({
  content: Content,
});
