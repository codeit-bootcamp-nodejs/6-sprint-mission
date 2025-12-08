import { assert, number } from 'superstruct';
import { CreateComment, PatchComment } from '../struct/structs.js';
import commentRepo from '../repository/comment.repo.js';
import { Prisma } from '@prisma/client';
import { updateCommentDTO } from '../dto/dto.js';

async function getList(
  limit: number,
  cursor: number | undefined,
  typeStr: string,
  contentStr: string | undefined
) {
  let where = {};
  if (contentStr) where = { content: { contains: contentStr } };
  if (typeStr === 'product') where = { ...where, articleId: null };
  if (typeStr === 'article') where = { ...where, productId: null };

  // nextCursor 계산에 반영해야 할 부분
  // 남은 item 수 보다 nextCurwor가 더 큰 경우 - 쉬운 문제
  // product, article 댓글이 마구 섞여 있을 때, type을 밝히는 경우 comments.id로 하면 문제가 됨 - 어려운 문제
  const comments = await commentRepo.getList(where, typeStr, limit, cursor);
  const nextCursor = comments.length > 0 ? comments[comments.length - 1].id : null;
  return { comments, nextCursor };
}

async function get(commentId: string) {
  const comment = await commentRepo.findById(Number(commentId));
  const { id, content, articleId, productId, userId, createdAt, updatedAt } = comment;
  if (comment.articleId == null) return { id, content, productId, userId, createdAt };
  if (comment.productId == null) return { id, content, articleId, userId, createdAt };
}

async function postProduct(content: string, productId: string, userId: number) {
  const commentData = {
    content,
    productId: Number(productId),
    userId
  };
  assert(commentData, CreateComment);

  const prismaData: Prisma.CommentCreateInput = {
    content,
    product: { connect: { id: Number(productId) } }, // userId → user 연결
    user: { connect: { id: userId } } // userId → user 연결
  };
  const comment = await commentRepo.post(prismaData);
  return comment;
}

async function postArticle(content: string, articleId: string, userId: number) {
  const commentData = {
    content,
    articleId: Number(articleId),
    userId
  };

  const prismaData: Prisma.CommentCreateInput = {
    content,
    article: { connect: { id: Number(articleId) } }, // userId → user 연결
    user: { connect: { id: userId } } // userId → user 연결
  };
  assert(commentData, CreateComment);
  const comment = await commentRepo.post(prismaData);
  return comment;
}

async function patch(commentId: string, data: updateCommentDTO, userId: number) {
  const commentData = { ...data, userId };
  assert(commentData, PatchComment);
  return await commentRepo.patch(Number(commentId), commentData);
}

async function erase(commentId: string) {
  await commentRepo.erase(Number(commentId));
}

export default {
  getList,
  get,
  postProduct,
  postArticle,
  patch,
  erase
};
