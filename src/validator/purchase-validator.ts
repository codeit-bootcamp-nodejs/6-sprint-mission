// TODO) Purchase-Validator: 유효성 검사
import * as s from 'superstruct';

// 1) 상품 구매 스키마 정의
export const PurchaseProduct = s.object({
  productId: s.min(s.integer(), 1),
  quantity: s.min(s.integer(), 1),
});
