import { prisma } from '../lib/prismaClient.js';
import { BadRequestError, NotFoundError } from '../lib/errors/index.js';

export const createArticle = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) throw new BadRequestError('title/content required');
  const a = await prisma.article.create({ data: { title, content } });
  res.status(201).json(a);
};

export const getArticle = async (req, res) => {
  const id = Number(req.params.id);
  const a = await prisma.article.findUnique({ where: { id }});
  if (!a) throw new NotFoundError('Article not found');
  res.json(a);
};

export const updateArticle = async (req, res) => {
  const id = Number(req.params.id);
  const data = {};
  ['title','content'].forEach(k => { if (req.body[k] !== undefined) data[k] = req.body[k]; });
  const updated = await prisma.article.update({ where: { id }, data });
  res.json(updated);
};

export const deleteArticle = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.article.delete({ where: { id } });
  res.status(204).send();
};

export const listArticles = async (req, res) => {
  const { offset = 0, limit = 10, sort = 'recent', q } = req.query;
  const take = Math.min(Number(limit)||10, 50);
  const skip = Number(offset)||0;
  const where = q ? { OR: [{ title: { contains: q } }, { content: { contains: q } }] } : {};
  const orderBy = sort === 'recent' ? { createdAt: 'desc' } : { id: 'asc' };
  const [items, total] = await Promise.all([
    prisma.article.findMany({
      where,
      select: { id: true, title: true, content: true, createdAt: true },
      skip,
      take,
      orderBy
    }),
    prisma.article.count({ where })
  ]);
  res.json({ total, items });
};
