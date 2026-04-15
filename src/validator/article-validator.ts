// TODO) Article-Validator: 유효성 검사
import * as s from 'superstruct';

const IdFromParams = s.coerce(s.integer(), s.string(), Number);

// 1) 게시글 생성 스키마 정의
export const CreateArticle = s.object({
  title: s.size(s.string(), 1, 30),
  content: s.size(s.string(), 1, 300),
});

// 4) 게시글 수정 스키마 정의
export const PatchArticle = s.partial(CreateArticle);

// 5) path params 스키마 정의
export const ArticleParams = s.object({
  id: IdFromParams,
});
