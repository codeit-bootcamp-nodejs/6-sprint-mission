import prisma from '../lib/prismaClient.js';

/**
200 OK: 일반적인 성공 (GET, UPDATE 후)
201 Created: 새로운 리소스 생성 성공 (POST)
204 No Content: 성공했지만 돌려줄 데이터가 없음 (DELETE)
400 Bad Request: 클라이언트 요청 오류 (유효성 검사 실패 등)
404 Not Found: 요청한 리소스가 없음
 */

//POST==========
const createArticle = async (req, res, next) => {
  try {
    const { title, content, authorId } = req.body;
    const articleData = await prisma.article.create({
      data: { title, content, authorId },
      select: {
        title: true,
        content: true,
        createdAt: true,
        authorId: true,
      },
      // select: { id: true, title: true, content: true, createdAt: true, updatedAt: true },
    });
    res.status(201).send({ message: '게시글이 안전하게 등록되었습니다.', data: articleData });
  } catch (error) {
    return next(error);
  }
};

//GET List==========
const getListArticles = async (req, res, next) => {
  try {
    const { offset = 0, limit = 0, order = 'recent', search } = req.query;

    const where = search
      ? {
          OR: [{ title: { contains: search } }, { content: { contains: search } }],
        }
      : undefined;

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

    const articleData = await prisma.article.findMany({
      where,
      orderBy,
      skip: parseInt(offset),
      take: parseInt(limit),
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: { select: { firstName: true } },
      },
    });
    res.status(200).send({ message: '게시글 목록 불러오기, 성공!', data: articleData });
  } catch (error) {
    return next(error);
  }
};

//GET id==========
const getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const articleData = await prisma.article.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        author: {
          select: { firstName: true, email: true },
        },
        title: true,
        content: true,
        createdAt: true,
      },
    });
    res.status(200).send({ message: '게시글 불러오기, 성공!', data: articleData });
  } catch (error) {
    return next(error);
  }
};

//PATCH id==========
const patchArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inputData = req.body;

    const newPatchData = await prisma.article.update({
      where: { id },
      data: inputData,
    });
    res.status(200).send({ message: '게시글 수정, 성공!', data: newPatchData });
  } catch (error) {
    return next(error);
  }
};

//DELETE id==========
const deleteArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.article.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

export { createArticle, getListArticles, getArticleById, patchArticleById, deleteArticleById };
