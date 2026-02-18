import request from 'supertest';
import app from '../src/app';
import { prisma } from '../src/utils/prismaClient';
import bcrypt from 'bcrypt';

describe('로그인 및 회원가입 API 통합 테스트', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
    const hashedPassword = await bcrypt.hash('password123', 10);
    await prisma.user.create({
      data: {
        email: 'user1@example.com',
        password: hashedPassword,
        name: 'test',
        nickname: 'test',
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });
  describe('회원가입 요청 API 테스트', () => {
    test('회원가입 요청 성공 > 201코드와 객체 반환', async () => {
      const response = await request(app).post('/auth/register').send({
        name: '김민주',
        email: 'test@example.com',
        password: 'testpassword',
        nickname: 'user3',
      });
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        email: 'test@example.com',
        nickname: 'user3',
        name: '김민주',
      });
      await prisma.user.delete({ where: { id: response.body.id } });
    });
    test('필수 요소 없이 요청 > 400코드와 에러 메시지 반환', async () => {
      const response = await request(app).post('/auth/register').send({
        name: '김민주',
        email: 'test@example.com',
        nickname: 'user3',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('전달 사항을 조건에 맞춰 수정해주세요');
    });
    test('이미 존재하는 이메일로 요청 > 400코드와 에러 메시지 반환', async () => {
      const response = await request(app).post('/auth/register').send({
        name: '김민주',
        email: 'user1@example.com',
        password: 'testpassword',
        nickname: 'user3',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('이미 사용중인 이메일 또는 닉네임 입니다.');
    });
  });
  describe('로그인 요청 API 테스트', () => {
    test('로그인 요청 성공 > 200코드, 성공 메세지, 토큰 반환', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'user1@example.com',
        password: 'password123',
      });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe(`${response.body.message}`);
      expect(response.header['set-cookie'][0]).toContain('access-token');
      expect(response.header['set-cookie'][1]).toContain('refresh-token');
    });
    test('필수 요소 없이 요청 > 400코드와 에러 메시지 반환', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'user1@example.com',
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('전달 사항을 조건에 맞춰 수정해주세요');
    });
    test('존재하지 않는 이메일로 요청 > 401코드와 에러 메시지 반환', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'user456@example.com',
        password: 'password123',
      });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('존재하지 않는 이메일 입니다.');
    });
    test('일치하지 않은 비밀번호로 요청 > 401코드와 에러 메시지 반환', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'user1@example.com',
        password: 'password456',
      });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe('이메일 또는 비밀번호가 일치하지 않습니다.');
    });
  });
});
