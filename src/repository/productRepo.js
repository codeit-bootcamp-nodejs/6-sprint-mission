import prisma from '../lib/prismaClient.js';
import NotFoundError from '../middleware/errors/NotFoundError.js';

async function post(data) {
  return await prisma.product.create({ data });
}

async function patch(id, data) {
  return await prisma.product.update({ where: { id: Number(id) }, data });
}

async function erase(id) {
  return await prisma.product.delete({ where: { id: Number(id) } });
}

async function countById(id) {
  return await prisma.product.count({ where: { id: Number(id) } });
}

async function findById(id) {
  return await prisma.product.findUniqueOrThrow({ where: { id: Number(id) } });
}

async function getList(where, orderBy, offset, limit) {
  return await prisma.product.findMany({
    skip: parseInt(offset) || 0, // offset 방식 페이지네이션: default 0
    take: parseInt(limit) || 10, // default 10
    orderBy,
    where
  });
}

async function get(id) {
  return await prisma.product.findFirstOrThrow({
    where: { id: Number(id) },
    include: { comments: true }
  });
}

export default {
  post,
  patch,
  erase,
  findById,
  countById,
  getList,
  get
};
