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
  find: async (findOptions) => {
    return articleRepository.findArticles(findOptions);
  },
};
