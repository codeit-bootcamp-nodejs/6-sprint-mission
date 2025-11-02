import prisma from '../lib/prisma.js';
import { productService } from '../services/productService.js';
import { getTags, getImages } from '../lib/prismaUtil.js';

export const createProduct = async (req, res) => {
  const product = await productService.create({
    ...req.body,
    files: req.files,
  });
  res.status(201).send(product);
};

export const patchProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productService.update(id, {
    ...req.body,
    files: req.files,
  });
  res.status(200).send(product);
};

export const getProductDetail = async (req, res) => {
  const id = req.params.id;
  const product = await productService.findById(id);
  res.status(200).send(product);
};

export const getProductList = async (req, res) => {
  const { sort = 'newest', category, status, keyword = '' } = req.query;
  const limit = parseInt(req.query.limit || 10, 10);
  const offset = parseInt(req.query.offset || 10, 10);
  const select = {
    id: true,
    name: true,
    price: true,
    createdAt: true,
  };

  const sortOptions = {
    newest: { createdAt: 'desc' },
    oldest: { createdAt: 'asc' },
    priceHighest: { price: 'desc' },
    priceLowest: { price: 'asc' },
  };

  const whereClause = {
    ...(category && { category }),
    ...(status && { status }),
  };

  const findOptions = {
    take: limit,
    orderBy: sortOptions[sort] || sortOptions.newest,
    ...(keyword && {
      where: {
        OR: [
          { name: { contains: keyword } },
          { description: { contains: keyword } },
        ],
      },
      select,
    }),
    ...(!keyword &&
      offset && {
        where: whereClause,
        skip: offset,
        select,
      }),
  };
  const products = await productService.find(findOptions);
  res.status(200).send(products);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await productService.delete(id);
  res.status(204).send();
};
