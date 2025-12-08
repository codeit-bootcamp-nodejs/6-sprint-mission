import { assert } from 'superstruct';
import { CreateArticle, PatchArticle } from '../struct/structs.js';
import NotFoundError from '../middleware/errors/NotFoundError.js';
import articleRepo from '../repository/article.repo.js';
import { isEmpty } from '../lib/myFuns.js';
import { selectArticleFields } from '../lib/selectFields.js';
import { createArticleDTO, updateArticleDTO } from '../dto/dto.js';
import { Prisma } from '@prisma/client';

// 게시물 생성, 수정, 삭제: 토큰 인증된 유저만 가능
async function post(userId: number, data: createArticleDTO) {
  const articleData = { ...data, userId };
  assert(articleData, CreateArticle);
  const prismaData: Prisma.ArticleCreateInput = {
    ...data, // title, content, imageUrls 등
    user: { connect: { id: userId } } // userId → user 연결
  };
  const article = await articleRepo.post(prismaData);
  //if (isEmpty(article)) throw new NotFoundError(article, article.id);
  return article;
}

async function patch(articleId: string, articleData: updateArticleDTO) {
  assert(articleData, PatchArticle);
  const article = await articleRepo.patch(
    Number(articleId),
    articleData as Prisma.ArticleUpdateInput
  );
  if (isEmpty(article)) throw new NotFoundError('article', Number(articleId));
  return article;
}

async function erase(articleId: string) {
  await articleRepo.erase(Number(articleId));
}

// 게시물 목록 조회
// 페이지네이션: offset 기반
// 퀘리 순서: order로 createdAt 오름/내림 순서 조회
// 퀘리 조건: title이나 content에 포함된 문자로 검색 조회
async function getList(
  offset: number,
  limit: number,
  orderStr: string,
  titleStr: string | undefined,
  contentStr: string | undefined
) {
  const orderBy = { createdAt: 'desc' };
  if (orderStr === 'oldest') {
    orderBy.createdAt = 'asc';
  } else orderBy.createdAt = 'desc';

  const where = { title: { contains: '' }, content: { contains: '' } };
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
async function get(userId: number | undefined, articleId: string) {
  let article = await articleRepo.findById(Number(articleId));
  const article2show = selectArticleFields(article);
  if (!userId) return article2show;
  const isLiked = article.likedUsers.some((a) => a.id === userId);
  return { isLiked, ...article2show };
}

async function like(userId: number, articleId: string) {
  let article = await articleRepo.findById(Number(articleId));
  if (article.likedUsers.some((n) => n.id === userId)) {
    console.log('Already your favorite article');
  } else {
    console.log('Now, one of your favorite articles');
    article = await articleRepo.patch(Number(articleId), {
      likedUsers: { connect: { id: userId } }
    });
  }
  const article2show = selectArticleFields(article);
  return { isLiked: true, ...article2show };
}

async function cancelLike(userId: number, articleId: string) {
  let article = await articleRepo.findById(Number(articleId));
  if (!article.likedUsers.some((n) => n.id === userId)) {
    console.log('Already not your favorite article');
  } else {
    console.log('Now, not one of your favorite articles');
    article = await articleRepo.patch(Number(articleId), {
      likedUsers: { disconnect: { id: userId } }
    });
  }
  const article2show = selectArticleFields(article);
  return { isLiked: false, ...article2show };
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
