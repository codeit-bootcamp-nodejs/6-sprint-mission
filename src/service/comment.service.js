import { assert } from 'superstruct';
import { CreateComment, PatchComment } from '../struct/structs.js';
import commentRepo from '../repository/comment.repo.js';

async function getList(limit, cursor, typeStr, contentStr) {
  let where = {};
  if (typeStr === 'product') where = { articleId: null };
  if (typeStr === 'article') where = { productId: null };
  if (contentStr) where.content = { contains: contentStr };

  // nextCursor 계산에 반영해야 할 부분
  // 남은 item 수 보다 nextCurwor가 더 큰 경우 - 쉬운 문제
  // product, article 댓글이 마구 섞여 있을 때, type을 밝히는 경우 comments.id로 하면 문제가 됨 - 어려운 문제
  const comments = await commentRepo.getList(where, typeStr, Number(limit), Number(cursor));
  const nextCursor = comments.length > 0 ? comments[comments.length - 1].id : null;
  return { comments, nextCursor };
}

async function get(commentId) {
  const comment = await commentRepo.findById(Number(commentId));
  const { id, content, articleId, productId, userId, createdAt, updatedAt } = comment;
  if (comment.articleId == null) return { id, content, productId, userId, createdAt };
  if (comment.productId == null) return { id, content, articleId, userId, createdAt };
}

async function postProduct(content, productId, userId) {
  const commentData = {
    content,
    productId: Number(productId),
    userId: Number(userId)
  };
  assert(commentData, CreateComment);
  const comment = await commentRepo.post(commentData);
  return comment;
}

async function postArticle(content, articleId, userId) {
  const commentData = {
    content,
    articleId: Number(articleId),
    userId: Number(userId)
  };
  assert(commentData, CreateComment);
  const comment = await commentRepo.post(commentData);
  return comment;
}

async function patch(commentId, data, userId) {
  const commentData = { ...data, userId };
  assert(commentData, PatchComment);
  return await commentRepo.patch(Number(commentId), commentData);
}

async function erase(commentId) {
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
