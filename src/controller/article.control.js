import articleService from '../service/article.service.js';

// 게시물 등록, 수정, 삭제: 토큰 인증된 유저만 가능
async function post(req, res) {
  const article = await articleService.post(req.user.id, req.body);
  console.log(`Article_${article.id} posted successfully by user${req.user.id}`);
  res.status(201).json(article);
}

// 게시물 수정
async function patch(req, res) {
  const article = await articleService.patch(req.params.id, req.body);
  console.log(`Article_${req.params.id} edited by user${req.user.id}`);
  res.status(200).json(article);
}

// 게시물 삭제
async function erase(req, res) {
  await articleService.erase(req.params.id);
  console.log(`Article_${req.params.id} deleted by user${req.user.id}`);
  res.status(204).send({ message: '게시물이 삭제되었습니다' });
}

// 게시물 목록 조회와 상세 조회: 누구나 가능
async function getList(req, res) {
  const { offset, limit, order, title, content } = req.query;
  const articles = await articleService.getList(offset, limit, order, title, content);
  console.log('Article list fetched');
  res.status(200).json(articles);
}

// 게시물 상세 조회
async function get(req, res) {
  const article = await articleService.get(req.user, req.params.id);
  console.log('Article fetched (in detail)');
  res.status(200).json(article);
}

// 게시물: 좋아요/좋아요-취소
async function like(req, res, next) {
  const article = await articleService.like(req.user.id, req.params.id);
  res.status(200).json(article);
}

async function cancelLike(req, res, next) {
  const article = await articleService.cancelLike(req.user.id, req.params.id);
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
