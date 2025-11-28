import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

// 상품 이미지 Url 목록 조회
// req.params에 productId 있어야 함
export async function getProductImageList(req, res, next) {
  const { productId } = req.params;
  try {
    const product = await prisma.product.findUniqueOrThrow({
      where: { id: productId },
      select: { imageUrls: true }
    });
    console.log('imageUrls retrieved');
    console.log(product.imageUrls);
    console.log('');
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
}

// 상품 이미지 목록 삭제
// req.params에 productId 있어야 함
export async function deleteProductImageList(req, res, next) {
  const { productId } = req.params;
  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data: { imageUrls: [] }
    });
    console.log('ImageUrls deleted');
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
}

// 상품 이미지 등록
// req.params에 productId 있어야 함
// 상품 이미지 저장 (현재는 로컬호스트에)
// 상품 이미지 Url을 기존 imageUrls 배열에 추가 (없다면 생성)
export async function postProductImage(req, res, next) {
  const { productId } = req.params;
  const { imageUrls } = req.body;
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { imageUrls: true } // 저장된 imageUrls 배열 가져옴
    });

    // 새로 추가/생성할 이미지 url
    const newImageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    app.use('/uploads', express.static('uploads')); // 정적 메소드로 이미지 저장할 장소 지정

    // 기존 imgeUrls에 새로운 imageUrl 추가하기
    const updatedUrls = [...product.imageUrls, newImageUrl];

    // DB의 imageUrls 필드 업데이트
    const updated = await prisma.product.update({
      where: { id: productId },
      data: { imageUrls: updatedUrls }
      //select: { imageUrls: true } // imageUrls만 보고 싶다면
    });
    console.log('imageUrls updated & stored in DB.');
    res.status(201).send(updated);
  } catch (err) {
    next(err);
  }
}

// 게시물 이미지 Url 목록 조회
// req.params에 articleId 있어야 함
export async function getArticleImageList(req, res, next) {
  const { articleId } = req.params;
  try {
    const article = await prisma.article.findUniqueOrThrow({
      where: { id: articleId },
      select: { imageUrls: true }
    });
    console.log('imageUrls retrieved');
    console.log(article.imageUrls);
    console.log('');
    res.status(200).send(article);
  } catch (err) {
    next(err);
  }
}

// 게시물 이미지 등록
// req.params에 articleId 있어야 함
// 상품 이미지 저장 (현재는 로컬호스트에)
// 상품 이미지 Url을 기존 imageUrls 배열에 추가 (없다면 생성)
export async function postArticleImage(req, res, next) {
  const { articleId } = req.params;
  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
      select: { imageUrls: true } // 저장된 imageUrls 배열 가져옴
    });

    // 새로 추가/생성할 이미지 url
    const newImageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    app.use('/uploads', express.static('uploads'));

    // 기존 imgeUrls에 새로운 imageUrl 추가하기
    const updatedUrls = [...article.imageUrls, newImageUrl];

    // DB의 imageUrls 필드 업데이트
    const updated = await prisma.article.update({
      where: { id: articleId },
      data: { imageUrls: updatedUrls }
      //select: { imageUrls: true } // imageUrls만 보고 싶다면
    });
    console.log('imageUrls updated & stored in DB.');
    res.status(201).send(updated);
  } catch (err) {
    next(err);
  }
}

// 게시물 이미지 목록 삭제
// req.params에 articleId 있어야 함
export async function deleteArticleImageList(req, res, next) {
  const { articleId } = req.params;
  try {
    const article = await prisma.article.update({
      where: { id: articleId },
      data: { imageUrls: [] }
    });
    console.log('ImageUrls deleted');
    res.status(200).send(article);
  } catch (err) {
    next(err);
  }
}
