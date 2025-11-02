import prisma from '../lib/prisma.js';
import { getFullName } from '../lib/prismaUtil.js';

export const createUser = async (req, res) => {
  const { userPreference, ...rest } = req.body;
  const userData = {
    fullName: getFullName(rest.firstName, rest.lastName),
    userPreference,
    ...rest,
  };

  const user = await prisma.user.create({
    data: {
      ...rest,
      fullName: getFullName(rest.firstName, rest.lastName),
      userPreference: {
        create: userPreference,
      },
    },
    include: {
      userPreference: true,
    },
  });
  res.status(201).send(user);
};

export const patchUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, userPreference, ...rest } = req.body;
  const userData = {
    fullName: getFullName(rest.firstName, rest.lastName),
    userPreference: { update: userPreference },
    ...rest,
  };

  const user = await prisma.user.update({
    where: { id },
    data: userData,
    include: {
      userPreference: true,
    },
  });
  res.status(200).send(user);
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  res.status(200).send(user);
};

export const getSearchUser = async (req, res) => {
  const { name, email } = req.query;
  const findOptions = { include: { userPreference: true } };

  if (name && name.length > 0) {
    findOptions.where = {
      fullName: { contains: name, mode: 'insensitive' },
    };
    const searchName = await prisma.user.findMany(findOptions);
    res.send(searchName);
  } else if (email && email.length > 0) {
    findOptions.where = {
      email: {
        contains: email,
        mode: 'insensitive',
      },
    };
    const searchEmail = await prisma.user.findMany(findOptions);
    res.status(200).send(searchEmail);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: { id },
  });
  res.status(204).send();
};
