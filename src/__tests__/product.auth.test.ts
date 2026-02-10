import request from 'supertest';
import { app } from '../app.js';
import prisma from '../config/prisma.js';
import { createUserWithToken, resetDb } from '../test/test-helpers.js';

describe('Product API (인증 필요)', () => {
  beforeAll(async () => {
    await resetDb();
  });

  test('POST /products 인증 없으면 거부', async () => {
    const res = await request(app).post('/products').send({
      name: 'auth product',
      description: 'desc',
      price: 1000,
      stock: 2,
      tags: 'NONE',
      imagePath: 'test.png',
    });

    expect(res.status).toBe(401);
  });

  test('POST /products 상품 생성', async () => {
    const { accessToken } = await createUserWithToken(
      'auth-product-create@example.com'
    );

    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'auth product',
        description: 'desc',
        price: 1000,
        stock: 2,
        tags: 'NONE',
        imagePath: 'test.png',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  test('PATCH /products/:id 상품 수정', async () => {
    const { user, accessToken } = await createUserWithToken(
      'auth-product-update@example.com'
    );
    const product = await prisma.product.create({
      data: {
        name: 'auth product',
        description: 'desc',
        price: 1000,
        stock: 2,
        tags: 'NONE',
        imagePath: 'test.png',
        userId: user.id,
      },
    });

    const res = await request(app)
      .patch(`/products/${product.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ price: 2000 });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
