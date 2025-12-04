import { assert } from 'superstruct';
import { CreateArticle, PatchArticle } from '../struct/structs.js';
import NotFoundError from '../middleware/errors/NotFoundError.js';
import articleRepo from '../repository/article.repo.js';
import { isEmpty } from '../lib/myFuns.js';
import { selectArticleProductFields } from '../lib/selectFields.js';

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
  const article = await articleRepo.patch(Number(articleId), articleData);
  if (isEmpty(article)) throw new NotFoundError(article, Number(articleId));
  return article;
}

async function erase(articleId) {
  await articleRepo.erase(Number(articleId));
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
async function get(user, articleId) {
  let article = await articleRepo.findById(Number(articleId));
  article = selectArticleProductFields(article);
  if (!isEmpty(user)) {
    if (article.likedUsers.includes(user.nickname)) return { isLiked: true, ...article };
    else return { isLiked: false, ...article };
  } else return article;
}

async function like(userId, articleId) {
  let article = await articleRepo.findById(Number(articleId));
  if (article.likedUsers.find((n) => n.id === Number(userId))) {
    console.log('Already your favorite article');
  } else {
    console.log('Now, one of your favorite articles');
    article = await articleRepo.patch(Number(articleId), {
      likedUsers: { connect: { id: Number(userId) } }
    });
  }
  article = selectArticleProductFields(article);
  return { isLiked: true, ...article };
}

async function cancelLike(userId, articleId) {
  let article = await articleRepo.findById(Number(articleId));
  if (!article.likedUsers.find((n) => n.id === Number(userId))) {
    console.log('Already not your favorite article');
  } else {
    console.log('Now, not one of your favorite articles');
    article = await articleRepo.patch(Number(articleId), {
      likedUsers: { disconnect: { id: Number(userId) } }
    });
  }
  article = selectArticleProductFields(article);
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
