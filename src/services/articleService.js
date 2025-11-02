import prisma from '../lib/prisma.js';
import { ArticleRepository } from '../repositories/articleRepository.js';

const articleRepository = new ArticleRepository(prisma.article);

export const articleService = {
  create: async (data) => {
    return articleRepository.createArticle(data);
  },
  update: async (id, data) => {
    return articleRepository.patchArticle(id, data);
  },
  delete: async (id) => {
    return articleRepository.deleteArticle(id);
  },
  findById: async (id) => {
    return articleRepository.findArticleById(id);
  },
  find: async ({ sort, keyword = '', limit = 10, offset = 10 }) => {
    const select = {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      price: true,
    };

    const sortOptions = {
      newest: { createdAt: 'desc' },
      oldest: { createdAt: 'asc' },
      priceHighest: { price: 'desc' },
      priceLowest: { price: 'asc' },
    };

    const where = keyword
      ? {
          OR: [
            { title: { contains: keyword } },
            { content: { contains: keyword } },
          ],
        }
      : undefined;

    const findOptions = {
      where,
      select,
      take: limit,
      skip: offset,
      orderBy: sortOptions[sort] || sortOptions.newest,
    };

    return articleRepository.findArticles(findOptions);
  },
};
