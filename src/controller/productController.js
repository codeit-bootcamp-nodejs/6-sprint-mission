import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

// 상품 등록
// 입력 필드: name, description, price, tags
export async function postProduct(req, res, next) {
  const data = req.body;
  try {
    const product = await prisma.product.create({ data });
    console.log('Product created.');
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
}

// 상품 목록 조회
// 조회 필드: id, name, price, createdAt
// 페이지네이션: offset 방식 (default: offset=0, limit=10)
// 조회순: order='recent'(default)/'oldest'
// 조건 검색: namd and/or description에 포함된 단어
export async function getProductList(req, res, next) {
  const { offset, limit, order, name, description } = req.query;
  let orderBy;
  switch (order) {
    case 'recent':
      orderBy = { createdAt: 'desc' };
      break;
    case 'oldest':
      orderBy = { createdAt: 'asc' };
      break;
    default:
      orderBy = { createdAt: 'desc' };
      break;
  }
  try {
    const products = await prisma.product.findMany({
      orderBy, // 조회순: order='recent'(default)/'oldest'
      // 조건 검색: namd and/or description에 포함된 단어
      where: { name: { contains: name }, description: { contains: description } },
      skip: parseInt(offset) || 0, // offset 방식 페이지네이션: default 0
      take: parseInt(limit) || 10, // default 10
      select: {
        // 조회 필드: id, name, price, createdAt
        id: true,
        name: true,
        price: true,
        createdAt: true
        //comments: true
      }
    });
    console.log('Product list retrieved.');
    res.status(200).send(products);
  } catch (err) {
    next(err);
  }
}

// 상품 상세 조회
// 조회 필드: id, name, description, price, tags, createdAt
export async function getProduct(req, res, next) {
  const { productId: id } = req.params;
  try {
    const product = await prisma.product.findFirstOrThrow({
      where: { id },
      include: {
        updatedAt: false,
        imageUrls: false, // 이미지 Url 조회하려면 true로 변경
        comments: false // 댓글 조회하려면 true로 변경
      }
    });
    if (product.hasOwnProperty('comments')) {
      // 댓글을 조회하는 경우, updatedAt 필드 감춤
      product.comments = product.comments.map(({ articleId, updatedAt, ...rest }) => rest);
    }
    console.log('Product found.');
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
}

// 상품 수정: PATCH 메소드 사용
export async function patchProduct(req, res, next) {
  const { productId: id } = req.params;
  const data = req.body;
  try {
    const product = await prisma.product.update({
      where: { id },
      data,
      include: { comments: true }
    });
    console.log('Product patched.');
    res.status(201).send(product);
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  const { productId: id } = req.params;
  try {
    const product = await prisma.product.delete({ where: { id } });
    console.log('Product deleted.');
    res.status(201).send('Product deleted.');
  } catch (err) {
    next(err);
  }
}
