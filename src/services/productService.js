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
  find: async (findOptions) => {
    return productRepository.findProducts(findOptions);
  },
};
