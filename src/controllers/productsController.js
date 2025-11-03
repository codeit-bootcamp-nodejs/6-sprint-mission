import { prisma } from '../lib/prismaClient.js';
import { BadRequestError, NotFoundError } from '../lib/errors/index.js';

export const createProduct = async (req, res) => {
  const { name, description, price, tags } = req.body;
  if (!name || !description || price == null) throw new BadRequestError('name/description/price required');
  const p = await prisma.product.create({
    data: { name, description, price: Math.floor(Number(price)), tags: tags || [] }
  });
  res.status(201).json(p);
};

export const getProduct = async (req, res) => {
  const id = Number(req.params.id);
  const p = await prisma.product.findUnique({ where: { id } });
  if (!p) throw new NotFoundError('Product not found');
  res.json(p);
};

export const updateProduct = async (req, res) => {
  const id = Number(req.params.id);
  const data = {};
  ['name','description','price','tags','imageUrl'].forEach(k => {
    if (req.body[k] !== undefined) data[k] = req.body[k];
  });
  const updated = await prisma.product.update({ where: { id }, data });
  res.json(updated);
};

export const deleteProduct = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.product.delete({ where: { id } });
  res.status(204).send();
};

export const listProducts = async (req, res) => {
  const { offset = 0, limit = 10, sort = 'recent', q } = req.query;
  const take = Math.min(Number(limit)||10, 50);
  const skip = Number(offset)||0;
  const where = q ? { OR: [{ name: { contains: q } }, { description: { contains: q } }] } : {};
  const orderBy = sort === 'recent' ? { createdAt: 'desc' } : { id: 'asc' };
  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      select: { id: true, name: true, price: true, createdAt: true },
      skip,
      take,
      orderBy
    }),
    prisma.product.count({ where })
  ]);
  res.json({ total, items });
};
