import * as s from 'superstruct';

export const CreateArticle = s.object({
  title: s.string(),
  content: s.string(),
  imageUrls: s.optional(s.array()),
  userId: s.number()
});

export const PatchArticle = s.partial(CreateArticle);
