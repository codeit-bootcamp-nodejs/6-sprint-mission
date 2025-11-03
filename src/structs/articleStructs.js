import * as s from 'superstruct';
import isUuid from 'is-uuid';

export const CreateArticle = s.object({
  title: s.size(s.string(), 1, 100),
  content: s.string(),
  authorId: s.define('Uuid', (value) => isUuid.v4(value)),
});

export const PatchArticle = s.partial(CreateArticle);
