import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { USERS, PRODUCTS, ARTICLES, PRODUCTCOMMENTS, ARTICLECOMMENTS } from './mock.js';

async function main() {
  console.log('Deleting old data...');
  await prisma.productComment.deleteMany();
  await prisma.articleComment.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding started...');
  const userData = USERS.map((user) => {
    const { id, email, nickname, password, createdAt, updatedAt, ...rest } = user;
    return { id, email, nickname, password, createdAt, updatedAt };
  });

  await prisma.user.createMany({ data: userData, skipDuplicates: true });
  await prisma.product.createMany({ data: PRODUCTS, skipDuplicates: true });
  await prisma.article.createMany({ data: ARTICLES, skipDuplicates: true });
  await prisma.productComment.createMany({ data: PRODUCTCOMMENTS, skipDuplicates: true });
  await prisma.articleComment.createMany({ data: ARTICLECOMMENTS, skipDuplicates: true });

  for (const user of USERS) {
    if (user.likedProducts && user.likedProducts.length > 0) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          likedProducts: {
            connect: user.likedProducts.map((pid) => ({ id: pid }))
          }
        }
      });
    }

    if (user.likedArticles && user.likedArticles.length > 0) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          likedArticles: {
            connect: user.likedArticles.map((aid) => ({ id: aid }))
          }
        }
      });
    }
  }

  // User
  await prisma.$executeRaw`
  SELECT setval(
    pg_get_serial_sequence('"User"', 'id'),
    (SELECT MAX(id) FROM "User")
  );
`;

  // Product
  await prisma.$executeRaw`
  SELECT setval(
    pg_get_serial_sequence('"Product"', 'id'),
    (SELECT MAX(id) FROM "Product")
  );
`;

  // Article
  await prisma.$executeRaw`
  SELECT setval(
    pg_get_serial_sequence('"Article"', 'id'),
    (SELECT MAX(id) FROM "Article")
  );
`;

  // ProductComment
  await prisma.$executeRaw`
  SELECT setval(
    pg_get_serial_sequence('"ProductComment"', 'id'),
    (SELECT MAX(id) FROM "ProductComment")
  );
`;

  // ArticleComment
  await prisma.$executeRaw`
  SELECT setval(
    pg_get_serial_sequence('"ArticleComment"', 'id'),
    (SELECT MAX(id) FROM "ArticleComment")
  );
`;

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
