import * as s from 'superstruct';
import isUuid from 'is-uuid';

// productComment
export const CreateProductComment = s.object({
  content: s.string(),
  productId: s.define('Uuid', (value) => isUuid.v4(value)),
  authorId: s.define('Uuid', (value) => isUuid.v4(value)),
});

export const PatchProductComment = s.partial(CreateProductComment);

// articleComment
export const CreateArticleComment = s.object({
  content: s.string(),
  articleId: s.define('Uuid', (value) => isUuid.v4(value)),
  authorId: s.define('Uuid', (value) => isUuid.v4(value)),
});

export const PatchArticleComment = s.partial(CreateArticleComment);
