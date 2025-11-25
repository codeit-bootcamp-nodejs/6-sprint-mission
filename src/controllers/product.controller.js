import prisma from '../lib/prisma.js';
import { getOrderBy } from '../lib/utils.js';

//POST==========
const createProduct = async (req, res, next) => {
  const inputData = req.body;

  const productData = await prisma.product.create({
    data: inputData,
    include: {
      seller: {
        select: { id: true, nickname: true, email: true },
      },
    },
  });

  const responseData = {
    id: productData.id,
    status: productData.status,
    productName: productData.name,
    description: productData.description,
    price: productData.price,
    tags: productData.tags,
    sellerName: productData.seller.nickname,
    sellerId: productData.seller.id,
    email: productData.seller.email,
    createdAt: productData.createdAt,
    updatedAt: productData.updatedAt,
  };

  return res.status(201).json(responseData);
};

//GET==========
const getListProducts = async (req, res, next) => {
  const { offset = 0, limit = 10, order = 'recent', search } = req.query;

  //포함 검색
  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } }, // 대소문자 구분없음 mode: 'insensitive'
          { description: { contains: search, mode: 'insensitive' } },
          { seller: { nickname: { contains: search, mode: 'insensitive' } } },
        ],
      }
    : undefined;

  const [productData, totalCount] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: getOrderBy(order),
      skip: parseInt(offset),
      take: parseInt(limit),
      include: {
        seller: { select: { id: true, nickname: true, email: true } },
      },
    }),

    //파모 '총 50건 중 1~10건 표시' 같은거하려면 50건 구하는걸 해야됨 (페이지네이션)
    prisma.product.count({ where }),
  ]);

  const responseData = productData.map((product) => {
    const seller = product.seller || {};

    return {
      id: product.id,
      status: product.status,
      productName: product.name,
      description: product.description,
      price: product.price,
      tags: product.tags,
      sellerName: seller.nickname,
      sellerId: product.sellerId,
      email: seller.email,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      // favoriteCount: 0 // 나중에 기능 구현하면 넣기
    };
  });

  return res.status(200).json({ totalCount: totalCount, list: responseData });
};

//GET id==========
const getProductById = async (req, res, next) => {
  const { productId } = req.params;

  const productData = await prisma.product.findUniqueOrThrow({
    where: { id: productId },
    include: {
      seller: { select: { id: true, nickname: true, email: true } },
    },
  });

  const responseData = {
    id: productData.id,
    status: productData.status,
    productName: productData.name,
    description: productData.description,
    price: productData.price,
    tags: productData.tags,
    sellerName: productData.seller.nickname,
    sellerId: productData.seller.id,
    email: productData.seller.email,
    createdAt: productData.createdAt,
    updatedAt: productData.updatedAt,
  };

  return res.status(200).json(responseData);
};

//PATCH id==========
const patchProductById = async (req, res, next) => {
  const { productId } = req.params;
  const inputData = req.body;

  const newPatchData = await prisma.product.update({
    where: { id: productId },
    data: inputData,
    include: {
      seller: { select: { id: true, nickname: true, email: true } },
    },
  });

  const responseData = {
    id: newPatchData.id,
    status: newPatchData.status,
    productName: newPatchData.name,
    description: newPatchData.description,
    price: newPatchData.price,
    tags: newPatchData.tags,
    sellerName: newPatchData.seller.nickname,
    sellerId: newPatchData.seller.id,
    email: newPatchData.seller.email,
    createdAt: newPatchData.createdAt,
    updatedAt: newPatchData.updatedAt,
  };
  res.status(200).json(responseData);
};

//DELETE id==========
const deleteProductById = async (req, res, next) => {
  const { productId } = req.params;

  await prisma.product.delete({
    where: { id: productId },
  });
  res.status(200).json({ message: '제품 삭제 성공' });
};

export { createProduct, getListProducts, getProductById, patchProductById, deleteProductById };
