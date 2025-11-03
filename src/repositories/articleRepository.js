export class ArticleRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  async createArticle(data) {
    return this.prisma.create({ data });
  }
  async patchArticle(id, data) {
    return this.prisma.update({ where: { id }, data });
  }
  async deleteArticle(id) {
    return this.prisma.delete({ where: { id } });
  }
  async findArticleById(id) {
    return this.prisma.findUnique({
      where: { id },
      include: { author: true, comments: true },
    });
  }
  async findArticles(findOptions) {
    return this.prisma.findMany(findOptions);
  }
}
