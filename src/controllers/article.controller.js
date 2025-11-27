import prisma from '../lib/prisma.js';
import { getOrderBy } from '../lib/utils.js';

//[createArticle, getListArticles, getArticleById, patchArticleById, deleteArticleById]

// POST ==========
export const createArticle = async (req, res, next) => {
  const { id: authorId } = req.user;
  const inputData = req.body;

  const articleData = await prisma.article.create({
    data: { ...inputData, authorId },
    include: { author: { select: { nickname: true, id: true, email: true } } },
  });

  // 정보 포장
  const responseData = {
    id: articleData.id,
    title: articleData.title,
    content: articleData.content,
    authorName: articleData.author.nickname,
    authorId: articleData.authorId,
    authorEmail: articleData.author.email,
    createdAt: articleData.createdAt,
    updatedAt: articleData.updatedAt,
  };

  return res.status(201).json(responseData);
};

// GET List==========
export const getListArticles = async (req, res, next) => {
  const { offset = 0, limit = 10, order = 'recent', search } = req.query;

  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
          { author: { nickname: { contains: search, mode: 'insensitive' } } },
        ],
      }
    : undefined;

  const [articleData, totalCount] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: getOrderBy(order),
      skip: parseInt(offset),
      take: parseInt(limit),
      include: { author: { select: { nickname: true, id: true, email: true } } },
    }),
    prisma.article.count({ where }),
  ]);

  // 정보 포장
  const list = articleData.map((article) => ({
    id: article.id,
    title: article.title,
    content: article.content,
    authorName: article.author.nickname,
    authorId: article.authorId,
    authorEmail: article.author.email,
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    //commentCount: 0
  }));

  return res.status(200).json({ totalCount, list });
};

// GET id ==========
export const getArticleById = async (req, res, next) => {
  const { articleId } = req.params;

  const articleData = await prisma.article.findUniqueOrThrow({
    where: { id: articleId },
    include: { author: { select: { id: true, nickname: true, email: true } } },
  });

  // 정보 포장
  const responseData = {
    id: articleData.id,
    title: articleData.title,
    content: articleData.content,
    authorName: articleData.author.nickname,
    authorId: articleData.authorId,
    authorEmail: articleData.author.email,
    createdAt: articleData.createdAt,
    updatedAt: articleData.updatedAt,
  };

  return res.status(200).json(responseData);
};

// PATCH id ==========
export const patchArticleById = async (req, res, next) => {
  const { id: userId } = req.user; //헷갈림 방지를 위한 authorId 대신 userId 사용
  const { articleId } = req.params;
  const inputData = req.body;

  // 1. 자유 게시글이 존재하는지, 누가 주인인지 확인
  const article = await prisma.article.findUniqueOrThrow({
    where: { id: articleId },
  });

  // 2. 본인 확인 (작성자 본인의 자유 게시글이 아니라면 return 403)
  if (article.authorId !== userId) {
    return res.status(403).json({ message: '수정 권한이 없습니다.' });
  }

  // 3. 자유 게시글 수정하기
  const updateArticle = await prisma.article.update({
    where: { id: articleId },
    data: inputData,
    include: { author: { select: { id: true, nickname: true, email: true } } },
  });

  // 정보 포장
  const responseData = {
    id: updateArticle.id,
    title: updateArticle.title,
    content: updateArticle.content,
    authorName: updateArticle.author.nickname,
    authorId: updateArticle.authorId,
    authorEmail: updateArticle.author.email,
    createdAt: updateArticle.createdAt,
    updatedAt: updateArticle.updatedAt,
  };

  return res.status(200).json(responseData);
};

// DELETE id ==========
export const deleteArticleById = async (req, res, next) => {
  const { id: userId } = req.user;
  const { articleId } = req.params;

  // 1. 자유 게시글이 존재하는지, 누가 주인인지 확인
  const article = await prisma.article.findUniqueOrThrow({
    where: { id: articleId },
  });

  // 2. 본인 확인 (작성자 본인의 자유 게시글이 아니라면 return 403)
  if (article.authorId !== userId) {
    return res.status(403).json({ message: '삭제 권한이 없습니다.' });
  }

  //3. 자유 게시글 삭제하기
  await prisma.article.delete({
    where: { id: articleId },
  });

  return res.status(200).json({ message: '게시글이 삭제되었습니다.' });
};
