import prisma from '../lib/prisma.js';

/* export {
  createCommentForArticle,
  createCommentForProduct,
  getCommentListProduct,
  getCommentListArticle,
  getCommentById,
  patchCommentById,
  deleteCommentById,
};
*/

// ==========================================
// 📰 중고마켓(product) 댓글 기능
// ==========================================

// 상품 댓글 POST -------------- (/products/:productId/comments)
export const createCommentForProduct = async (req, res, next) => {
  const { id: authorId } = req.user; // 작성자(토큰)
  const { productId } = req.params; // 상품 ID
  const inputData = req.body; // 내용 ( content , image ... )

  //
  // 1. 상품이 존재하는지 확인
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: productId },
  });

  // 2. 댓글 작성
  const comment = await prisma.comment.create({
    data: {
      ...inputData,
      authorId,
      productId: product.id, // 상품과 연결
    },
    include: { author: { select: { id: true, nickname: true, email: true } } },
  });

  // 정보 포장
  const responseData = {
    id: comment.id,
    content: comment.content,
    authorName: comment.author.nickname,
    authorId: comment.authorId,
    authorEmail: comment.author.email,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };

  return res.status(201).json(responseData);
};

// 중고마켓 댓글 list -------------------------- (/products/:productId/comments)
export const getCommentListProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { limit = 10, cursor } = req.query;

  // 1. 상품 존재 확인 없을 시 return 404
  await prisma.product.findUniqueOrThrow({ where: { id: productId } });

  const queryOptions = {
    where: { productId },
    take: parseInt(limit),
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { nickname: true } } },
  };

  if (cursor) {
    queryOptions.cursor = { id: Number(cursor) };
    queryOptions.skip = 1;
  }

  const comments = await prisma.comment.findMany(queryOptions);

  //다음 커서 계산: 가져온 개수가 limit과 같으면, 마지막 아이템 Id가 다음 커서가 됨
  const nextCursor = comments.length === parseInt(limit) ? comments[comments.length - 1].id : null;

  // 2. 상품이 있을 시 댓글목록 불러오기
  const list = comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    authorName: comment.author.nickname,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  }));

  return res.status(200).json({ nextCursor, list });
};

// ==========================================
// 📰 게시글(Article) 댓글 기능
// ==========================================

// 게시글 댓글 작성 (POST)------------------------------------------------------------------------------
export const createCommentForArticle = async (req, res, next) => {
  const { id: authorId } = req.user;
  const { articleId } = req.params;
  const inputData = req.body;

  //게시글 존재여부 확인 없다면 return 404
  const article = await prisma.article.findUniqueOrThrow({
    where: { id: articleId },
  });

  // 댓글 달기
  const comment = await prisma.comment.create({
    data: { ...inputData, authorId, articleId: article.id },
    include: { author: { select: { id: true, nickname: true, email: true } } },
  });

  // 정보 포장
  const responseData = {
    id: comment.id,
    content: comment.content,
    authorName: comment.author.nickname,
    authorId: comment.authorId,
    authorEmail: comment.author.email,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };

  return res.status(201).json(responseData);
};

//자유게시판, 게시글에 달린 댓글 list----------------------------------------------------------------------
export const getCommentListArticle = async (req, res, next) => {
  const { articleId } = req.params;
  const { limit = 10, cursor } = req.query;

  // 1. 게시글 존재 여부 확인
  await prisma.article.findUniqueOrThrow({ where: { id: articleId } });

  const queryOptions = {
    where: { articleId },
    take: parseInt(limit),
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { nickname: true, email: true } } },
  };

  if (cursor) {
    queryOptions.cursor = { id: Number(cursor) };
    queryOptions.skip = 1;
  }

  const comments = await prisma.comment.findMany(queryOptions);
  const nextCursor = comments.length === parseInt(limit) ? comments[comments.length - 1].id : null;

  // 2. 게시글이 있을 시 댓글목록 불러오기
  const list = comments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    authorName: comment.author.nickname,
    authorEmail: comment.author.email,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  }));

  return res.status(200).json({ nextCursor, list });
};

// ==========================================
// 🛠️ 공통 기능 (수정/삭제)
// ==========================================

//GET id 공통 ------------------------------------------------------------------------------------------
export const getCommentById = async (req, res, next) => {
  const { commentId } = req.params; // idStruct 거쳐올 것

  const commentData = await prisma.comment.findUniqueOrThrow({
    where: { id: commentId },
    include: { author: { select: { id: true, nickname: true, email: true } } },
  });

  const responseData = {
    id: commentData.id,
    content: commentData.content,
    authorName: commentData.author.nickname,
    authorId: commentData.author.id,
    authorEmail: commentData.author.email,
    createdAt: commentData.createdAt,
    updatedAt: commentData.updatedAt,
  };

  return res.status(200).json(responseData);
};

//PATCH id 공통 ----------------------------------------------------------------------------------------
export const patchCommentById = async (req, res, next) => {
  const { id: userId } = req.user;
  const { commentId } = req.params;
  const inputData = req.body;

  // 1. 댓글이 존재하는지
  const comment = await prisma.comment.findUniqueOrThrow({
    where: { id: commentId },
  });

  // 2. 본인 확인 (작성자 본인의 댓글이 아니라면 return 403)
  if (comment.authorId !== userId) {
    return res.status(403).json({ message: '수정 권한이 없습니다.' });
  }

  // 3. 자유 게시글 수정하기
  const newPatchData = await prisma.comment.update({
    where: { id: commentId },
    data: inputData,
    include: { author: { select: { id: true, nickname: true, email: true } } },
  });

  // 정보 포장
  const responseData = {
    id: newPatchData.id,
    content: newPatchData.content,
    authorName: newPatchData.author.nickname,
    authorId: newPatchData.author.id,
    authorEmail: newPatchData.author.email,
    createdAt: newPatchData.createdAt,
    updatedAt: newPatchData.updatedAt,
  };

  return res.status(200).json(responseData);
};

//DELETE id 공통 --------------------------------------------------------------------------------------
export const deleteCommentById = async (req, res, next) => {
  const { id: userId } = req.user;
  const { commentId } = req.params;

  // 1. 댓글이 존재하는지
  const comment = await prisma.comment.findUniqueOrThrow({
    where: { id: commentId },
  });

  // 2. 본인 확인 (작성자 본인의 댓글이 아니라면 return 403)
  if (comment.authorId !== userId) {
    return res.status(403).json({ message: '삭제 권한이 없습니다.' });
  }

  // 3. 자유 게시글 수정하기
  const newPatchData = await prisma.comment.delete({
    where: { id: commentId },
  });

  return res.status(200).json({ message: '댓글이 삭제되었습니다.' });
};
