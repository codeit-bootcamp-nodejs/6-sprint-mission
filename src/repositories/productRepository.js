export class ProductRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  async createProduct(data, tx) {
    const db = tx || this.prisma;
    return db.product.create({ data, include: { tags: true, images: true } });
  }
  async patchProduct(id, data, tx) {
    const db = tx || this.prisma;
    return db.product.update({
      where: { id },
      data,
      include: { tags: true, images: true },
    });
  }
  async deleteProduct(id, tx) {
    const db = tx || this.prisma;
    return db.product.delete({ where: { id } });
  }
  async findProductById(id) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        tags: true,
        images: true,
        comments: true,
      },
    });
  }
  async findProducts(findOptions) {
    return this.prisma.product.findMany(findOptions);
  }
}
