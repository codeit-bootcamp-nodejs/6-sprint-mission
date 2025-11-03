export class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  async createUser(data, options) {
    return this.prisma.create({ data, ...options });
  }
  async patchUser(id, data, options) {
    return this.prisma.update({ where: { id }, data, ...options });
  }
  async deleteUser(id) {
    return this.prisma.delete({ where: { id } });
  }
  async findUserById(id) {
    return this.prisma.findUnique({
      where: { id },
    });
  }
  async findUsers(findOptions) {
    return this.prisma.findMany(findOptions);
  }
}
