import prisma from '../lib/prisma.js';
import { getOrderBy } from '../lib/utils.js';

//POST==========
const createProduct = async (req, res, next) => {
  const { id: sellerId } = req.user; //토큰에서 ID 꺼내기 (로그인 한 사람만 가능하니까)
  const inputData = req.body;

  const productData = await prisma.product.create({
    data: { ...inputData, sellerId },
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
  const { id: userId } = req.user;
  const { productId } = req.params;
  const inputData = req.body;

  // 1. 상품이 존재하는지, 누가 주인인지 확인
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: productId },
  });

  // 2. 본인 확인 (작성자 본인의 상품이 아니라면 return 403)
  if (product.sellerId !== userId) {
    return res.status(403).json({ message: '수정 권한이 없습니다.' });
  }

  // 3. 마침내 상품 업데이트
  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: inputData,
    include: { seller: { select: { id: true, nickname: true, email: true } } },
  });

  const responseData = {
    id: updatedProduct.id,
    status: updatedProduct.status,
    productName: updatedProduct.name,
    description: updatedProduct.description,
    price: updatedProduct.price,
    tags: updatedProduct.tags,
    sellerName: updatedProduct.seller.nickname,
    sellerId: updatedProduct.seller.id,
    email: updatedProduct.seller.email,
    createdAt: updatedProduct.createdAt,
    updatedAt: updatedProduct.updatedAt,
  };
  res.status(200).json(responseData);
};

//DELETE id==========
const deleteProductById = async (req, res, next) => {
  const { id: userId } = req.user;
  const { productId } = req.params;

  // 1. 상품이 존재하는지, 누가 주인인지 확인
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: productId },
  });

  // 2. 본인 확인 (작성자 본인의 상품이 아니라면 return 403)
  if (product.sellerId !== userId) {
    return res.status(403).json({ message: '삭제 권한이 없습니다.' });
  }

  //3. 상품 삭제하기
  await prisma.product.delete({
    where: { id: productId },
  });

  return res.status(200).json({ message: '제품 삭제 성공' });
};

export { createProduct, getListProducts, getProductById, patchProductById, deleteProductById };
