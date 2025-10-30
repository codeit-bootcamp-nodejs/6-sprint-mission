// src/routes/articles.js
import express from 'express';
import { Prisma } from '@prisma/client';
import { validate, CreateArticle, PatchArticle } from '../structs.js';
import { prisma } from '../prisma.js';

const router = express.Router();

//------------------------------------------

function asyncHandler(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (e) {
      if (
        e.name === 'StructError' ||
        e instanceof Prisma.PrismaClientValidationError
      ) {
        return res.status(400).send({ message: e.message });
      }
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        return res.sendStatus(404);
      }
      return res.status(500).send({ message: e.message });
    }
  };
}

//------------------------------------------

// GET /articles
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10, order = 'recent', q } = req.query;

    const where = q
      ? {
          OR: [
            { title: { contains: String(q), mode: 'insensitive' } },
            { content: { contains: String(q), mode: 'insensitive' } },
          ],
        }
      : {};

    const orderBy =
      order === 'recent' ? { createdAt: 'desc' } : { createdAt: 'asc' };

    const articles = await prisma.article.findMany({
      where,
      orderBy,
      skip: Number(offset),
      take: Number(limit),
      select: { id: true, title: true, content: true, createdAt: true },
    });
    res.send(articles);
  })
);

// GET /articles/:id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).send({ message: '정수가 아닌 id입니다.' });
    }

    const article = await prisma.article.findUniqueOrThrow({
      where: { id },
      select: {
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.send(article);
  })
);

// POST /articles
router.post(
  '/',
  validate(CreateArticle),
  asyncHandler(async (req, res) => {
    const article = await prisma.article.create({
      data: req.body,
    });
    res.status(201).send(article);
  })
);

// PATCH /articles/:id
router.patch(
  '/:id',
  validate(PatchArticle),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).send({ message: '정수가 아닌 id입니다.' });
    }

    const article = await prisma.article.update({
      where: { id },
      data: req.body,
    });
    res.send(article);
  })
);

// DELETE /articles/:id
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).send({ message: '정수가 아닌 id입니다.' });
    }

    const article = await prisma.article.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

export default router;
