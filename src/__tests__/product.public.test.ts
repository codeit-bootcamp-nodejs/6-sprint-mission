import request from 'supertest';
import { Tag } from '@prisma/client';
import { app } from '../app.js';
import prisma from '../config/prisma.js';
import { createUserWithToken, resetDb } from '../test/test-helpers.js';

describe('Product API (public)', () => {
  beforeAll(async () => {
    await resetDb();
  });

  test('GET /products 상품 목록', async () => {
    const res = await request(app).get('/products');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /products/:id 상품 상세 조회', async () => {
    const { user } = await createUserWithToken('public-product@example.com');
    const product = await prisma.product.create({
      data: {
        name: 'public product',
        description: 'desc',
        price: 1000,
        stock: 3,
        tags: Tag.NONE,
        imagePath: 'test.png',
        userId: user.id,
      },
    });

    const res = await request(app).get(`/products/${product.id}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(product.id);
  });
});
