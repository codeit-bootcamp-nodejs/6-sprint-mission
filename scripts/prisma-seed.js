// Prisma 클라이언트와 mock 데이터를 가져옵니다
import { PrismaClient } from '@prisma/client';
import { PRODUCTS, ARTICLES } from '../prisma/mock.js';

// Prisma 클라이언트 인스턴스를 생성합니다
const prisma = new PrismaClient();

// 데이터베이스에 샘플 데이터를 넣는 함수입니다
async function seedDatabase() {
  try {
    console.log('🌱 데이터베이스 시딩을 시작합니다...');

    // 데이터베이스에 연결되는지 확인합니다
    await prisma.$connect();
    console.log('✅ 데이터베이스에 연결되었습니다.');

    // 기존 데이터를 삭제합니다 (댓글부터 삭제해야 외래키 오류가 안 납니다)
    console.log('🗑️ 기존 데이터를 삭제합니다...');
    await prisma.productComment.deleteMany();
    await prisma.articleComment.deleteMany();
    await prisma.product.deleteMany();
    await prisma.article.deleteMany();

    // 상품 데이터를 하나씩 넣습니다
    console.log('📦 상품 데이터를 삽입합니다...');
    for (let i = 0; i < PRODUCTS.length; i++) {
      const product = PRODUCTS[i];
      console.log(`${i + 1}/${PRODUCTS.length} - ${product.name} 추가 중...`);

      await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: Math.round(product.price * 100), // Decimal을 Int로 변환 (원 단위)
          tags: product.tags,
          image_url: null, // 이미지는 나중에 추가할 예정
        },
      });
    }

    // 게시글 데이터를 하나씩 넣습니다
    console.log('📝 게시글 데이터를 삽입합니다...');
    for (let i = 0; i < ARTICLES.length; i++) {
      const article = ARTICLES[i];
      console.log(`${i + 1}/${ARTICLES.length} - ${article.title} 추가 중...`);

      await prisma.article.create({
        data: {
          title: article.title,
          content: article.content,
        },
      });
    }

    // 댓글 데이터를 넣습니다
    console.log('💬 댓글 데이터를 삽입합니다...');

    // 상품들에 대한 댓글들 (UUID를 사용하므로 실제 상품 ID를 가져와야 함)
    const products = await prisma.product.findMany({ select: { id: true } });
    const productComments = [
      { productIndex: 0, content: '랑방 샤워젤 정말 좋아요! 향도 좋고 피부도 부드러워져요.' },
      { productIndex: 0, content: '가격 협상 가능한가요?' },
      { productIndex: 1, content: '나이키 테크조그거팬츠 사이즈 어떻게 되나요?' },
      { productIndex: 1, content: '직거래 가능한 지역이 어디인가요?' },
      { productIndex: 2, content: 'AirPods 프로 배터리 상태는 어떤가요?' },
      { productIndex: 2, content: '노이즈 캔슬링 잘 작동하나요?' },
      { productIndex: 3, content: '베르사체 화장품 세트 구성품이 뭔가요?' },
      { productIndex: 4, content: '아이언맨 골프 클럽 세트 정말 멋지네요!' },
      { productIndex: 5, content: '삼성 갤럭시 S21 울트라 배터리 상태는 어떤가요?' },
      { productIndex: 6, content: 'LG 그램 노트북 무게가 얼마나 되나요?' },
    ];

    // 상품 댓글들을 하나씩 넣습니다
    for (let i = 0; i < productComments.length; i++) {
      const comment = productComments[i];
      console.log(`상품 댓글 ${i + 1}/${productComments.length} 추가 중...`);

      await prisma.productComment.create({
        data: {
          content: comment.content,
          productId: products[comment.productIndex].id,
        },
      });
    }

    // 게시글들에 대한 댓글들 (UUID를 사용하므로 실제 게시글 ID를 가져와야 함)
    const articles = await prisma.article.findMany({ select: { id: true } });
    const articleComments = [
      { articleIndex: 0, content: '2024년 가을 패션 트렌드 정말 유용한 정보네요!' },
      { articleIndex: 0, content: '빈티지 무드 어떻게 연출하면 좋을까요?' },
      { articleIndex: 1, content: '스마트 홈 기기 선택 가이드 감사합니다!' },
      { articleIndex: 1, content: '초보자에게 추천하는 기기가 뭔가요?' },
      { articleIndex: 2, content: '홈 카페 만들기 정보 정말 도움되네요!' },
      { articleIndex: 2, content: '다음 글에서 말차라떼 만드는 법도 알려주시나요?' },
      { articleIndex: 3, content: '피부 타입별 스킨케어 루틴 정보 감사합니다!' },
      { articleIndex: 3, content: '지성 피부 관리법 더 자세히 알려주세요.' },
      { articleIndex: 4, content: '주방 도구 필수템 가이드 정말 유용해요!' },
      { articleIndex: 4, content: '요즘 좋은 주방도구 사기가 어렵더라구요ㅜ' },
    ];

    // 게시글 댓글들을 하나씩 넣습니다
    for (let i = 0; i < articleComments.length; i++) {
      const comment = articleComments[i];
      console.log(`게시글 댓글 ${i + 1}/${articleComments.length} 추가 중...`);

      await prisma.articleComment.create({
        data: {
          content: comment.content,
          articleId: articles[comment.articleIndex].id,
        },
      });
    }

    console.log('🎉 데이터베이스 시딩이 완료되었습니다!');

    // 삽입된 데이터 개수를 확인합니다
    const productCount = await prisma.product.count();
    const articleCount = await prisma.article.count();
    const productCommentCount = await prisma.productComment.count();
    const articleCommentCount = await prisma.articleComment.count();

    console.log(`📊 삽입된 데이터:`);
    console.log(`   - 상품: ${productCount}개`);
    console.log(`   - 게시글: ${articleCount}개`);
    console.log(`   - 상품 댓글: ${productCommentCount}개`);
    console.log(`   - 게시글 댓글: ${articleCommentCount}개`);
  } catch (error) {
    console.error('❌ 데이터베이스 시딩 오류:', error);
    throw error;
  } finally {
    // 데이터베이스 연결을 종료합니다
    await prisma.$disconnect();
  }
}

// 스크립트가 직접 실행될 때만 시딩 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => {
      console.log('시딩이 완료되었습니다.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('시딩 실패:', error);
      process.exit(1);
    });
}

export default seedDatabase;
