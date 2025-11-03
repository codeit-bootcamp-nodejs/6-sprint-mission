import express from 'express';
import { PrismaClient } from '@prisma/client';
import { validate } from '../middlewares/validation.js';
import { CreateProduct, PatchProduct } from '../structs.js';
import { upload } from '../middlewares/upload.js';

const prisma = new PrismaClient();
const router = express.Router();

// 상품 생성
router.post('/', upload.array('images'), validate(CreateProduct), async (req, res, next) => {
  try {
    const { name, description, price, tags } = req.body;

    const parsedTags =
      typeof tags === 'string'
        ? tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : tags;

    const product = await prisma.product.create({
      data: { name, description, price: Number(price), tags: parsedTags || [] },
      include: { images: true, productComments: true },
    });

    // 이미지 저장
    if (req.files) {
      for (const file of req.files) {
        await prisma.image.create({
          data: { url: `/uploads/${file.filename}`, productId: product.id },
        });
      }
    }

    const fullProduct = await prisma.product.findUnique({
      where: { id: product.id },
      include: { images: true, productComments: true },
    });

    res.status(201).json(fullProduct);
  } catch (err) {
    next(err);
  }
});

// 상품 상세 조회 (이미지 + 댓글 포함)
router.get('/:id', async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        images: true,
        productComments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// 상품 수정
router.patch('/:id', validate(PatchProduct), async (req, res, next) => {
  try {
    const { tags } = req.body;
    const parsedTags =
      typeof tags === 'string'
        ? tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : tags;

    const product = await prisma.product.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body, ...(parsedTags ? { tags: parsedTags } : {}) },
      include: { images: true, productComments: true },
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// 상품 삭제
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.product.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// 상품 목록 조회 (페이지네이션, 검색 가능, 이미지 + 댓글 포함)
router.get('/', async (req, res, next) => {
  try {
    const { offset = 0, limit = 10, search, sort = 'desc' } = req.query;
    const products = await prisma.product.findMany({
      skip: Number(offset),
      take: Number(limit),
      where: search
        ? { OR: [{ name: { contains: search } }, { description: { contains: search } }] }
        : undefined,
      orderBy: { createdAt: sort },
      include: {
        images: true,
        productComments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

export default router;
