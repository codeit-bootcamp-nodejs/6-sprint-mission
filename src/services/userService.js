import prisma from '../lib/prisma.js';
import { getFullName } from '../lib/prismaUtil.js';
import { UserRepository } from '../repositories/userRepository.js';

const userRepository = new UserRepository(prisma.user);

export const userService = {
  create: async (userData) => {
    const { userPreference, ...rest } = userData;
    const data = {
      ...rest,
      fullName: getFullName(rest.firstName, rest.lastName),
      userPreference: {
        create: userPreference,
      },
    };
    const options = {
      include: { userPreference: true },
    };
    return userRepository.createUser(data, options);
  },
  update: async (id, userData) => {
    const { userPreference, ...rest } = userData;
    const data = {
      ...rest,
      fullName: getFullName(rest.firstName, rest.lastName),
      userPreference: {
        create: userPreference,
      },
    };
    const options = {
      include: { userPreference: true },
    };
    return userRepository.patchUser(id, data, options);
  },
  delete: async (id) => {
    return userRepository.deleteUser(id);
  },
  findById: async (id) => {
    return userRepository.findUserById(id);
  },
  find: async (query) => {
    const { name, email } = query;
    const findOptions = {
      ...(name && {
        where: { fullName: { contains: name, mode: 'insensitive' } },
      }),
      ...(email && {
        where: { email: { contains: email, mode: 'insensitive' } },
      }),
      include: { userPreference: true },
    };
    return userRepository.findUsers(findOptions);
  },
};
