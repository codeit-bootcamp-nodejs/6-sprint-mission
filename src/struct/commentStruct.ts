import * as s from 'superstruct';

export const CreateComment = s.object({
  content: s.string(),
  articleId: s.optional(s.nullable(s.number())),
  productId: s.optional(s.nullable(s.number())),
  userId: s.number()
});

export const PatchComment = s.partial(CreateComment);
