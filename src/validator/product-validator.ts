// TODO) Product-Validator: 유효성 검사
import * as s from 'superstruct';
import { Tag } from '@prisma/client';

const IdFromParams = s.coerce(s.integer(), s.string(), Number);

// 1) enum에서 허용 태그 목록 추출
const TAGS = Object.values(Tag);

// 2) 이미지 확장자 검증 (jpg/jpeg/png만 허용)
const validExt = ['.jpg', '.jpeg', '.png'];

const ImagePath = s.optional(
  s.refine(s.string(), 'ImagePathExt', (v: string) =>
    validExt.some((ext) => v.toLowerCase().endsWith(ext))
  )
);

// 3) 상품 생성 스키마 정의
export const CreateProduct = s.object({
  name: s.size(s.string(), 1, 20),
  description: s.optional(s.string()),
  price: s.min(s.number(), 0),
  stock: s.min(s.integer(), 0),
  tags: s.enums(TAGS),
  imagePath: ImagePath,
});

// 4) 상품 수정 스키마 정의
export const PatchProduct = s.partial(CreateProduct);

// 5) path params 스키마 정의
export const ProductParams = s.object({
  id: IdFromParams,
});
