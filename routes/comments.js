import express from 'express';
import { PrismaClient } from '@prisma/client';
import { validate } from '../middlewares/validation.js';
import { CreateComment, PatchComment } from '../structs.js';

const prisma = new PrismaClient();
const router = express.Router();

// 상품 댓글

router.post('/product/:productId', validate(CreateComment), async (req, res, next) => {
  try {
    const { content } = req.body;
    const comment = await prisma.productComment.create({
      data: { content, productId: Number(req.params.productId) },
    });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});

router.patch('/product/:id', validate(PatchComment), async (req, res, next) => {
  try {
    const comment = await prisma.productComment.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(comment);
  } catch (err) {
    next(err);
  }
});

router.delete('/product/:id', async (req, res, next) => {
  try {
    await prisma.productComment.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// 상품 댓글 목록 조회 (커서 방식 페이지네이션)
router.get('/product/:productId', async (req, res, next) => {
  try {
    const { lastId, limit = 10 } = req.query;
    const comments = await prisma.productComment.findMany({
      where: { productId: Number(req.params.productId) },
      take: Number(limit),
      skip: lastId ? 1 : 0,
      ...(lastId ? { cursor: { id: Number(lastId) } } : {}),
      orderBy: { createdAt: 'desc' },
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

// 게시글 댓글
router.post('/article/:articleId', validate(CreateComment), async (req, res, next) => {
  try {
    const { content } = req.body;
    const comment = await prisma.articleComment.create({
      data: { content, articleId: Number(req.params.articleId) },
    });
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
});

router.patch('/article/:id', validate(PatchComment), async (req, res, next) => {
  try {
    const comment = await prisma.articleComment.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.json(comment);
  } catch (err) {
    next(err);
  }
});

router.delete('/article/:id', async (req, res, next) => {
  try {
    await prisma.articleComment.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// 게시글 댓글 목록 조회 (커서 방식 페이지네이션)
router.get('/article/:articleId', async (req, res, next) => {
  try {
    const { lastId, limit = 10 } = req.query;
    const comments = await prisma.articleComment.findMany({
      where: { articleId: Number(req.params.articleId) },
      take: Number(limit),
      skip: lastId ? 1 : 0,
      ...(lastId ? { cursor: { id: Number(lastId) } } : {}),
      orderBy: { createdAt: 'desc' },
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

export default router;
