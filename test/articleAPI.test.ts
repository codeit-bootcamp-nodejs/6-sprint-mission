import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/utils/prismaClient';
import bcrypt from 'bcrypt';
const agent = request.agent(app);

describe('인증이 필요하지 않은 게시글 API에 대한 통합 테스트', () => {
  beforeAll(async () => {
    await prisma.article.deleteMany();
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
    await prisma.article.create({
      data: {
        id: 1,
        title: '테스트 아티클1',
        content: '테스트 아티클1',
        userId: 1,
      },
    });
    await prisma.article.create({
      data: {
        id: 2,
        title: '테스트 아티클2',
        content: '테스트 아티클2',
        userId: 2,
      },
    });
  });

  afterAll(async () => {
    await prisma.article.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });
  describe('아티클 목록 조회 API 테스트', () => {
    test('목록 조회 요청 성공 > 200코드와 배열 반환', async () => {
      const response = await request(app).get('/articles');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
    test('페이지 네이션 테스트', async () => {
      const response = await request(app).get('/articles').query({ page: 1, limit: 1 });
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });
    test('검색어 테스트', async () => {
      const response = await request(app).get('/articles').query({ search: '아티클2' });
      expect(response.status).toBe(200);
      expect(response.body[0].title).toBe('테스트 아티클2');
    });
    test('oldest 정렬 테스트', async () => {
      const response = await request(app).get('/articles').query({ order: 'oldest' });

      expect(response.status).toBe(200);
      expect(response.body[0].title).toBe('테스트 아티클1');
    });
    test('recent 정렬 테스트', async () => {
      const response = await request(app).get('/articles').query({ order: 'recent' });

      expect(response.status).toBe(200);
      expect(response.body[0].title).toBe('테스트 아티클2');
    });
  });

  describe('아티클 상세 조회 API 테스트', () => {
    test('상세 조회 요청 성공 > 200코드와 객체 반환', async () => {
      const articleId = 1;
      const response = await request(app).get(`/articles/${articleId}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: 1,
        title: '테스트 아티클1',
        content: '테스트 아티클1',
      });
    });
    test('잘못된 파라미터로 요청 > 404코드,에러 메세지 반환', async () => {
      const articleId = 4;
      const response = await request(app).get(`/articles/${articleId}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('정보를 찾을 수 없음');
    });
  });
});

describe('인증이 필요한 게시글 API에 대한 통합 테스트', () => {
  let articleId: number;
  beforeAll(async () => {
    await prisma.article.deleteMany();
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
    const article = await prisma.article.create({
      data: {
        userId: 1,
        title: '아티클 테스트',
        content: '아티클 테스트',
      },
    });
    articleId = article.id;
  });

  afterAll(async () => {
    await prisma.article.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  describe('게시글 생성 API 테스트', () => {
    test('게시글 생성 요청 성공 > 201코드와 객체 반환', async () => {
      const response = await agent.post('/articles').send({
        title: '게시글 생성 테스트',
        content: '게시글 생성 테스트',
      });
      expect(response.status).toBe(201);
      console.log(response.body);
      expect(response.body).toMatchObject({
        title: '게시글 생성 테스트',
        content: '게시글 생성 테스트',
        userId: 1,
      });
    });
    test('필수 요소 없이 요청 > 400코드와 에러 메세지 반환', async () => {
      const response = await agent.post('/articles').send({
        title: '테스트',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('전달 사항을 조건에 맞춰 수정해주세요');
    });
    test('비로그인 요청 > 401코드와 에러 메세지 반환', async () => {
      const response = await request(app)
        .post('/articles')
        .set('Cookie', 'access-token=invalid-token')
        .send({
          title: '테스트',
          content: '테스트',
        });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('유효하지 않은 토큰입니다.');
    });
  });

  describe('게시글 수정 API 테스트', () => {
    test('게시글 수정 요청 성공 > 200코드와 객체 반환', async () => {
      const response = await agent.patch(`/articles/${articleId}`).send({
        title: '게시글 수정 테스트',
        content: '게시글 수정 테스트',
      });
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        title: '게시글 수정 테스트',
        content: '게시글 수정 테스트',
        userId: 1,
      });
    });
    test('게시글 부분 수정 요청 성공 > 200코드와 객체 반환', async () => {
      const response = await agent.patch(`/articles/${articleId}`).send({
        title: '게시글 부분 수정 테스트',
      });
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        title: '게시글 부분 수정 테스트',
        content: '게시글 수정 테스트',
        userId: 1,
      });
    });
    test('비로그인 요청 > 401코드와 에러 메세지 반환', async () => {
      const response = await request(app)
        .patch(`/articles/${articleId}`)
        .set('Cookie', 'access-token=invalid-token')
        .send({
          title: '테스트',
          content: '테스트',
        });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('유효하지 않은 토큰입니다.');
    });
    test('수정할 게시글이 존재하지 않을 경우 > 404코드와 에러 메세지 반환', async () => {
      const articleId = 100;
      const response = await agent.patch(`/articles/${articleId}`).send({
        title: '게시글 수정 테스트',
        content: '게시글 수정 테스트',
      });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('정보를 찾을 수 없음');
    });
  });

  describe('게시글 삭제 API 테스트', () => {
    test('게시글 삭제 요청 성공 > 204코드 반환', async () => {
      const response = await agent.delete(`/articles/${articleId}`);
      expect(response.status).toBe(204);
    });
    test('비로그인 요청 > 401코드와 에러 메세지 반환', async () => {
      const response = await request(app)
        .delete(`/articles/${articleId}`)
        .set('Cookie', 'access-token=invalid-token');
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('유효하지 않은 토큰입니다.');
    });
    test('삭제할 게시글이 존재하지 않을 경우 > 404코드와 에러 메세지 반환', async () => {
      const articleId = 100;
      const response = await agent.delete(`/articles/${articleId}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('정보를 찾을 수 없음');
    });
  });
});
