// src/seed.js
import { PrismaClient } from '@prisma/client';
import { mockProducts, mockArticles } from '../src/mock.js';

const prisma = new PrismaClient();

async function main() {
  await prisma.purchase.deleteMany();
  await prisma.productComment.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.product.deleteMany();

  await prisma.product.createMany({ data: mockProducts });
  await prisma.article.createMany({ data: mockArticles });

  const [productCount, articleCount] = await Promise.all([
    prisma.product.count(),
    prisma.article.count(),
  ]);

  console.log(`Seeded: products=${productCount}, articles=${articleCount}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
