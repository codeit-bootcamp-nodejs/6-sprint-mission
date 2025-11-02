import { PrismaClient, Category, ProductStatus } from '@prisma/client';
import { fakerKO as faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const categories = Object.values(Category);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomCategory() {
  return categories[getRandomInt(categories.length)];
}

function getRandomProductName() {
  const adjectives = ['고급', '프리미엄', '신선한', '유기농', '한정판', '감성적인', '클래식'];
  const items = ['커피', '와인', '초콜릿', '티셔츠', '가방', '이어폰', '캔들', '향수'];
  const adjective = adjectives[getRandomInt(adjectives.length)];
  const item = items[getRandomInt(items.length)];
  return `${adjective} ${item}`;
}

function getRandomDescription() {
  const sentences = [
    '최고의 품질을 자랑합니다.',
    '지금 구매하시면 특별 할인 혜택을 드립니다.',
    '일상에 감성을 더하는 제품입니다.',
    '많은 사랑을 받고 있는 인기 상품입니다.',
    '한정 수량으로 판매됩니다. 놓치지 마세요!',
    '디테일까지 완벽하게 제작되었습니다.',
  ];
  return faker.helpers.arrayElement(sentences);
}

function getRandomStatus() {
  const status = ['ON_SALE', 'RESERVED', 'COMPLETE'];
  return faker.helpers.arrayElement(status);
}

async function main() {
  console.log('Start seeding with Faker (KO)...');
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.image.deleteMany();
  await prisma.tag.deleteMany();

  const userIds = [];
  console.log('Creating 30 users...');

  for (let i = 1; i <= 30; i++) {
    const lastName = faker.person.lastName();
    const firstName = faker.person.firstName();
    const fullName = lastName + firstName;
    const createdAt = faker.date.past({ years: 2 });
    const updatedAt = faker.date.between({ from: createdAt, to: new Date() });

    const user = await prisma.user.create({
      data: {
        email: faker.internet.email({ firstName, lastName }),
        firstName: firstName,
        lastName: lastName,
        fullName: fullName,
        address: faker.location.streetAddress(true),
        createdAt: createdAt,
        updatedAt: updatedAt,
        userPreference: {
          create: {
            receiveEmail: faker.datatype.boolean(),
          },
        },
      },
    });
    userIds.push(user.id);
  }
  console.log('Users created');

  console.log('Creating 100 products...');
  for (let i = 1; i <= 200; i++) {
    const randomAuthorId = faker.helpers.arrayElement(userIds);
    const createdAt = faker.date.past({ years: 2 });
    const updatedAt = faker.date.between({ from: createdAt, to: new Date() });

    await prisma.product.create({
      data: {
        name: getRandomProductName(),
        description: getRandomDescription(),
        category: getRandomCategory(),
        price: faker.number.int({ min: 1000, max: 200000 }),
        stock: faker.number.int({ min: 1, max: 10 }),
        // status: ProductStatus.ON_SALE,
        status: getRandomStatus(),
        createdAt: createdAt,
        updatedAt: updatedAt,
        authorId: randomAuthorId,
      },
    });
  }
  console.log('Products created.');

  console.log('Creating 30 articles...');
  for (let i = 1; i <= 30; i++) {
    const randomUserIndex = getRandomInt(userIds.length);
    const randomAuthorId = userIds[randomUserIndex];
    const createdAt = faker.date.past({ years: 2 });
    const updatedAt = faker.date.between({ from: createdAt, to: new Date() });

    await prisma.article.create({
      data: {
        title: faker.lorem.sentence({ min: 3, max: 7 }),
        content: faker.lorem.paragraph(2),
        createdAt: createdAt,
        updatedAt: updatedAt,
        authorId: randomAuthorId,
      },
    });
  }
  console.log('Articles created.');

  console.log('Seeding finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
