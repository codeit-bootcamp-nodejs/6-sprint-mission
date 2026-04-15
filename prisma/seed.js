// TODO) Seed: DB 데이터 삽입 설정
import prisma from '../src/config/prisma.js';
import {
  mockUsers,
  mockProducts,
  mockArticles,
  mockProductComments,
  mockArticleComments,
  mockProductLikes,
  mockArticleLikes,
} from './mock.js';

// &) 삭제 순서: 좋아요 → 댓글 → 구매 → 게시글/상품 → 유저
async function main() {
  await prisma.productLike.deleteMany();
  await prisma.articleLike.deleteMany();
  await prisma.productComment.deleteMany();
  await prisma.articleComment.deleteMany();
  await prisma.purchase.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.user.deleteMany();

  // &) 유저 생성
  await prisma.user.createMany({ data: mockUsers });

  // &) ID 매핑 위해 다시 조회 (생성 순서대로 정렬)
  const userEntities = await prisma.user.findMany({
    select: { id: true },
    orderBy: { id: 'asc' },
  });

  const withUserId = (arr, key) =>
    arr.map((item) => ({
      ...item,
      [key]: userEntities[item.userIndex].id,
    }));

  // &) 상품/게시글 생성
  await prisma.product.createMany({
    data: withUserId(mockProducts, 'userId').map(
      ({ userIndex, ...rest }) => rest
    ),
  });
  await prisma.article.createMany({
    data: withUserId(mockArticles, 'userId').map(
      ({ userIndex, ...rest }) => rest
    ),
  });

  // &) 생성된 상품/게시글 id 조회
  const products = await prisma.product.findMany({
    select: { id: true },
    orderBy: { id: 'asc' },
  });
  const articles = await prisma.article.findMany({
    select: { id: true },
    orderBy: { id: 'asc' },
  });

  const mapComment = (arr, target) =>
    arr.map((item) => ({
      content: item.content,
      userId: userEntities[item.userIndex].id,
      [`${target}Id`]:
        target === 'product'
          ? products[item.productIndex].id
          : articles[item.articleIndex].id,
    }));

  // &) 댓글 생성
  await prisma.productComment.createMany({
    data: mapComment(mockProductComments, 'product'),
  });
  await prisma.articleComment.createMany({
    data: mapComment(mockArticleComments, 'article'),
  });

  // &) 좋아요 생성
  await prisma.productLike.createMany({
    data: mockProductLikes.map((item) => ({
      userId: userEntities[item.userIndex].id,
      productId: products[item.productIndex].id,
    })),
  });

  await prisma.articleLike.createMany({
    data: mockArticleLikes.map((item) => ({
      userId: userEntities[item.userIndex].id,
      articleId: articles[item.articleIndex].id,
    })),
  });

  // &) 시드 카운트
  const counts = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.article.count(),
    prisma.productComment.count(),
    prisma.articleComment.count(),
    prisma.productLike.count(),
    prisma.articleLike.count(),
  ]);

  console.log(
    `🌱 Seed-Success:
    - [users] ${counts[0]}
    - [products] ${counts[1]}
    - [articles] ${counts[2]}`
  );
  console.log(
    `🌱 Seed-Success:
    - [productComments] ${counts[3]}
    - [articleComments] ${counts[4]}
    - [productLikes] ${counts[5]}
    - [articleLikes] ${counts[6]}`
  );
}

// &) 연결 강제 종료
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(`시드 실패: ${e}`);
    await prisma.$disconnect();
    process.exit(1);
  });
