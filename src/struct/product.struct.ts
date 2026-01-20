import * as s from 'superstruct';

export const CreateProduct = s.object({
  name: s.string(),
  description: s.string(),
  price: s.min(s.number(), 0),
  tags: s.array(s.string()),
  imageUrls: s.optional(s.array(s.string())),
  userId: s.min(s.number(), 1)
});

export const PatchProduct = s.partial(CreateProduct);

export const CreateNotification = s.object({
  type: s.enums(['ARTICLE', 'PRODUCT']),
  userId: s.min(s.number(), 1),
  productId: s.optional(s.nullable(s.min(s.number(), 1))),
  articleId: s.optional(s.nullable(s.min(s.number(), 1))),
  message: s.string()
});

export const CreateProductPriceHistory = s.object({
  productId: s.min(s.number(), 1),
  price: s.min(s.number(), 0),
  prevPrice: s.optional(s.min(s.number(), 0))
});
