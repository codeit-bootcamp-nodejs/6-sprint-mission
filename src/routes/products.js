// src/routes/products.js
import express from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../prisma.js';

import {
  validate,
  CreateProduct,
  PatchProduct,
  PurchaseProduct,
} from '../structs.js';

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

// GET /products
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { offset = 0, limit = 10, order = 'recent', q, tag } = req.query;

    const where = {
      ...(q && {
        OR: [
          { name: { contains: String(q), mode: 'insensitive' } },
          { description: { contains: String(q), mode: 'insensitive' } },
        ],
      }),
      ...(tag && { tags: String(tag) }),
    };

    const orderBy =
      order === 'recent' ? { createdAt: 'desc' } : { createdAt: 'asc' };

    const products = await prisma.product.findMany({
      where,
      orderBy,
      skip: Number(offset),
      take: Number(limit),
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
        createdAt: true,
        imagePath: true,
      },
    });
    res.send(products);
  })
);

// GET /products/:id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).send({ message: '정수가 아닌 id입니다.' });
    }

    const product = await prisma.product.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        stock: true,
        imagePath: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.send(product);
  })
);

// POST /products
router.post(
  '/',
  validate(CreateProduct),
  asyncHandler(async (req, res) => {
    const product = await prisma.product.create({
      data: req.body,
    });
    res.status(201).send(product);
  })
);

// PATCH /products/:id
router.patch(
  '/:id',
  validate(PatchProduct),
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).send({ message: '정수가 아닌 id입니다.' });
    }

    const product = await prisma.product.update({
      where: { id },
      data: req.body,
    });
    res.send(product);
  })
);

// DELETE /products/:id
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).send({ message: '정수가 아닌 id입니다.' });
    }

    await prisma.product.delete({
      where: { id },
    });
    res.sendStatus(204);
  })
);

router.post(
  '/purchase',
  validate(PurchaseProduct),
  asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    const product = await prisma.product.findUniqueOrThrow({
      where: { id: Number(productId) },
      select: { id: true, stock: true, price: true },
    });

    if (quantity > product.stock) {
      return res.status(400).send({ message: '재고가 충분하지 않습니다.' });
    }

    const result = await prisma.$transaction(async (pr) => {
      const updated = await pr.product.update({
        where: { id: product.id },
        data: { stock: { decrement: quantity } },
        select: { id: true, name: true, stock: true },
      });
      const purchase = await pr.purchase.create({
        data: {
          productId: product.id,
          quantity,
          unitPrice: product.price,
        },
      });
      return { updated, purchase };
    });
    res.status(201).send(result);
  })
);

export default router;
