import request from 'supertest';
import app from '../src/app';
import { productData } from './dummyProductData';
import { priceData } from './dummyPriceData';
import { articleData } from './dummyArticleData';
import { userData } from './dummyUserData';
import prisma from '../src/lib/prismaClient';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from '../src/lib/constants';
import { tokenPayload } from '../src/lib/token';

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.article.deleteMany();
  await prisma.productPriceHistory.deleteMany();
  await prisma.$disconnect();
});

// 인증 불필요한 product API 테스트
describe('Product, Auth, Article APIs 통합 테스트', () => {
  describe('GET /products 인증 불필요', () => {
    beforeEach(async () => {
      await prisma.product.deleteMany();
      await prisma.user.deleteMany();
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`);
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`);
      await prisma.user.createMany({ data: userData });
      await prisma.product.createMany({ data: productData });
    });
    test('상품이 있을 때는 배열 반환', async () => {
      const response = await request(app).get('/products');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(productData.length);
      expect(response.body[0].name).toBe('Product 3');
      expect(response.body[1].name).toBe('Product 2');
      expect(response.body[2].name).toBe('Product 1');
    });
    test('생성 시간 오름차순으로 할 일 목록 조회', async () => {
      const response = await request(app).get('/products').query({ order: 'oldest' });
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(productData.length);
      expect(response.body[0].name).toBe('Product 1');
      expect(response.body[1].name).toBe('Product 2');
      expect(response.body[2].name).toBe('Product 3');
    });
    test('offset 주고 할 일 목록 조회', async () => {
      const response = await request(app).get('/products').query({ order: 'oldest', offset: 1 });
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(productData.length - 1);
      expect(response.body[0].name).toBe('Product 2');
      expect(response.body[1].name).toBe('Product 3');
    });
    test('limit 주고 할 일 목록 조회', async () => {
      const response = await request(app)
        .get('/products')
        .query({ order: 'oldest', offset: 1, limit: 1 });
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toEqual('Product 2');
    });
    test('name에 포함된 단어로 검색하여 할 일 목록 조회', async () => {
      const response = await request(app).get('/products').query({ name: 'Product 1' });
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe('Product 1');
    });
    test('description에 포함된 단어로 검색하여 할 일 목록 조회', async () => {
      const response = await request(app).get('/products').query({ description: 'Description' });
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
      expect(response.body[0].name).toBe('Product 3');
      expect(response.body[1].name).toBe('Product 2');
      expect(response.body[2].name).toBe('Product 1');
    });

    test('할 일이 없을 때는 빈 목록 반환', async () => {
      await prisma.product.deleteMany();
      const response = await request(app).get('/products');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  // 인증 불필요한 article API 테스트
  describe('GET /articles 인증 불필요', () => {
    beforeEach(async () => {
      await prisma.article.deleteMany();
      await prisma.user.deleteMany();
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`);
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Article" RESTART IDENTITY CASCADE`);
      await prisma.user.createMany({ data: userData });
      await prisma.article.createMany({ data: articleData });
    });
    test('게시글이 있을 때는 배열 반환', async () => {
      const response = await request(app).get('/articles');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(articleData.length);
      expect(response.body[0].title).toBe('Article 3');
      expect(response.body[1].title).toBe('Article 2');
      expect(response.body[2].title).toBe('Article 1');
    });
    test('생성 시간 오름차순으로 게시글 목록 조회', async () => {
      const response = await request(app).get('/articles').query({ order: 'oldest' });
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(articleData.length);
      expect(response.body[0].title).toBe('Article 1');
      expect(response.body[1].title).toBe('Article 2');
      expect(response.body[2].title).toBe('Article 3');
    });
    test('offset 주고 게시글 목록 조회', async () => {
      const response = await request(app).get('/articles').query({ order: 'oldest', offset: 1 });
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(articleData.length - 1);
      expect(response.body[0].title).toBe('Article 2');
      expect(response.body[1].title).toBe('Article 3');
    });
    test('limit 주고 게시글 목록 조회', async () => {
      const response = await request(app)
        .get('/articles')
        .query({ order: 'oldest', offset: 1, limit: 1 });
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toEqual('Article 2');
    });
    test('title 포함된 단어로 검색하여 게시글 목록 조회', async () => {
      const response = await request(app).get('/articles').query({ title: 'Article 1' });
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toBe('Article 1');
    });
    test('content에 포함된 단어로 검색하여 게시글 목록 조회', async () => {
      const response = await request(app).get('/articles').query({ content: 'Content' });
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
      expect(response.body[0].content).toBe('Content 3');
      expect(response.body[1].content).toBe('Content 2');
      expect(response.body[2].content).toBe('Content 1');
    });

    test('게시글이 없을 때는 빈 목록 반환', async () => {
      await prisma.article.deleteMany();
      const response = await request(app).get('/articles');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  // 인증 관련된 auth APIs 테스트
  describe('auth APIs', () => {
    beforeAll(async () => {
      await prisma.user.deleteMany();
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`);
      await prisma.user.createMany({ data: userData });
    });

    // 사용자 등록 테스트: POST /auth/register
    test('email, nickname, password로 회원 가입 요청하면 user 객체 반환', async () => {
      const data = {
        email: 'user4@example.com',
        nickname: 'user4',
        password: 'password4'
      };
      const response = await request(app).post('/auth/register').send(data);
      expect(response.status).toBe(201);
      expect(response.body.email).toEqual('user4@example.com');
      expect(response.body.nickname).toEqual('user4');
    });

    test('필드명에 오류가 있는 채로 회원 가입 요청하면 적절한 메세지 반환', async () => {
      const data = {
        email: 'user4@example.com',
        username: 'user4',
        password: 'password4'
      };
      const response = await request(app).post('/auth/register').send(data);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('허용되지 않은 필드 (username)');
    });

    test('필수 필드가 빠진 채로 회원 가입 요청하면 적절한 메세지 반환', async () => {
      const data = {
        email: 'user4@example.com',
        password: 'password4'
      };
      const response = await request(app).post('/auth/register').send(data);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('필수 필드 누락 (nickname)');
    });

    test('이미 등록된 이메일로 회원 가입 요청하면 등록된 사용자라는 메세지 반환', async () => {
      const data = {
        email: 'user3@example.com',
        nickname: 'user4',
        password: 'password4'
      };
      const response = await request(app).post('/auth/register').send(data);
      expect(response.status).toBe(409);
      expect(response.body.message).toBe('이미 등록된 이메일입니다');
    });

    // 사용자 로그인 테스트: POST /auth/login
    let token: string;
    test('등록된 사용자 정보로 로그인 요청하면, 토큰을 쿠키에 반환', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'user1@example.com', password: 'password1' });

      const raw = response.headers['set-cookie'];
      const cookies = Array.isArray(raw) ? raw : raw ? [raw] : [];
      const cookie = cookies.find((c) => c.startsWith('refresh-token='));
      expect(cookie).toBeDefined();

      const refreshToken = cookie!.split(';')[0].split('=')[1];
      token = response.body.accessToken;

      const now = Math.floor(Date.now() / 1000);

      expect(response.status).toBe(200);
      let payload = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET) as tokenPayload;
      expect(payload.id).toBe(1);
      expect(payload.exp).toBeGreaterThan(now);

      payload = jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET) as tokenPayload;
      expect(payload.id).toBe(1);
      expect(payload.exp).toBeGreaterThan(now);
    });

    test('로그아웃 요청하면, 갱신토큰 만료시키고 적절한 메세지 반환', async () => {
      const response = await request(app)
        .post('/auth/logout')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('사용자가 로그아웃 하였습니다');

      const setCookie = response.headers['set-cookie'];
      expect(setCookie).toBeDefined();
      expect(setCookie).toEqual(
        expect.arrayContaining([expect.stringContaining('refresh-token=;')])
      );
      expect(setCookie).toEqual(
        expect.arrayContaining([expect.stringContaining('Expires=Thu, 01 Jan 1970')])
      );
    });

    test('필드명 오류 또는 필수 필드 누락인 경우 적절한 메세지 반환', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'user1@example.com', passwordHash: 'password1' });
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('허용되지 않은 필드 (passwordHash)');
    });

    test('등록되지 않은 이메일로 요청하면, 존재하지 않는다는 메세지 반환', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'user11@example.com', password: 'password1' });
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('존재하지 않습니다');
    });

    test('invalid password로 요청하면, 비밀번호가 틀렸다는 메세지 반환', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'user1@example.com', password: 'password11' });
      expect(response.status).toBe(403);
      expect(response.body.message).toEqual('비밀번호가 틀렸습니다');
    });
  });

  //   // 인증 요하는 product APIs
  describe('인증 요하는 product APIs', () => {
    const agent = request.agent(app);
    let loginRes: any;
    let token: string;

    beforeEach(async () => {
      await prisma.productPriceHistory.deleteMany();
      await prisma.product.deleteMany();
      await prisma.user.deleteMany();
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`);
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`);
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "ProductPriceHistory" RESTART IDENTITY CASCADE`
      );
      await prisma.user.createMany({ data: userData });
      await prisma.product.createMany({ data: productData });
      await prisma.productPriceHistory.createMany({ data: priceData });

      loginRes = await agent
        .post('/auth/login')
        .send({ email: 'user1@example.com', password: 'password1' });
      expect(loginRes.status).toBe(200);
      token = loginRes.body.accessToken;
    });

    // 상풍 상세 조회 테스트
    test('GET /products/:id 존재하는 경우 product 객체 반환', async () => {
      const response = await agent.get('/products/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.name).toEqual('Product 1');
      expect(response.body.description).toEqual('Description 1');
      expect(response.body.price).toEqual(1000);
      expect(response.body.tags).toEqual(['tag1']);
      expect(response.body.userId).toEqual(1);
    });

    test('GET /products/:id 존재하지 않는 경우 존재하지 않는다는 메세지 반환', async () => {
      const response = await agent.get('/products/1111').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('존재하지 않습니다');
    });

    // 상풍 좋아요/좋아요-취소 토글
    test('POST /products/:id/like/toggle 좋아요와 좋아요-취소 토글, isLiked: boolean 필드 포함한 상품 객체 반환 ', async () => {
      //좋아요를 누르지 않은 상품에 좋아요 누르면, isLiked: true 필드 가진 상품 객체 반환
      let response = await agent
        .post('/products/2/like/toggle')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.isLiked).toBeTruthy();
      expect(response.body.id).toEqual(2);
      expect(response.body.likedUsers).toEqual(expect.arrayContaining(['user1']));

      // 좋아요를 눌렀던 상품을 다시 눌러 좋아요-취소하면, isLiked: false 필드 가진 상품 객체 반환
      response = await agent
        .post('/products/2/like/toggle')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.isLiked).toBeFalsy();
      expect(response.body.id).toEqual(2);
      expect(response.body.likedUsers).not.toEqual(expect.arrayContaining(['user1']));
    });

    // 상품 등록: POST /products
    test('POST /products 필수 필드로 등록 요청하면 Product와 ProductPriceHistory 생성', async () => {
      const pData = {
        name: 'Product 4',
        description: 'Description 4',
        price: 4000,
        tags: ['tag4']
      };
      // 상품 등록
      let response = await agent
        .post('/products')
        .send(pData)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(201);
      expect(response.body.name).toEqual(pData.name);
      expect(response.body.description).toEqual(pData.description);
      expect(response.body.price).toEqual(pData.price);
      expect(response.body.tags).toEqual(['tag4']);
      expect(response.body.userId).toEqual(1);
      const newProductId = response.body.id;

      // 전체 상품 수가 1개 증가한 것 확인
      response = await agent.get('/products').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toEqual(productData.length + 1);

      // 등록된 상품의 ProductPriceHistory 생성, prevPrice = null
      response = await agent
        .get(`/products/${newProductId}/price-records`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.total).toBe(1);
      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0].productId).toEqual(newProductId);
      expect(response.body.data[0].prevPrice).toBeNull();
      expect(response.body.data[0].price).toEqual(pData.price);
    });

    test('POST /products 필드명이 틀리면 상태코드 400 반환', async () => {
      const pData = {
        name: 'Product 4',
        descriptions: 'Description 4',
        price: 4000,
        tag: ['tag4']
      };
      const response = await agent
        .post('/products')
        .send(pData)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('허용되지 않은 필드 (descriptions, tag)');
    });

    test('POST /products 필수 필드가 빠진 경우 상태코드 400 반환', async () => {
      const pData = {
        description: 'Description 4',
        price: 4000,
        tags: ['tag4']
      };
      const response = await agent
        .post('/products')
        .send(pData)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('필수 필드 누락 (name)');
    });
  });

  // 인증/인가 필요한 product APIs
  describe('인증/인가 요하는 product APIs', () => {
    const agent = request.agent(app);
    let loginRes: any;
    let token: string;

    beforeEach(async () => {
      await prisma.productPriceHistory.deleteMany();
      await prisma.product.deleteMany();
      await prisma.user.deleteMany();
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`);
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`);
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "ProductPriceHistory" RESTART IDENTITY CASCADE`
      );
      await prisma.user.createMany({ data: userData });
      await prisma.product.createMany({ data: productData });
      await prisma.productPriceHistory.createMany({ data: priceData });

      loginRes = await agent
        .post('/auth/login')
        .send({ email: 'user1@example.com', password: 'password1' });
      expect(loginRes.status).toBe(200);
      token = loginRes.body.accessToken;
    });

    test('PATCH /products/:id 본인이 등록한 상품 수정 요청 및 가격 변동 관련 API 테스트', async () => {
      const pData = {
        name: 'product 1 (edited)',
        price: 1100,
        tags: ['tag11']
      };
      // 상품 정보 수정 (가격 포함)
      let response = await agent
        .patch('/products/1')
        .send(pData)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe(pData.name);
      expect(response.body.description).toEqual(productData[0].description);
      expect(response.body.price).toEqual(pData.price);
      expect(response.body.tags).toEqual(pData.tags);
      expect(response.body.userId).toEqual(1);

      // 상품 가격 변동 내역을 ProductpriceHistory에서 확인
      // 특정 상품의 모든 가격변동 내역 조회에 해당
      response = await agent
        .get('/products/1/price-records')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.total).toBe(2);
      expect(response.body.data.length).toBe(2);
      expect(response.body.data[0].productId).toEqual(1);
      expect(response.body.data[0].prevPrice).toBeNull();
      expect(response.body.data[0].price).toEqual(1000);
      expect(response.body.data[1].prevPrice).toEqual(1000);
      expect(response.body.data[1].price).toEqual(1100);

      // 특정 가격변동 조회
      const priceHistoryId = response.body.data[1].id;
      response = await agent
        .get(`/products/price-records/${priceHistoryId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toEqual(priceHistoryId);
      expect(response.body.productId).toEqual(1);
      expect(response.body.prevPrice).toEqual(1000);
      expect(response.body.price).toEqual(1100);
    });

    test('PATCH /products/:id 본인이 등록한 상품 수정 요청, 기격 변동 없는 경우', async () => {
      const pData = {
        description: 'Description  1 (edited)'
      };
      const response = await agent
        .patch('/products/1')
        .send(pData)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe(productData[0].name);
      expect(response.body.description).toEqual(pData.description);
      expect(response.body.price).toEqual(productData[0].price);
      expect(response.body.tags).toEqual(productData[0].tags);
      expect(response.body.userId).toEqual(1);
    });

    test('PATCH /products/:id 필드명에 오류 있으면 상태코드 400 반환', async () => {
      const response = await agent
        .patch('/products/1')
        .send({ descriptions: 'Description 1 (edited)' })
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('허용되지 않은 필드 (descriptions)');
    });

    test('PATCH /products/:id 수정 내용이 없으면 상태코드 400 반환', async () => {
      const response = await agent
        .patch('/products/1')
        .send({})
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('수정할 필드가 없습니다');
    });

    test('PATCH /products/:id 본인이 등록하지 않은 상품 수정 요청하면 권한이 없다는 메세지 반환', async () => {
      const response = await agent
        .patch('/products/2')
        .send({ name: 'Product 2 (edited)' })
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(403);
      expect(response.body.message).toEqual('권한이 없습니다');
    });

    test('PATCH /products/:id 존재하지 않는 상품 수정 요청하면 존재하지 않는다는 메세지 반환', async () => {
      const response = await agent
        .patch('/products/22')
        .send({ description: 'Description 2 (edited)', price: 2200 })
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('존재하지 않습니다');
    });

    test('DELETE /products/:id 본인이 등록한 상품 삭제 요청하면 상태코드 204로 응답', async () => {
      const response = await agent.delete('/products/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(204);
      expect(response.text).toBe('');
    });
    test('DELETE /products/:id 본인이 등록하지 않은 상품 삭제 요청하면 권한이 없다는 메세지 출력', async () => {
      const response = await agent.delete('/products/2').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('권한이 없습니다');
    });
    test('DELETE /products/:id 존재하지 않는 상품 삭제 요청하면 존재하지 않는다는 메세지 출력', async () => {
      const response = await agent.delete('/products/111').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('존재하지 않습니다');
    });
  });

  // 인증 요하는 article APIs
  describe('인증 요하는 Article APIs 테스트', () => {
    const agent = request.agent(app);
    let loginRes: any;
    let token: string;

    beforeAll(async () => {
      await prisma.article.deleteMany();
      await prisma.user.deleteMany();
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`);
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Article" RESTART IDENTITY CASCADE`);
      await prisma.user.createMany({ data: userData });
      await prisma.article.createMany({ data: articleData });

      loginRes = await agent
        .post('/auth/login')
        .send({ email: 'user1@example.com', password: 'password1' });
      expect(loginRes.status).toBe(200);
      token = loginRes.body.accessToken;
    });

    // 게시글 상세 조회 테스트
    test('GET /articles/:id 존재하는 경우 article 객체 반환', async () => {
      const response = await agent.get('/articles/3').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toEqual(3);
      expect(response.body.title).toEqual('Article 3');
      expect(response.body.content).toEqual('Content 3');
      expect(response.body.userId).toEqual(3);
    });

    test('GET /articles/:id 존재하지 않는 경우 존재하지 않는다는 메세지 반환', async () => {
      const response = await agent.get('/articles/1111').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('존재하지 않습니다');
    });

    // 게시글 좋아요/좋아요-취소 토글
    test('POST /articles/:id/like/toggle 좋아요/좋아요-취소 토글 누르면 isLiked: boolean 필드 가진 게시글 객체 반환 ', async () => {
      // 좋아요를 누르지 않았던 게시글에 좋아요 누르면, isLiked: true 필드 가진 게시글 객체 반환
      let response = await agent
        .post('/articles/3/like/toggle')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.isLiked).toBeTruthy();
      expect(response.body.id).toEqual(3);
      expect(response.body.likedUsers).toEqual(expect.arrayContaining(['user1']));

      // 좋아요를 눌렀던 게시글을 좋아요-취소하면, isLiked: false 필드 가진 게시글 객체 반환
      response = await agent
        .post('/articles/3/like/toggle')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.isLiked).toBeFalsy();
      expect(response.body.id).toEqual(3);
      expect(response.body.likedUsers).not.toEqual(expect.arrayContaining(['user1']));
    });

    // 게시글 등록: POST /articles
    test('POST /articles 필수 필드를 갖추어 등록 요청하면 product 객체 반환', async () => {
      const aData = {
        title: 'Article 4',
        content: 'Content 4'
      };
      // 게시글 등록
      let response = await agent
        .post('/articles')
        .send(aData)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(201);
      expect(response.body.title).toEqual(aData.title);
      expect(response.body.content).toEqual(aData.content);
      expect(response.body.userId).toEqual(1);

      // 전체 게시글 수가 1개 증가한 것 확인
      response = await agent.get('/articles').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(articleData.length + 1);
    });

    test('POST /articles 필수 필드가 빠지면 상태코드 400 반환', async () => {
      const aData = {
        content: 'Content 4'
      };
      const response = await agent
        .post('/articles')
        .send(aData)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('필수 필드 누락 (title)');
    });
    test('POST /articles 필드명 철자가 틀리면 상태코드 400 반환', async () => {
      const aData = {
        title: 'Article 4',
        contents: 'Content 4'
      };
      const response = await agent
        .post('/articles')
        .send(aData)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('허용되지 않은 필드 (contents)');
    });
  });

  // 인증/인가 필요한 article APIs
  describe('인증/인가 요하는 article APIs', () => {
    const agent = request.agent(app);
    let loginRes: any;
    let token: string;

    beforeAll(async () => {
      await prisma.article.deleteMany();
      await prisma.user.deleteMany();
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`);
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Article" RESTART IDENTITY CASCADE`);
      await prisma.user.createMany({ data: userData });
      await prisma.article.createMany({ data: articleData });

      loginRes = await agent
        .post('/auth/login')
        .send({ email: 'user1@example.com', password: 'password1' });
      expect(loginRes.status).toBe(200);
      token = loginRes.body.accessToken;
    });

    test('PATCH /articles/:id 본인이 등록한 게시글 수정 요청하면 수정된 article 객체 반환', async () => {
      const response = await agent
        .patch('/articles/1')
        .send({ content: 'Content 1 (edited)' })
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.title).toBe('Article 1');
      expect(response.body.content).toEqual('Content 1 (edited)');
      expect(response.body.userId).toEqual(1);
    });
    test('PATCH /articles/:id 필드명에 오류가 있으면 상태코드 400 반환', async () => {
      const response = await agent
        .patch('/articles/1')
        .send({ contents: 'Content 1 (edited)' })
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('허용되지 않은 필드 (contents)');
    });
    test('PATCH /articles/:id 본인이 등록하지 않은 게시글 수정 요청하면 권한이 없다는 메세지 반환', async () => {
      const response = await agent
        .patch('/articles/3')
        .send({ content: 'Content 3 (edited)' })
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(403);
      expect(response.body.message).toEqual('권한이 없습니다');
    });
    test('DELETE /articles/:id 본인이 등록한 상품 삭제 요청하면 상태코드 204로 응답', async () => {
      const response = await agent.delete('/articles/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(204);
      expect(response.text).toBe('');
    });
    test('DELETE /articles/:id 본인이 등록하지 않은 상품 삭제 요청하면 권한이 없다는 메세지 출력', async () => {
      const response = await agent.delete('/articles/3').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('권한이 없습니다');
    });
    test('DELETE /articles/:id 존재하지 않는 상품 삭제 요청하면 존재하지 않는다는 메세지 출력', async () => {
      const response = await agent.delete('/articles/1111').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('존재하지 않습니다');
    });
  });
});
