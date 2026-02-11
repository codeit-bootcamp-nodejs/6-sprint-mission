import { Prisma } from '@prisma/client';

export const productData: Prisma.ProductCreateManyInput[] = [
  {
    name: 'Product 1',
    description: 'Description 1',
    price: 1000,
    tags: ['tag1'],
    userId: 1,
    createdAt: new Date('2026-01-19'),
    updatedAt: new Date('2026-01-19')
  },
  {
    name: 'Product 2',
    description: 'Description 2',
    price: 2000,
    tags: ['tag2', 'tag22'],
    userId: 2,
    createdAt: new Date('2026-01-20'),
    updatedAt: new Date('2026-01-20')
  },
  {
    name: 'Product 3',
    description: 'Description 3',
    price: 3000,
    tags: ['tag3', 'tag33', 'tag333'],
    userId: 3,
    createdAt: new Date('2026-01-21'),
    updatedAt: new Date('2026-01-21')
  }
];
