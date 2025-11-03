import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();

  const p1 = await prisma.product.create({
    data: {
      name: '마우스',
      description: '생활기스 약간',
      price: 20000,
      tags: ['전자기기', '마우스'],
    },
  });
  const p2 = await prisma.product.create({
    data: {
      name: '코딩 책',
      description: 'JS 입문서',
      price: 10000,
      tags: ['책'],
    },
  });

  const a1 = await prisma.article.create({
    data: { title: '첫 글', content: '자유게시판 환영합니다!' },
  });

  await prisma.comment.createMany({
    data: [
      { content: '가격 네고 되나요?', productId: p1.id },
      { content: '환영!', articleId: a1.id },
    ],
  });

  console.log('Seed 완료');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
