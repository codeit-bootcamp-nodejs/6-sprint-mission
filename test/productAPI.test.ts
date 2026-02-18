import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/utils/prismaClient';
import bcrypt from 'bcrypt';

const agent = request.agent(app);

describe('인증이 필요하지 않은 상품 API 테스트', () => {
  beforeAll(async () => {
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await prisma.user.createMany({
      data: [
        {
          id: 1,
          email: 'user1@example.com',
          password: 'password123',
          name: 'test',
          nickname: 'test',
        },
        {
          id: 2,
          email: 'user2@example.com',
          password: 'password123',
          name: 'test2',
          nickname: 'test2',
        },
      ],
    });
    const product = await prisma.product.create({
      data: {
        id: 1,
        productName: '테스트1',
        description: '테스트1',
        price: 999,
        stock: 10,
        userId: 1,
      },
    });
    await prisma.product.create({
      data: {
        id: 2,
        productName: '테스트2',
        description: '테스트2',
        price: 999,
        stock: 10,
        userId: 2,
      },
    });
  });

  afterAll(async () => {
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  describe('상품 목록 조회 API 테스트', () => {
    test('목록 조회 요청이 성공했을시 200 코드와 배열을 반환', async () => {
      const response = await request(app).get('/products');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    test('페이지네이션 테스트 ', async () => {
      const response = await request(app).get('/products').query({ page: 1, limit: 1 });
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });

    test('검색어 테스트', async () => {
      const response = await request(app).get('/products').query({ search: '테스트1' });
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].productName).toBe('테스트1');
    });

    test('oldest 정렬 테스트', async () => {
      const response = await request(app).get('/products').query({ order: 'oldest' });
      expect(response.status).toBe(200);
      expect(response.body[0].productName).toBe('테스트1');
    });

    test('recent 정렬 테스트 ', async () => {
      const response = await request(app).get('/products').query({ order: 'recent' });
      expect(response.status).toBe(200);
      expect(response.body[0].productName).toBe('테스트2');
    });
  });

  describe('상품 상세 조회 API 테스트', () => {
    test('상품 상제 조회 요청시 성공 > 200코드,데이터 반환', async () => {
      const productId = 1;
      const response = await request(app).get(`/products/${productId}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        productName: '테스트1',
        description: '테스트1',
        price: 999,
        stock: 10,
      });
    });
    test('잘못된 파라미터로 요청 > 404코드,에러 메세지 반환', async () => {
      const productId = 4;
      const response = await request(app).get(`/products/${productId}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('정보를 찾을 수 없음');
    });
  });
});

describe('인증이 필요한 상품 API 테스트', () => {
  let productId: number;
  beforeAll(async () => {
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    const hashedPassword = await bcrypt.hash('password123', 10);
    await prisma.user.create({
      data: {
        id: 1,
        email: 'user1@example.com',
        password: hashedPassword,
        name: 'test',
        nickname: 'test',
      },
    });
    const loginResponse = await agent.post('/auth/login').send({
      email: 'user1@example.com',
      password: 'password123',
    });
    const product = await prisma.product.create({
      data: {
        userId: 1,
        productName: '테스트1',
        description: '테스트1',
        price: 999,
        stock: 10,
      },
    });
    productId = product.id;
  });

  afterAll(async () => {
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  describe('상품 등록 API 테스트', () => {
    test('상품 등록 요청이 성공 > 201코드와 데이터 반환', async () => {
      const response = await agent.post('/products').send({
        productName: '테스트1',
        description: '테스트1',
        price: 999,
        stock: 10,
        tag: '테스트',
      });
      expect(response.status).toBe(201);

      expect(response.body).toMatchObject({
        productName: '테스트1',
        description: '테스트1',
        price: 999,
        stock: 10,
        productTags: [{ tag: { tag: '테스트' } }],
        productImages: [],
      });
      await prisma.product.delete({ where: { id: response.body.id } });
    });
    test('요청 양식에 맞지 않은 데이터로 요청 > 400코드와 에러 메세지 반환', async () => {
      const response = await agent.post('/products').send({
        productName: '테스트1',
        description: '테스트1',
        stock: 10,
        tag: '테스트',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('전달 사항을 조건에 맞춰 수정해주세요');
    });
    test('비로그인 요청 > 401코드와 에러 메세지 반환', async () => {
      const response = await request(app)
        .post('/products')
        .set('Cookie', 'access-token=invalid-token')
        .send({
          productName: '테스트1',
          description: '테스트1',
          price: 999,
          stock: 10,
          tag: '테스트',
        });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('유효하지 않은 토큰입니다.');
    });
  });

  describe('상품 수정 API 테스트', () => {
    test('상품 수정 요청이 성공 > 200코드와 데이터 반환', async () => {
      const product = productId;
      const response = await agent.patch(`/products/${product}`).send({
        productName: '수정 테스트1',
        description: '수정 테스트1',
        price: 999,
        stock: 10,
        tag: '수정 테스트',
      });
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        productName: '수정 테스트1',
        description: '수정 테스트1',
        price: 999,
        stock: 10,
        productTags: [{ tag: { tag: '수정 테스트' } }],
      });
    });
    test('상품 부분 수정 요청 성공 > 200코드와 데이터 반환', async () => {
      const product = productId;
      const response = await agent.patch(`/products/${product}`).send({
        productName: '부분 수정 테스트1',
      });
      expect(response.status).toBe(200);
      expect(response.body.productName).toBe('부분 수정 테스트1');
    });
    test('상품 게시자와 다른 유저가 수정 요청 > 401코드와 에러 메세지 반환', async () => {
      const response = await request(app)
        .patch(`/products/${productId}`)
        .set('Cookie', 'access-token=invalid-token')
        .send({
          productName: '수정 테스트1',
        });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('유효하지 않은 토큰입니다.');
    });
    test('비로그인 요청시 401코드와 에러 메세지 반환', async () => {
      const response = await request(app).patch(`/products/${productId}`).send({
        productName: '수정 테스트1',
      });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('유효하지 않은 접근입니다.');
    });
  });
  describe('상품 삭제 API 테스트', () => {
    beforeAll(async () => {
      await prisma.product.create({
        data: {
          id: 5,
          userId: 1,
          productName: '테스트2',
          description: '테스트2',
          price: 999,
          stock: 10,
        },
      });
    });

    test('상품 삭제 요청 성공 > 204 코드 반환', async () => {
      await prisma.product.create({
        data: {
          id: 6,
          userId: 1,
          productName: '테스트2',
          description: '테스트2',
          price: 999,
          stock: 10,
        },
      });
      const productId = 6;
      const response = await agent.delete(`/products/${productId}`);
      expect(response.status).toBe(204);
    });
    test('상품 삭제 요청 실패 > 404 코드와 에러 메세지 반환', async () => {
      const productId = 7;
      const response = await agent.delete(`/products/${productId}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('정보를 찾을 수 없음');
    });
    test('비로그인 요청 > 401코드와 에러 메세지 반환', async () => {
      const response = await request(app).delete(`/products/${productId}`);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('유효하지 않은 접근입니다.');
    });
    test('상품 게시자와 다른 유저가 삭제 요청 > 401코드와 에러 메세지 반환', async () => {
      const productId = 5;
      const response = await request(app)
        .delete(`/products/${productId}`)
        .set('Cookie', 'access-token=invalid-token');
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('유효하지 않은 토큰입니다.');
    });
  });
});
