// TODO) Article-Comment-Validator: 유효성 검사
import * as s from 'superstruct';

const IdFromParams = s.coerce(s.integer(), s.string(), Number);

// 1) 댓글 본문 길이 제한
const Content = s.size(s.string(), 1, 100);

// 1-1) path params 스키마
export const ArticleCommentParams = s.object({
  articleId: IdFromParams,
});

export const ArticleCommentIdParams = s.object({
  id: IdFromParams,
});

// 2) 댓글 생성 스키마 정의
export const CreateArticleComment = s.object({
  articleId: s.integer(),
  content: Content,
});

// 3) 댓글 수정 스키마 정의
export const PatchArticleComment = s.object({
  content: Content,
});
