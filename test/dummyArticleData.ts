import { Prisma } from '@prisma/client';

export const articleData: Prisma.ArticleCreateManyInput[] = [
  {
    id: 1,
    title: 'Article 1',
    content: 'Content 1',
    userId: 1,
    createdAt: new Date('2026-01-21'),
    updatedAt: new Date('2026-01-21')
  },
  {
    id: 2,
    title: 'Article 2',
    content: 'Content 2',
    userId: 2,
    createdAt: new Date('2026-01-22'),
    updatedAt: new Date('2026-01-22')
  },
  {
    id: 3,
    title: 'Article 3',
    content: 'Content 3',
    userId: 3,
    createdAt: new Date('2026-01-23'),
    updatedAt: new Date('2026-01-23')
  }
];
