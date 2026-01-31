import { assert } from 'superstruct';
import { CreateArticle, PatchArticle } from '../struct/article.struct';
import articleRepo from '../repository/article.repo';
import { isEmpty, includedOk } from '../lib/myFuns';
import { selectFields } from '../lib/selectFields';
import { CreateArticleDto, UpdateArticleDto } from '../types/dto';
import { Article2show, ArticleList2show, LikedArticle2show } from '../types/interfaceType';
import { Article, Prisma } from '@prisma/client';
import NotFoundError from '../middleware/errors/NotFoundError';

// 게시물 생성, 수정, 삭제: 토큰 인증된 유저만 가능
async function post(userId: number, data: CreateArticleDto): Promise<Article> {
  const articleData = { ...data, userId };
  assert(articleData, CreateArticle);
  const article = await articleRepo.post(articleData);
  return article;
}

async function patch(articleId: string, articleData: UpdateArticleDto) {
  assert(articleData, PatchArticle);
  const article = await articleRepo.patch(
    Number(articleId),
    articleData as Prisma.ArticleUpdateInput
  );
  if (isEmpty(article)) throw new NotFoundError();
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
): Promise<ArticleList2show[]> {
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
async function get(
  userId: number | undefined,
  articleId: string
): Promise<Article2show | LikedArticle2show> {
  let article = await articleRepo.findById(Number(articleId));
  const article2show = selectFields(article);
  if (!userId) return article2show as Article2show;
  const isLiked = article.likedUsers.some((a) => a.id === userId);
  return { isLiked, ...article2show } as LikedArticle2show;
}

// 좋아요와 좋아요취소 토글
async function likeToggle(userId: number, articleId: string): Promise<LikedArticle2show> {
  const article = await articleRepo.findById(Number(articleId));
  const isLiked = includedOk(article.likedUsers, 'id', userId);

  const updated = isLiked
    ? await articleRepo.cancelLike(Number(articleId), userId)
    : await articleRepo.like(Number(articleId), userId);

  console.log(isLiked ? 'Now, not your favorite article' : 'Now, your favorite article');
  const article2show = selectFields(updated);
  return { isLiked: !isLiked, ...article2show } as LikedArticle2show;
}

export default {
  post,
  patch,
  erase,
  getList,
  get,
  likeToggle
};
