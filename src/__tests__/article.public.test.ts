import request from 'supertest';
import { app } from '../app.js';
import prisma from '../config/prisma.js';
import { createUserWithToken, resetDb } from '../test/test-helpers.js';

describe('Article API (public)', () => {
  beforeAll(async () => {
    await resetDb();
  });

  test('GET /articles 게시글 목록', async () => {
    const res = await request(app).get('/articles');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /articles/:id 게시글 상세 조회', async () => {
    const { user } = await createUserWithToken('public-article@example.com');
    const article = await prisma.article.create({
      data: {
        title: 'public article',
        content: 'content',
        userId: user.id,
      },
    });

    const res = await request(app).get(`/articles/${article.id}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(article.id);
  });
});
