import * as s from 'superstruct';
import isUuid from 'is-uuid';
import { CATEGORIES, PRODUCT_STATUS } from '../lib/enums.js';

const NumberFromString = s.coerce(s.number(), s.string(), (value) => parseInt(value));

export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 30),
  description: s.string(),
  category: s.enums(CATEGORIES),
  price: s.min(NumberFromString, 0),
  stock: s.optional(s.min(NumberFromString, 0)),
  status: s.enums(PRODUCT_STATUS),
  tags: s.optional(s.array(s.string())),
  images: s.optional(s.array(s.string())),
  authorId: s.define('Uuid', (value) => isUuid.v4(value)),
});

export const PatchProduct = s.partial(CreateProduct);
