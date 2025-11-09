import * as s from 'superstruct';

export const CreateUser = s.object({
  email: s.string(),
  nickname: s.string(),
  image: s.optional(s.string()),
  password: s.string() // hashed
});

export const PatchUser = s.partial(CreateUser);

export const CreateProduct = s.object({
  name: s.string(),
  description: s.string(),
  price: s.min(s.number(), 0),
  tags: s.array(s.string()),
  imageUrls: s.optional(s.array()),
  userId: s.number()
});

export const PatchProduct = s.partial(CreateProduct);

export const CreateArticle = s.object({
  title: s.string(),
  content: s.string(),
  imageUrls: s.optional(s.array()),
  userId: s.number()
});

export const PatchArticle = s.partial(CreateArticle);

export const CreateArticleComment = s.object({
  content: s.string(),
  articleId: s.number(),
  userId: s.number()
});

export const CreateProductComment = s.object({
  content: s.string(),
  productId: s.number(),
  userId: s.number()
});

export const PatchArticleComment = s.partial(CreateArticleComment);
export const PatchProductComment = s.partial(CreateProductComment);
