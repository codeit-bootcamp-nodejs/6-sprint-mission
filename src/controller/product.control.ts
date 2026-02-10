import { NODE_ENV } from '../lib/constants';
import productService from '../service/product.service';
import { Request, Response, NextFunction } from 'express';

// 상품 등록: 토큰 인증된 유저만 가능
// 입력 필드: name, description, price, tags
async function post(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { name, description, price, tags } = req.body;
  const productData = {
    userId: req.user.id,
    name: name.trim(),
    description: description.trim(),
    price: price,
    tags: tags
  };
  const [product, priceRecord] = await productService.post(productData);
  if (NODE_ENV === 'development') {
    console.log('');
    console.log(`Product_${product.id} created by User_${req.user.id}`);
    console.log(`Product_${product.id} has PriceRecord_${priceRecord.id}`);
    console.log(priceRecord);
    console.log('');
  }
  res.status(201).json(product);
}

// 상품 수정: 토큰 인증된 유저가 자기가 등록한 상품인 경우만 가능
async function patch(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;
  const { name, description, price, tags } = req.body;

  const productData = {
    name: name ? name.trim() : undefined,
    description: description ? description.trim() : undefined,
    price: price ?? undefined,
    tags: tags ?? undefined
  };

  const product = await productService.patch(Number(id), productData);
  if (NODE_ENV === 'development') {
    console.log(`Product_${id} patched by ${req.user.nickname}`);
    console.log('');
  }
  res.status(200).json(product);
}

// 상품 삭제: 토큰 인증된 유저가 자기가 등록한 상품인 경우만 가능
async function erase(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;
  await productService.erase(Number(id));
  if (NODE_ENV === 'development') console.log(`Product_${id} deleted by ${req.user.nickname}`);
  res.status(204).send({ message: '상품이 삭제되었습니다' });
}

// 상품 목록 조회
// 조회 필드: id, name, price, createdAt
// 페이지네이션: offset 방식 (default: offset=0, limit=10)
// 조회순: order='recent'(default)/'oldest'
// 조건 검색: namd and/or description에 포함된 단어
async function getList(req: Request, res: Response, next: NextFunction): Promise<void> {
  const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  const order = (req.query.order as string) || 'recent';
  const name = req.query.name as string | undefined;
  const description = req.query.description as string | undefined;

  const products = await productService.getList(offset, limit, order, name, description);
  if (NODE_ENV === 'development') console.log('Product list fetched');
  res.status(200).json(products);
}

// 상품 상세 조회
// 조회 필드: id, name, description, price, tags, createdAt
async function get(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id: productId } = req.params;
  const userId = req.user.id;
  const product = await productService.get(userId, Number(productId));
  if (NODE_ENV === 'development') console.log(`Product_${productId} fetched (in detail)`);
  res.status(200).json(product);
}

// 상품: 좋아요/좋아요-취소
async function likeToggle(req: Request, res: Response, next: NextFunction): Promise<void> {
  const product = await productService.likeToggle(req.user.id, Number(req.params.id));
  res.status(200).json(product);
}

// 모든 상품의 가격 기록 조회
async function getPriceRecord(req: Request, res: Response, next: NextFunction): Promise<void> {
  const records = await productService.getPriceRecord(Number(req.params.id));
  res.status(200).json(records);
}

async function getPriceRecords(req: Request, res: Response, next: NextFunction): Promise<void> {
  const records = await productService.getPriceRecords(Number(req.params.productId));
  res.status(200).json({ total: records.length, data: records });
}

export default {
  post,
  patch,
  erase,
  getList,
  get,
  likeToggle,
  getPriceRecords,
  getPriceRecord
};
