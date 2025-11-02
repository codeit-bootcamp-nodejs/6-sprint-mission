export class CommentRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  async createComment(data) {
    return this.prisma.create({ data });
  }
  async patchComment(id, data) {
    return this.prisma.update({ where: { id }, data });
  }
  async deleteComment(id) {
    return this.prisma.delete({ where: { id } });
  }
  async findCommentById(id) {
    return this.prisma.findUnique({ where: { id } });
  }
  async findComments(findOptions) {
    return this.prisma.findMany(findOptions);
  }
}
