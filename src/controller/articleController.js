import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

// 게시물 등록
export async function postArticle(req, res, next) {
  const data = req.body;
  try {
    const article = await prisma.article.create({ data });
    res.status(201).send(article);
  } catch (err) {
    next(err);
  }
}

// 게시물 목록 조회
// 페이지네이션: offset 기반
// 퀘리 순서: order로 createdAt 오름/내림 순서 조회
// 퀘리 조건: title이나 content에 포함된 문자로 검색 조회
export async function getArticleList(req, res, next) {
  const { offset, limit, order, title, content } = req.query;
  let orderBy;
  if (order !== 'recent') {
    orderBy = { createdAt: 'asc' };
  } else {
    orderBy = { createdAt: 'desc' };
  }

  try {
    const articles = await prisma.article.findMany({
      skip: parseInt(offset) || 0, // 페이지네이션: offset 기반, 디폴트 0
      take: parseInt(limit) || 10, // 페이지 크기 디폴트 10
      orderBy, // 퀘리 순서: createdAt 오름(order=asc) 또는 내림(order=recent) 순서 조회

      // 퀘리 조건: title이나 content에 포함된 문자로 검색 조회
      where: { title: { contains: title }, content: { contains: content } },
      // 조회 필드 제한
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true
      }
    });
    console.log('Article list found.');
    res.status(200).send(articles); // 상태코드 및 적절한 응답 리턴
  } catch (err) {
    next(err);
  }
}

// 게시물 상세 조회
export async function getArticle(req, res, next) {
  const { articleId } = req.params;
  try {
    const article = await prisma.article.findUniqueOrThrow({
      where: { id: articleId },
      include: { comments: false, updatedAt: false } // 댓글도 보고 싶지 않을까?
    });

    if (article.hasOwnProperty('comments')) {
      // comments 조회한다면, updatedAt 필드 삭제
      article.comments = article.comments.map(({ productId, updatedAt, ...rest }) => rest);
    }
    console.log('Article found.');
    res.status(200).send(article);
  } catch (err) {
    next(err);
  }
}

// 게시물 수정
export async function patchArticle(req, res, next) {
  const { articleId } = req.params;
  const data = req.body;
  try {
    const article = await prisma.article.update({ where: { id: articleId }, data });
    console.log('Article updated.');
    res.status(200).send(article);
  } catch (err) {
    next(err);
  }
}

// 1개 article 삭제
export async function deleteArticle(req, res, next) {
  const { articleId } = req.params;
  try {
    const article = await prisma.article.delete({ where: { id: articleId } });
    console.log('Article deleted.');
    res.status(204).send(article);
  } catch (err) {
    next(err);
  }
}
