// src/structs.js
import * as s from 'superstruct';

const TAGS = [
  'NONE',
  'FASHION',
  'BEAUTY',
  'SPORTS',
  'ELECTRONICS',
  'HOME_INTERIOR',
  'HOUSEHOLD_SUPPLIES',
  'KITCHENWARE',
];

export const validate = (schema) => (req, res, next) => {
  try {
    s.assert(req.body, schema);
    next();
  } catch (e) {
    next(Object.assign(e, { status: 400 }));
  }
};

// 중고 마켓
export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 20),
  description: s.optional(s.string()),
  price: s.min(s.number(), 0),
  stock: s.min(s.integer(), 0),
  tags: s.enums(TAGS),
  imagePath: s.optional(s.string()),
});

export const PatchProduct = s.partial(CreateProduct);

// 자유 게시판
export const CreateArticle = s.object({
  title: s.size(s.string(), 1, 30),
  content: s.size(s.string(), 1, 60),
});

export const PatchArticle = s.partial(CreateArticle);

// 구매
export const PurchaseProduct = s.object({
  productId: s.min(s.integer(), 1),
  quantity: s.min(s.integer(), 1),
});
