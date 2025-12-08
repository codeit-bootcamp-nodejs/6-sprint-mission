import commentService from '../service/comment.service.js';
import { Request, Response, NextFunction } from 'express';

// 모든 댓글 목록 조회
// 페이지네이션: cursor 기반 (default: limit=10)
// 조회순: id 오름순으로 고정
// 조건 검색: content에 포함된 단어
async function getList(req: Request, res: Response, next: NextFunction) {
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  const cursor = parseInt(req.query.cursor as string, 10);
  const type = (req.query.type as string) || 'all';
  const content = req.query.content as string | undefined;

  console.log(`Fetching ${type} comment list...`);
  console.log(`cursor, now:   ${cursor}`);
  const { comments, nextCursor } = await commentService.getList(limit, cursor, type, content);
  console.log(`cursor, next:  ${nextCursor}`);
  console.log('');
  res.status(200).json(comments);
}

// 1개 댓글 조회
async function get(req: Request, res: Response, next: NextFunction) {
  const comment = await commentService.get(req.params.id);
  console.log('Comments fetched');
  res.status(200).json(comment);
}

// 상품 댓글 등록
// req.params에 commentId 있어야 함
// 입력 필드: content
// req.params에 productId 있어야 함
async function postProduct(req: Request, res: Response, next: NextFunction) {
  const { content } = req.body;
  const { id: productId } = req.params;
  const { id: userId } = req.user!;
  const comment = await commentService.postProduct(content, productId, userId);
  console.log('Comment created');
  res.status(200).json(comment);
}

// 게시물 댓글 등록
// req.params에 commentId 있어야 함
// 입력 필드: content
// req.params에 articleId 있어야 함
async function postArticle(req: Request, res: Response, next: NextFunction) {
  const { content } = req.body;
  const { id: articleId } = req.params;
  const { id: userId } = req.user!;
  const comment = await commentService.postArticle(content, articleId, userId);
  console.log('Comment created');
  res.status(200).json(comment);
}

// 1개 댓글 수정
// req.params에 commentId 있어야 함
// 입력 필드: content
async function patch(req: Request, res: Response, next: NextFunction) {
  const comment = await commentService.patch(req.params.id, req.body, req.user!.id);
  console.log('Comments edited.');
  res.status(201).json(comment);
}

// 1개 댓글 삭제
// req.params에 commentId 있어야 함
async function erase(req: Request, res: Response, next: NextFunction) {
  await commentService.erase(req.params.id);
  console.log('Comment deleted.');
  res.status(204).send('Comment deleted.');
}

export default {
  getList,
  get,
  postProduct,
  postArticle,
  patch,
  erase
};
