import { PrismaClient } from '@prisma/client';
import { PRODUCTS, ARTICLES, IMAGES, PRODUCT_COMMENTS, ARTICLE_COMMENTS } from './mock.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const createdProducts = [];
  for (const p of PRODUCTS) {
    const product = await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        tags: p.tags,
      },
    });
    createdProducts.push(product);
    console.log(`Created product ${product.id} - ${product.name}`);
  }

  let imageIndex = 0;
  for (const product of createdProducts) {
    const imagesForProduct = [];

    const assignCount = Math.min(2, IMAGES.length - imageIndex) || 1;
    for (let i = 0; i < assignCount; i++) {
      const img = IMAGES[imageIndex++];
      if (!img) break;
      imagesForProduct.push(img);
    }
    for (const img of imagesForProduct) {
      await prisma.image.create({
        data: {
          url: img.url,
          productId: product.id,
        },
      });
      console.log(`  - Image added for product ${product.id}: ${img.url}`);
    }
  }

  for (let i = 0; i < createdProducts.length; i++) {
    const product = createdProducts[i];
    const comment = PRODUCT_COMMENTS[i % PRODUCT_COMMENTS.length];
    await prisma.productComment.create({
      data: {
        content: comment.content,
        productId: product.id,
      },
    });
    console.log(`  - Comment added for product ${product.id}`);
  }

  // Articles 생성
  const createdArticles = [];
  for (const a of ARTICLES) {
    const article = await prisma.article.create({
      data: {
        title: a.title,
        content: a.content,
      },
    });
    createdArticles.push(article);
    console.log(`Created article ${article.id} - ${article.title}`);
  }

  // ArticleComments: 각 게시글에 댓글 추가
  for (let i = 0; i < createdArticles.length; i++) {
    const article = createdArticles[i];
    const comment = ARTICLE_COMMENTS[i % ARTICLE_COMMENTS.length];
    await prisma.articleComment.create({
      data: {
        content: comment.content,
        articleId: article.id,
      },
    });
    console.log(`  - Comment added for article ${article.id}`);
  }

  console.log('Seeding finished!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
