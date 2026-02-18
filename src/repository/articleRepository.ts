import { prisma } from '../utils/prismaClient';
import { Prisma } from '@prisma/client';

export class ArticleRepository {
  async findMany(options: Prisma.ArticleFindManyArgs) {
    return prisma.article.findMany(options);
  }
  async create(data: Prisma.ArticleCreateInput) {
    return prisma.article.create({
      data,
      select: {
        id: true,
        title: true,
        content: true,
        updatedAt: true,
        userId: true,
        articleImages: { select: { id: true, url: true } },
      },
    });
  }
  async findUniqueOrThrow<T extends Prisma.ArticleFindUniqueOrThrowArgs>(
    options: Prisma.SelectSubset<T, Prisma.ArticleFindUniqueOrThrowArgs>,
  ) {
    return prisma.article.findUniqueOrThrow(options);
  }
  async update(id: number, data: Prisma.ArticleUpdateInput) {
    return prisma.article.update({
      where: { id },
      data,
      select: {
        id: true,
        title: true,
        content: true,
        updatedAt: true,
        userId: true,
        articleImages: { select: { id: true, url: true } },
      },
    });
  }
  async delete(option: Prisma.ArticleDeleteArgs) {
    return prisma.article.delete(option);
  }
  async deleteImages(ids: number[]) {
    return prisma.articleImage.deleteMany({
      where: { id: { in: ids } },
    });
  }
  async createImages(data: Prisma.ArticleImageCreateManyInput[]) {
    return prisma.articleImage.createMany({
      data,
    });
  }
}
