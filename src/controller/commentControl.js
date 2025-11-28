import commentService from '../service/commentService.js';

// 모든 댓글 목록 조회
// 페이지네이션: cursor 기반 (default: limit=10)
// 조회순: id 오름순으로 고정
// 조건 검색: content에 포함된 단어
async function getList(req, res, next) {
  const { limit, cursor = 0, type = 'all', content } = req.query;

  console.log(`Fetching ${type} comment list...`);
  console.log(`cursor, now:   ${cursor}`);
  const { comments, nextCursor } = await commentService.getList(limit, cursor, type, content);
  console.log(`cursor, next:  ${nextCursor}`);
  console.log('');
  res.status(200).send(comments);
}

// 1개 댓글 조회
async function get(req, res, next) {
  const comment = await commentService.get(req.params.commentId);
  console.log('Comments fetched');
  res.status(200).send(comment);
}

// 상품 댓글 등록
// req.params에 commentId 있어야 함
// 입력 필드: content
// req.params에 productId 있어야 함
async function postProduct(req, res, next) {
  const { content } = req.body;
  const { productId } = req.params;
  const { id: userId } = req.user;
  const comment = await commentService.postProduct(content, productId, userId);
  console.log('Comment created');
  res.status(200).send(comment);
}

// 게시물 댓글 등록
// req.params에 commentId 있어야 함
// 입력 필드: content
// req.params에 articleId 있어야 함
async function postArticle(req, res, next) {
  const { content } = req.body;
  const { articleId } = req.params;
  const { id: userId } = req.user;
  const comment = await commentService.postArticle(content, articleId, userId);
  console.log('Comment created');
  res.status(200).send(comment);
}

// 1개 댓글 수정
// req.params에 commentId 있어야 함
// 입력 필드: content
async function patch(req, res, next) {
  const comment = await commentService.patch(req.params.commentId, req.body, req.user.id);
  console.log('Comments edited.');
  res.status(201).send(comment);
}

// 1개 댓글 삭제
// req.params에 commentId 있어야 함
async function erase(req, res, next) {
  await commentService.erase(req.params.commentId);
  console.log('Comment deleted.');
  res.status(201).send('Comment deleted.');
}

export default {
  getList,
  get,
  postProduct,
  postArticle,
  patch,
  erase
};
