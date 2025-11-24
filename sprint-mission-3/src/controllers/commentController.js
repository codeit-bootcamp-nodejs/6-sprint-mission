import { skip } from '@prisma/client/runtime/library';
import prisma from '../lib/prismaClient.js';
import { optional } from 'superstruct';

/*
200 OK: 일반적인 성공 (GET, UPDATE 후)
201 Created: 새로운 리소스 생성 성공 (POST)
204 No Content: 성공했지만 돌려줄 데이터가 없음 (DELETE)
400 Bad Request: 클라이언트 요청 오류 (유효성 검사 실패 등)
404 Not Found: 요청한 리소스가 없음
 */

//POST

// 중고마켓 댓글 POST
const createCommentForProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { content, authorId } = req.body;

    const newComment = await prisma.comment.create({
      data: {
        content,
        product: { connect: { id: productId } },
        author: { connect: { id: authorId } },
      },
      select: {
        id: true,
        author: { select: { id: true, firstName: true } },
        content: true,
        createdAt: true,
      },
    });
    res.status(201).send({ message: '=== 댓글이 등록되었습니다 ===', data: newComment });
  } catch (error) {
    return next(error);
  }
};

//자유게시판 댓글 POST
const createCommentForArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { content, authorId } = req.body;

    const newComment = await prisma.comment.create({
      data: {
        content,
        article: { connect: { id: articleId } },
        author: { connect: { id: authorId } },
      },
      select: {
        id: true,
        author: { select: { id: true, firstName: true } },
        content: true,
        createdAt: true,
      },
    });
    res.status(201).send({ message: '=== 댓글이 등록되었습니다 ===', data: newComment });
  } catch (error) {
    return next(error);
  }
};

//중고마켓
const getCommentListProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { limit = 0, cursor } = req.query;

    const options = {
      where: { productId },
      take: parseInt(limit),
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    };

    if (cursor) {
      options.cursor = { id: cursor };
      options.skip = 1;
    }

    const comments = await prisma.comment.findMany(options);

    res
      .status(200)
      .send({ message: `=== ${productId}제품의 댓글 목록을 불러왔습니다. ===`, data: comments });
  } catch (error) {
    return next(error);
  }
};

//자유게시판
const getCommentListArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const { limit = 0, cursor } = req.query;

    const options = {
      where: { articleId },
      take: parseInt(limit),
      select: {
        id: true,
        content: true,
        createdAt: true,
      },
    };

    if (cursor) {
      options.cursor = { id: cursor };
      options.skip = 1;
    }

    const comments = await prisma.comment.findMany(options);
    res
      .status(200)
      .send({ message: `=== ${articleId}게시글의 댓글 목록을 불러왔습니다. ===`, data: comments });
  } catch (error) {
    return next(error);
  }
};

//GET id 공통
const getCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const commentData = await prisma.comment.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        author: {
          select: { firstName: true },
        },
        content: true,
        createdAt: true,
      },
    });
    res.status(200).send({ message: '=== 댓글을 불러왔습니다 ===', data: commentData });
  } catch (error) {
    return next(error);
  }
};

//PATCH id 공통
const patchCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inputData = req.body;

    const newPatchData = await prisma.comment.update({
      where: { id },
      data: inputData,
      select: {
        id: true,
        author: { select: { id: true, firstName: true } },
        content: true,
        createdAt: true,
      },
    });
    res.status(201).send({ message: ' === 댓글 수정 성공 === ', data: newPatchData });
  } catch (error) {
    return next(error);
  }
};

//DELETE id 공통
const deleteCommentById = async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.comment.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

export {
  createCommentForArticle,
  createCommentForProduct,
  getCommentListProduct,
  getCommentListArticle,
  getCommentById,
  patchCommentById,
  deleteCommentById,
};
