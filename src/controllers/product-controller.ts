// TODO) Product-Controller: 요청 처리
import type { Request, Response } from 'express';
import { productService } from '../services/product-service.js';

export const productController = {
  // 1) 상품 목록 조회
  async list(req: Request, res: Response) {
    const products = await productService.list(req.query);

    res.status(200).json({
      success: true,
      message: '상품 목록 조회 성공',
      data: products,
    });
  },

  // 2) 상품 조회
  async detail(req: Request, res: Response) {
    const productId = Number(req.params.id);
    const product = await productService.getOrThrow(productId);
    const userId = req.user?.id;
    const liked = userId
      ? await productService.isLiked(userId, product.id)
      : false;

    res.status(200).json({
      success: true,
      message: '상품 조회 성공',
      data: { ...product, isLiked: liked },
    });
  },

  // 3) 상품 생성
  async create(req: Request, res: Response) {
    const product = await productService.create(req.body, req.user!.id);

    res.status(201).json({
      success: true,
      message: '상품이 등록되었습니다',
      data: product,
    });
  },

  // 4) 상품 수정
  async update(req: Request, res: Response) {
    const productId = Number(req.params.id);
    const product = await productService.update(
      productId,
      req.body,
      req.user!.id
    );

    res.status(200).json({
      success: true,
      message: '상품이 수정되었습니다',
      data: product,
    });
  },

  // 5) 상품 삭제
  async remove(req: Request, res: Response) {
    const productId = Number(req.params.id);
    await productService.remove(productId, req.user!.id);

    res.status(200).json({
      success: true,
      message: '상품이 삭제되었습니다',
    });
  },

  // 6) 상품 구매
  async purchase(req: Request, res: Response) {
    const { productId, quantity } = req.body;
    const result = await productService.purchase(productId, quantity);

    res.status(201).json({
      success: true,
      message: '상품 구매가 완료되었습니다',
      data: result,
    });
  },
};
