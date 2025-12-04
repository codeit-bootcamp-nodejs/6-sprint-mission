import prisma from '../lib/prismaClient.js';

async function getList() {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: { imageUrls: false, updatedAt: false }
  });
}

async function create(data) {
  return await prisma.user.create({ data });
}

async function findByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}

async function findById(id) {
  return await prisma.user.findUniqueOrThrow({
    where: { id },
    include: {
      products: true,
      articles: true,
      comments: true,
      likedProducts: true,
      likedArticles: true
    }
  });
}

async function patch(id, userData) {
  return prisma.user.update({
    where: { id },
    data: userData
  });
}

async function getProducts(userId) {
  return prisma.product.findMany({
    where: { userId }
  });
}

async function getArticles(userId) {
  return prisma.article.findMany({
    where: { userId }
  });
}

export default {
  getList,
  create,
  patch,
  findByEmail,
  findById,
  getProducts,
  getArticles
};
