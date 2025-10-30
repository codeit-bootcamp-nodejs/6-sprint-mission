// src/productComments.js
import express from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../prisma.js';

const router = express.Router();

//------------------------------------------

function asyncHandler(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      )
        return res.sendStatus(404);
      return res.status(500).send({ message: e.message });
    }
  };
}

//------------------------------------------

// GET /comment:id
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const productId = Number(req.query.productId);
    if (!Number.isInteger(productId)) {
      return res.status(400).send({ message: '정수가 아닌 id입니다.' });
    }
    const comments = await prisma.productComment.findMany({
      where: { productId },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    });
    res.send(comments);
  })
);

// POST /comment:id
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { productId, content } = req.body;
    if (!Number.isInteger(Number(productId)) || !content)
      return res
        .status(400)
        .send({ message: 'id가 잘못되었거나 댓글 내용이 없습니다.' });
    const row = await prisma.productComment.create({
      data: { productId: Number(productId), content },
    });
    res.status(201).send(row);
  })
);

// PATCH /comment/:id
router.patch(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id))
      return res.status(400).send({ message: '정수가 아닌 id입니다.' });
    const row = await prisma.productComment.update({
      where: { id },
      data: { content: req.body.content },
    });
    res.send(row);
  })
);

// DELETE /comment/:id
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id))
      return res.status(400).send({ message: '정수가 아닌 id입니다.' });
    await prisma.productComment.delete({ where: { id } });
    res.sendStatus(204);
  })
);

export default router;
