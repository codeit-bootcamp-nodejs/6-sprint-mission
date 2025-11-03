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
  const { id } = req.params;
  const product = await productService.findById(id);
  res.status(200).send(product);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await productService.delete(id);
  res.status(204).send();
};

export const getProductList = async (req, res) => {
  const {
    sort,
    category,
    status,
    keyword,
    limit: limitStr,
    offset: offsetStr,
  } = req.query;
  const limit = limitStr ? parseInt(limitStr, 10) : undefined;
  const offset = offsetStr ? parseInt(offsetStr, 10) : undefined;

  const products = await productService.find({
    sort,
    category,
    status,
    keyword,
    limit,
    offset,
  });
  res.status(200).send(products);
};
