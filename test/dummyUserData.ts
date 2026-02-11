import { Prisma } from '@prisma/client';

export const userData: Prisma.UserCreateManyInput[] = [
  {
    email: 'user1@example.com',
    nickname: 'user1',
    password: '$2b$10$JuwBWUmrbOYgAoPEpK1.I.9bJv6EzeOSXaweEc9iqE1qxINYLAoO.',
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15')
  },
  {
    email: 'user2@example.com',
    nickname: 'user2',
    password: '$2b$10$qfuiphAeAtxLshes0UcsHuHMrY2/BHQ85yIOoU5rktqONxydYzSx6',
    createdAt: new Date('2026-01-16'),
    updatedAt: new Date('2026-01-16')
  },
  {
    email: 'user3@example.com',
    nickname: 'user3',
    password: '$2b$10$9zEwHM9PxTe3bnOQpn2YVuKTBwkB4jsqIR4Rqm7PEYLSPjsU7kGxG',
    createdAt: new Date('2026-01-17'),
    updatedAt: new Date('2026-01-17')
  }
];
