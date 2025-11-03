import { prisma } from '../lib/prismaClient.js';
import { BadRequestError, NotFoundError } from '../lib/errors/index.js';

export const createCommentForProduct = async (req, res) => {
  const productId = Number(req.params.productId);
  const { content } = req.body;
  if (!content) throw new BadRequestError('content required');

  const prod = await prisma.product.findUnique({ where: { id: productId } });
  if (!prod) throw new NotFoundError('Product not found');
  const c = await prisma.comment.create({ data: { content, productId } });
  res.status(201).json(c);
};

export const createCommentForArticle = async (req, res) => {
  const articleId = Number(req.params.articleId);
  const { content } = req.body;
  if (!content) throw new BadRequestError('content required');
  const art = await prisma.article.findUnique({ where: { id: articleId } });
  if (!art) throw new NotFoundError('Article not found');
  const c = await prisma.comment.create({ data: { content, articleId } });
  res.status(201).json(c);
};

export const updateComment = async (req, res) => {
  const id = Number(req.params.id);
  const { content } = req.body;
  if (!content) throw new BadRequestError('content required');
  const updated = await prisma.comment.update({
    where: { id },
    data: { content },
  });
  res.json(updated);
};

export const deleteComment = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.comment.delete({ where: { id } });
  res.status(204).send();
};

export const listCommentsForProduct = async (req, res) => {
  const productId = Number(req.params.productId);
  const { cursor, limit = 10 } = req.query;
  const take = Math.min(Number(limit) || 10, 50);
  const where = { productId };

  const items = await prisma.comment.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: Number(cursor) } : undefined,
    select: { id: true, content: true, createdAt: true },
  });
  res.json({ items });
};

export const listCommentsForArticle = async (req, res) => {
  const articleId = Number(req.params.articleId);
  const { cursor, limit = 10 } = req.query;
  const take = Math.min(Number(limit) || 10, 50);
  const items = await prisma.comment.findMany({
    where: { articleId },
    orderBy: { createdAt: 'desc' },
    take,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: Number(cursor) } : undefined,
    select: { id: true, content: true, createdAt: true },
  });
  res.json({ items });
};
