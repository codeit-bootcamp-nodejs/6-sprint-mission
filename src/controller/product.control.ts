import productService from '../service/product.service';
import { Request, Response, NextFunction } from 'express';

// 상품 등록: 토큰 인증된 유저만 가능
// 입력 필드: name, description, price, tags
async function post(req: Request, res: Response, next: NextFunction) {
  const product = await productService.post(req.user!.id, req.body);
  console.log(`Product_${product.id} posted by ${req.user!.nickname}`);
  res.status(201).json(product);
}

// 상품 수정: 토큰 인증된 유저가 자기가 등록한 상품인 경우만 가능
async function patch(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const product = await productService.patch(id, req.body);
  console.log(`Product_${id} patched by ${req.user!.nickname}`);
  res.status(200).json(product);
}

// 상품 삭제: 토큰 인증된 유저가 자기가 등록한 상품인 경우만 가능
async function erase(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  await productService.erase(id);
  console.log(`Product_${id} deleted by ${req.user!.nickname}`);
  res.status(204).send({ message: '상품이 삭제되었습니다' });
}

// 상품 목록 조회
// 조회 필드: id, name, price, createdAt
// 페이지네이션: offset 방식 (default: offset=0, limit=10)
// 조회순: order='recent'(default)/'oldest'
// 조건 검색: namd and/or description에 포함된 단어
async function getList(req: Request, res: Response, next: NextFunction) {
  const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  const order = (req.query.order as string) || 'recent';
  const name = req.query.name as string | undefined;
  const description = req.query.description as string | undefined;

  const products = await productService.getList(offset, limit, order, name, description);
  console.log('Product list fetched');
  res.status(200).json(products);
}

// 상품 상세 조회
// 조회 필드: id, name, description, price, tags, createdAt
async function get(req: Request, res: Response, next: NextFunction) {
  const { id: productId } = req.params;
  const userId = req.user?.id;
  const product = await productService.get(userId, productId);
  console.log(`Product_${productId} fetched (in detail)`);
  res.status(200).json(product);
}

// 상품: 좋아요/좋아요-취소
async function like(req: Request, res: Response, next: NextFunction) {
  const product = await productService.like(req.user!.id, req.params.id);
  res.status(200).json(product);
}

async function cancelLike(req: Request, res: Response, next: NextFunction) {
  const product = await productService.cancelLike(req.user!.id, req.params.id);
  res.status(200).json(product);
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
