import { PrismaClient } from '@prisma/client';
import { USERS, PRODUCTS } from './mock.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  //기존에 데이터가 남아있을 시 지우기 위해 사용
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  /*기존 데이터를 싹 날리고, ID 번호표도 1번으로 리셋. 안그러면 db 내부 카운터가 안줄어서 8, 10 이럴 수 있다고 함
  TRUNCATE는 "테이블 비우기" + RESTART IDENTITY는 "번호 초기화".
   (이걸 해야 sellerId: 1이 정확히 민필리아를 가리킴)*/
  await prisma.$executeRaw`TRUNCATE TABLE "User", "Product", "Article", "Comment", "Image" RESTART IDENTITY CASCADE;`;

  //===== 유저 데이터 생성 =====
  console.log('👥 유저(새벽의 혈맹) 등록 중...');

  const usersToCreate = await Promise.all(
    USERS.map(async (user) => {
      const HashedPassword = await bcrypt.hash(user.password, 10); //10은 보안 정도라고 함 10에서 12가 적당하다고... //1234 -> $2b$
      return {
        ...user,
        password: HashedPassword,
      };
    }),
  );
  await prisma.user.createMany({
    data: usersToCreate,
    skipDuplicates: true,
  });

  //===== 상품 생성 =====
  console.log('📦 장터 물품 진열 중...');
  await prisma.product.createMany({
    data: PRODUCTS,
    skipDuplicates: true,
  });
}
console.log('에오르제아 중고장터 개방 완료');
console.log(`➡️  등록된 유저: ${USERS.length}명`);
console.log(`➡️  진열된 상품: ${PRODUCTS.length}개`);

//===== 실행버튼 =====
main()
  .catch((e) => {
    console.error('에러 캐치!:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('데이터베이스 연결 종료');
  });
