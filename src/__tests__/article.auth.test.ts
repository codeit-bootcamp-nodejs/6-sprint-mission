import request from 'supertest';
import prisma from '../config/prisma.js';
import { app } from '../app.js';
import { createUserWithToken, resetDb } from '../test/test-helpers.js';

describe('Article API (인증 필요)', () => {
  beforeAll(async () => {
    await resetDb();
  });

  test('POST /articles 인증 없으면 거부', async () => {
    const res = await request(app).post('/articles').send({
      title: 'auth article',
      content: 'content',
    });

    expect(res.status).toBe(401);
  });

  test('POST /articles 게시글 생성', async () => {
    const { accessToken } = await createUserWithToken(
      'auth-article-create@example.com'
    );

    const res = await request(app)
      .post('/articles')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'auth article',
        content: 'content',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  test('PATCH /articles/:id 게시글 수정', async () => {
    const { user, accessToken } = await createUserWithToken(
      'auth-article-update@example.com'
    );
    const article = await prisma.article.create({
      data: {
        title: 'auth article',
        content: 'content',
        userId: user.id,
      },
    });

    const res = await request(app)
      .patch(`/articles/${article.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'updated title' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
