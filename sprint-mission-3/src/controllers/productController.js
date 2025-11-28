import prisma from '../lib/prismaClient.js';
/**
 200 OK: 일반적인 성공 (GET, UPDATE 후)
 201 Created: 새로운 리소스 생성 성공 (POST)
 204 No Content: 성공했지만 돌려줄 데이터가 없음 (DELETE)
 400 Bad Request: 클라이언트 요청 오류 (유효성 검사 실패 등)
 404 Not Found: 요청한 리소스가 없음
 */

//POST==========
const createProduct = async (req, res, next) => {
  try {
    const inputData = req.body;
    // const { name, description, price, tags } = req.body;
    const productData = await prisma.product.create({
      data: inputData,
    });
    res.status(201).send({ message: '상품이 안전하게 등록되었습니다.', data: productData });
  } catch (error) {
    return next(error);
  }
};

//GET==========
const getListProducts = async (req, res, next) => {
  try {
    const { offset = 0, limit = 0, order = 'recent', search } = req.query;

    //포함 검색
    const where = search
      ? {
          OR: [{ name: { contains: search } }, { description: { contains: search } }],
        }
      : undefined;

    //최신순 정렬
    let orderBy;
    switch (order) {
      case 'recent': {
        orderBy = { createdAt: 'desc' };
        break;
      }
      case 'oldest': {
        orderBy = { createdAt: 'asc' };
        break;
      }
      default:
        orderBy = { createdAt: 'desc' };
    }

    const productData = await prisma.product.findMany({
      where,
      orderBy,
      skip: parseInt(offset),
      take: parseInt(limit),
      select: {
        id: true,
        name: true,
        price: true,
        status: true,
        createdAt: true,
        sellerId: true,
        seller: { select: { firstName: true } },
      },
    });
    res.status(200).send({ message: '=== 판매 제품 목록 불러오기, 성공! ===', data: productData });
  } catch (error) {
    return next(error);
  }
};

//GET id==========
const getProductById = async (req, res, next) => {
  try {
    const id = req.params;
    const productData = await prisma.product.findUniqueOrThrow({
      where: id,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        tags: true,
        status: true,
        createdAt: true,
      },
    });
    res.status(200).send({ message: '=== 판매 제품 불러오기, 성공! ===', data: productData });
  } catch (error) {
    return next(error);
  }
};
//PATCH id==========
const patchProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inputData = req.body;

    const newPatchData = await prisma.product.update({
      where: { id },
      data: inputData,
    });
    res.status(200).send({ message: '=== 판매 제품 수정, 성공! ===', data: newPatchData });
  } catch (error) {
    return next(error);
  }
};

//DELETE id==========
const deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

export { createProduct, getListProducts, getProductById, patchProductById, deleteProductById };
