// TODO) Product-Constants: 상품 관련 공통 상수
export const PRODUCT_ORDER = {
  RECENT: 'recent',
  OLDEST: 'oldest',
} as const;

export const PRODUCT_ORDER_MAP: Record<
  (typeof PRODUCT_ORDER)[keyof typeof PRODUCT_ORDER],
  { createdAt: 'asc' | 'desc' }
> = {
  [PRODUCT_ORDER.RECENT]: { createdAt: 'desc' },
  [PRODUCT_ORDER.OLDEST]: { createdAt: 'asc' },
};

export const DEFAULT_PRODUCT_ORDER = PRODUCT_ORDER.RECENT;
