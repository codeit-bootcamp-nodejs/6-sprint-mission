import express from 'express';
import { PrismaClient } from '@prisma/client';
import { validate } from '../middlewares/validation.js';
import { CreateArticle, PatchArticle } from '../structs.js';

const prisma = new PrismaClient();
const router = express.Router();

// 게시글 생성
router.post('/', validate(CreateArticle), async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const article = await prisma.article.create({
      data: { title, content },
      include: { articleComments: true },
    });
    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
});

// 게시글 상세 조회 (댓글 포함)
router.get('/:id', async (req, res, next) => {
  try {
    const article = await prisma.article.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        articleComments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (err) {
    next(err);
  }
});

// 게시글 수정
router.patch('/:id', validate(PatchArticle), async (req, res, next) => {
  try {
    const article = await prisma.article.update({
      where: { id: Number(req.params.id) },
      data: req.body,
      include: { articleComments: true },
    });
    res.json(article);
  } catch (err) {
    next(err);
  }
});

// 게시글 삭제
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.article.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// 게시글 목록 조회 (offset 방식 페이지네이션 + 검색 + 댓글 포함)
router.get('/', async (req, res, next) => {
  try {
    const { offset = 0, limit = 10, search, sort = 'desc' } = req.query;
    const articles = await prisma.article.findMany({
      skip: Number(offset),
      take: Number(limit),
      where: search
        ? { OR: [{ title: { contains: search } }, { content: { contains: search } }] }
        : undefined,
      orderBy: { createdAt: sort },
      include: {
        articleComments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    res.json(articles);
  } catch (err) {
    next(err);
  }
});

export default router;
