import request from 'supertest';
import { app } from '../app.js';
import { resetDb } from '../test/test-helpers.js';

describe('Auth API', () => {
  beforeAll(async () => {
    await resetDb();
  });

  test('POST /users/register 회원가입', async () => {
    const res = await request(app).post('/users/register').send({
      email: 'auth-register@example.com',
      password: 'password1234',
      nickname: 'tester',
      image: null,
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe('auth-register@example.com');
  });

  test('POST /users/login 로그인', async () => {
    await request(app).post('/users/register').send({
      email: 'auth-login@example.com',
      password: 'password1234',
      nickname: 'tester',
      image: null,
    });

    const res = await request(app).post('/users/login').send({
      email: 'auth-login@example.com',
      password: 'password1234',
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    const setCookieHeader = res.headers['set-cookie'];
    const cookies = Array.isArray(setCookieHeader)
      ? setCookieHeader
      : setCookieHeader
      ? [setCookieHeader]
      : [];
    expect(cookies.join(';')).toContain('accessToken=');
    expect(cookies.join(';')).toContain('refreshToken=');
  });
});
