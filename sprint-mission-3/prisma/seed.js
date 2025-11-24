import prisma from '../src/lib/prismaClient.js';
import { USERS, PRODUCTS } from './mock.js';

async function main() {
  //기존 데이터 잔존시 시드를 재실행 했을 때 꼬일 수 있으므로 삭제 코드 추가
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();

  //목데이터 삽입
  await prisma.user.createMany({
    data: USERS,
    skipDuplicates: true,
  });

  //셀러 아이디 부여
  const productsWithSeller = PRODUCTS.map((product) => {
    //유저 수 만큼 랜덤인덱스 뽑기
    const randomIndex = Math.floor(Math.random() * USERS.length);
    //유저스의 랜덤 인덱스에서의 아이디를 랜덤 셀러아이디에 부여
    const randomSellerId = USERS[randomIndex].id;

    return {
      ...product,
      sellerId: randomSellerId,
    };
  });

  await prisma.product.createMany({
    data: productsWithSeller,
    skipDuplicates: true,
  });
  console.log('시딩 완료!');
}

//실행기능
main()
  .catch((e) => {
    console.error('에러 캐치!:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('데이터베이스 연결 종료');
  });

//npx prisma db seed
