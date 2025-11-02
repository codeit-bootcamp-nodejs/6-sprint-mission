import prisma from '../lib/prisma.js';
import { ProductRepository } from '../repositories/productRepository.js';
import { getTags, getImages } from '../lib/prismaUtil.js';

const productRepository = new ProductRepository(prisma);

export const productService = {
  create: async (productCreateData) => {
    const { tags, images, files, ...rest } = productCreateData;

    return prisma.$transaction(async (tx) => {
      const productData = {
        ...rest,
        tags: getTags(tags),
        images: getImages(files),
      };
      const newProduct = await productRepository.createProduct(productData, tx);
      return newProduct;
    });
  },
  update: async (id, productUpdateData) => {
    const { tags, images, files, ...rest } = productUpdateData;

    return prisma.$transaction(async (tx) => {
      const productData = {
        ...rest,
        tags: getTags(tags),
        images: getImages(files),
      };
      const updateProduct = await productRepository.patchProduct(
        id,
        productData,
        tx,
      );
      return updateProduct;
    });
  },
  delete: async (id) => {
    return productRepository.deleteProduct(id);
  },
  findById: async (id) => {
    return productRepository.findProductById(id);
  },
  find: async ({ sort, category, status, keyword, limit = 10, offset = 0 }) => {
    // const  = req.query;
    // const limit = parseInt(req.query.limit || 10, 10);
    // const offset = parseInt(req.query.offset || 10, 10);
    const select = {
      id: true,
      name: true,
      price: true,
      createdAt: true,
      status: true,
      category: true,
    };

    const sortOptions = {
      newest: { createdAt: 'desc' },
      oldest: { createdAt: 'asc' },
      priceHighest: { price: 'desc' },
      priceLowest: { price: 'asc' },
    };

    const where = {
      ...(category && { category }),
      ...(status && { status }),
      ...(keyword && {
        OR: [
          { name: { contains: keyword } },
          { description: { contains: keyword } },
        ],
      }),
    };

    const findOptions = {
      where,
      select,
      take: limit,
      skip: offset,
      orderBy: sortOptions[sort] || sortOptions.newest,
    };
    return productRepository.findProducts(findOptions);
  },
};
