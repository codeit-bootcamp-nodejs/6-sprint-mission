import articleService from '../service/article.service';
import { Request, Response } from 'express';

// 게시물 등록, 수정, 삭제: 토큰 인증된 유저만 가능
async function post(req: Request, res: Response) {
  const article = await articleService.post(req.user!.id, req.body);
  console.log(`Article_${article.id} posted successfully by user${req.user!.id}`);
  res.status(201).json(article);
}

// 게시물 수정
async function patch(req: Request, res: Response) {
  const article = await articleService.patch(req.params.id, req.body);
  console.log(`Article_${req.params.id} edited by user${req.user!.id}`);
  res.status(200).json(article);
}

// 게시물 삭제
async function erase(req: Request, res: Response) {
  await articleService.erase(req.params.id);
  console.log(`Article_${req.params.id} deleted by user${req.user!.id}`);
  res.status(204).send({ message: '게시물이 삭제되었습니다' });
}

// 게시물 목록 조회
async function getList(req: Request, res: Response) {
  const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  const order = (req.query.order as string) || 'recent';
  const title = req.query.title as string | undefined;
  const content = req.query.content as string | undefined;

  const articles = await articleService.getList(offset, limit, order, title, content);
  console.log('Article list fetched');
  res.status(200).json(articles);
}

// 게시물 상세 조회
async function get(req: Request, res: Response) {
  const { id: articleId } = req.params;
  const userId = req.user?.id;
  const article = await articleService.get(userId, articleId);
  console.log('Article fetched (in detail)');
  res.status(200).json(article);
}

// 게시물: 좋아요/좋아요-취소
async function like(req: Request, res: Response) {
  const article = await articleService.like(req.user!.id, req.params.id);
  res.status(200).json(article);
}

async function cancelLike(req: Request, res: Response) {
  const article = await articleService.cancelLike(req.user!.id, req.params.id);
  res.status(200).json(article);
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
