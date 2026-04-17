import pool from '../config/database.js';
import initializeDatabase from '../config/init.js';
import { PRODUCTS, ARTICLES } from '../prisma/mock.js';

async function seedDatabase() {
  try {
    console.log('데이터베이스 시딩을 시작합니다...');

    // 데이터베이스 초기화
    await initializeDatabase();

    // mock.js에서 가져온 상품 데이터 사용
    const sampleProducts = PRODUCTS.map((product) => ({
      name: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      image_url: null,
    }));

    // mock.js에서 가져온 기사 데이터 사용
    const sampleArticles = ARTICLES.map((article) => ({
      title: article.title,
      content: article.content,
    }));

    // 상품 데이터 삽입
    console.log('상품 데이터를 삽입합니다...');
    for (const product of sampleProducts) {
      await pool.query(
        'INSERT INTO products (name, description, price, tags, image_url) VALUES ($1, $2, $3, $4, $5)',
        [product.name, product.description, product.price, product.tags, product.image_url],
      );
    }

    // 게시글 데이터 삽입
    console.log('게시글 데이터를 삽입합니다...');
    for (const article of sampleArticles) {
      await pool.query('INSERT INTO articles (title, content) VALUES ($1, $2)', [
        article.title,
        article.content,
      ]);
    }

    // 샘플 댓글 데이터 (더 다양하고 현실적인 댓글들)
    console.log('댓글 데이터를 삽입합니다...');

    // 상품들에 대한 댓글 추가
    const productComments = [
      { product_id: 1, content: '랑방 샤워젤 정말 좋아요! 향도 좋고 피부도 부드러워져요.' },
      { product_id: 1, content: '가격 협상 가능한가요?' },
      { product_id: 2, content: '나이키 테크조그거팬츠 사이즈 어떻게 되나요?' },
      { product_id: 2, content: '직거래 가능한 지역이 어디인가요?' },
      { product_id: 3, content: 'AirPods 프로 배터리 상태는 어떤가요?' },
      { product_id: 3, content: '노이즈 캔슬링 잘 작동하나요?' },
      { product_id: 4, content: '베르사체 화장품 세트 구성품이 뭔가요?' },
      { product_id: 5, content: '아이언맨 골프 클럽 세트 정말 멋지네요!' },
      { product_id: 6, content: '삼성 갤럭시 S21 울트라 배터리 상태는 어떤가요?' },
      { product_id: 7, content: 'LG 그램 노트북 무게가 얼마나 되나요?' },
    ];

    for (const comment of productComments) {
      await pool.query('INSERT INTO comments (content, product_id) VALUES ($1, $2)', [
        comment.content,
        comment.product_id,
      ]);
    }

    // 기사들에 대한 댓글 추가
    const articleComments = [
      { article_id: 1, content: '2024년 가을 패션 트렌드 정말 유용한 정보네요!' },
      { article_id: 1, content: '빈티지 무드 어떻게 연출하면 좋을까요?' },
      { article_id: 2, content: '스마트 홈 기기 선택 가이드 감사합니다!' },
      { article_id: 2, content: '초보자에게 추천하는 기기가 뭔가요?' },
      { article_id: 3, content: '홈 카페 만들기 정보 정말 도움되네요!' },
      { article_id: 3, content: '다음 글에서 말차라떼 만드는 법도 알려주시나요?' },
      { article_id: 4, content: '피부 타입별 스킨케어 루틴 정보 감사합니다!' },
      { article_id: 4, content: '지성 피부 관리법 더 자세히 알려주세요.' },
      { article_id: 5, content: '주방 도구 필수템 가이드 정말 유용해요!' },
      { article_id: 5, content: '요즘 좋은 주방도구 사기가 어렵더라구요ㅜ' },
    ];

    for (const comment of articleComments) {
      await pool.query('INSERT INTO comments (content, article_id) VALUES ($1, $2)', [
        comment.content,
        comment.article_id,
      ]);
    }

    console.log('데이터베이스 시딩이 완료되었습니다!');

    // 삽입된 데이터 확인
    const productCount = await pool.query('SELECT COUNT(*) FROM products');
    const articleCount = await pool.query('SELECT COUNT(*) FROM articles');
    const commentCount = await pool.query('SELECT COUNT(*) FROM comments');

    console.log(`삽입된 데이터:`);
    console.log(`- 상품: ${productCount.rows[0].count}개`);
    console.log(`- 게시글: ${articleCount.rows[0].count}개`);
    console.log(`- 댓글: ${commentCount.rows[0].count}개`);
  } catch (error) {
    console.error('데이터베이스 시딩 오류:', error);
    throw error;
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
