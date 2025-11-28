import productService from '../service/productService.js';

// 상품 등록: 토큰 인증된 유저만 가능
// 입력 필드: name, description, price, tags
async function post(req, res, next) {
  const { id: userId } = req.user;
  const data = req.body;
  const product = await productService.post(userId, data);
  console.log(`Product_${product.id} posted by ${req.user.nickname}`);
  res.status(201).json(product);
}

// 상품 수정: 토큰 인증된 유저가 자기가 등록한 상품인 경우만 가능
async function patch(req, res, next) {
  const { productId } = req.params;
  const { id: userId } = req.user;
  const product = await productService.patch(userId, productId, req.body);
  console.log(`Product_${productId} patched by ${req.user.nickname}`);
  res.status(200).json(product);
}

// 상품 삭제: 토큰 인증된 유저가 자기가 등록한 상품인 경우만 가능
async function erase(req, res, next) {
  const { productId } = req.params;
  const { id: userId } = req.user;
  await productService.erase(userId, productId);
  console.log(`Product_${productId} deleted by ${req.user.nickname}`);
  res.sendStatus(204);
}

// 상품 목록 조회
// 조회 필드: id, name, price, createdAt
// 페이지네이션: offset 방식 (default: offset=0, limit=10)
// 조회순: order='recent'(default)/'oldest'
// 조건 검색: namd and/or description에 포함된 단어
async function getList(req, res, next) {
  const { offset, limit, order, name, description } = req.query;
  const products = await productService.getList(offset, limit, order, name, description);
  console.log('Product list fetched');
  res.status(200).send(products);
}

// 상품 상세 조회
// 조회 필드: id, name, description, price, tags, createdAt
async function get(req, res, next) {
  const { productId } = req.params;
  const product = await productService.get(productId);
  console.log(`Product_${productId} fetched (in detail)`);
  res.status(200).send(product);
}

export default {
  post,
  patch,
  erase,
  getList,
  get
};
