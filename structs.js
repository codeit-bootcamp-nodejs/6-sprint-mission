import * as s from 'superstruct';

export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 60),
  description: s.string(),
  price: s.min(s.number(), 0),
  tags: s.array(s.string()),
});

export const PatchProduct = s.partial(CreateProduct);

export const CreateArticle = s.object({
  title: s.size(s.string(), 1, 100),
  content: s.string(),
});

export const PatchArticle = s.partial(CreateArticle);

export const CreateComment = s.object({
  content: s.size(s.string(), 1, 500),
});

export const PatchComment = s.partial(CreateComment);
