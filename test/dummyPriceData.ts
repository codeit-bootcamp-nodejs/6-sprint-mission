import { Prisma } from '@prisma/client';

export const priceData: Prisma.ProductPriceHistoryCreateManyInput[] = [
  {
    id: 1,
    productId: 1,
    price: 1000,
    prevPrice: null,
    createdAt: new Date('2026-01-19')
  },
  {
    id: 2,
    productId: 2,
    price: 2000,
    prevPrice: null,
    createdAt: new Date('2026-01-20')
  },
  {
    id: 3,
    productId: 3,
    price: 3000,
    prevPrice: null,
    createdAt: new Date('2026-01-21')
  }
];
