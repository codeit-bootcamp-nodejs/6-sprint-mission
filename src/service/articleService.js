import { assert } from 'superstruct';
import { CreateArticle, PatchArticle } from '../struct/structs.js';
import BadRequestError from '../middleware/errors/BadRequestError.js';
import NotFoundError from '../middleware/errors/NotFoundError.js';
import articleRepo from '../repository/articleRepo.js';
import { isEmpty } from '../lib/myFuns.js';

// 게시물 생성, 수정, 삭제: 토큰 인증된 유저만 가능
async function post(userId, data) {
  const articleData = { ...data, userId };
  assert(articleData, CreateArticle);
  const article = await articleRepo.post(articleData);
  if (isEmpty(article)) throw new NotFoundError(article, article.id);
  return article;
}

async function patch(articleId, articleData) {
  assert(articleData, PatchArticle);
  const article = await articleRepo.patch(articleId, articleData);
  if (isEmpty(article)) throw new NotFoundError(article, articleId);
  return article;
}

async function erase(articleId) {
  await articleRepo.erase(articleId);
}

// 게시물 목록 조회
// 페이지네이션: offset 기반
// 퀘리 순서: order로 createdAt 오름/내림 순서 조회
// 퀘리 조건: title이나 content에 포함된 문자로 검색 조회
async function getList(offset, limit, orderStr, titleStr, contentStr) {
  const orderBy = {};
  if (orderStr === 'oldest') {
    orderBy.createdAt = 'asc';
  } else orderBy.createdAt = 'desc';

  const where = {};
  if (titleStr) where.title = { contains: titleStr };
  if (contentStr) where.content = { contains: contentStr };

  const articles = await articleRepo.getList(where, orderBy, offset, limit);
  const articlesToShow = articles.map((a) => {
    // 보여줄 필드 선택
    const { id, title, content, createdAt, ...rest } = a;
    return { id, title, content, createdAt };
  });

  return articlesToShow;
}

// 게시물 상세 조회
// 조회 필드 요구: id, title, content, createdAt
// 조회 필드 추가: comments, likedUsers
async function get(articleId) {
  const article = await articleRepo.findById(articleId);

  // 댓글은 조회 요구 필드가 아니지만....userId와 content만 남기고 삭제
  article.comments = article.comments.map((c) => {
    return c.userId, c.content;
  });
  // likedUsers는 조회 요구 필드가 아니지만....nickname만 남기고 삭제
  article.likedUsers = article.likedUsers.map((u) => {
    return u.nickname;
  });

  const { updatedAt, imageUrls, ...rest } = article; // 조회 항목 선택
  return rest;
}

async function like(userId, articleId) {
  let article = await articleRepo.findById(Number(articleId));
  if (article.likedUsers.find((n) => n.id === userId)) {
    console.log('Already one of your liked articles');
  } else {
    console.log('Now, one of your liked articles');
    article = await articleRepo.patch(Number(articleId), {
      likedUsers: { connect: { id: userId } }
    });
  }
  return { isLiked: true, ...article };
}

async function cancelLike(userId, articleId) {
  let article = await articleRepo.findById(Number(articleId));
  if (!article.likedUsers.find((n) => n.id === userId)) {
    console.log('Already not one of your liked articles');
  } else {
    console.log('Now, not one of your liked articles');
    article = await articleRepo.patch(Number(articleId), {
      likedUsers: { disconnect: { id: userId } }
    });
  }
  return { isLiked: false, ...article };
}

export default {
  post,
  patch,
  erase,
  getList,
  get,
  like,
  cancelLike
};
