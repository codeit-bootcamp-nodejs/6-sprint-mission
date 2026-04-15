// TODO) Product-Like-Controller: 요청 처리
import type { Request, Response } from 'express';
import { productLikeService } from '../services/product-like-service.js';

export const productLikeController = {
  // 1) 상품 좋아요 등록
  async like(req: Request, res: Response) {
    const productId = Number(req.params.id);
    const result = await productLikeService.like(req.user!.id, productId);

    res.status(201).json({
      success: true,
      message: '상품 좋아요 완료',
      data: result,
    });
  },

  // 2) 상품 좋아요 취소
  async unlike(req: Request, res: Response) {
    const productId = Number(req.params.id);
    const result = await productLikeService.unlike(req.user!.id, productId);

    res.status(200).json({
      success: true,
      message: '상품 좋아요 취소 완료',
      data: result,
    });
  },

  // 3) 좋아요한 상품 조회
  async list(req: Request, res: Response) {
    const liked = await productLikeService.list(req.user!.id);

    res.status(200).json({
      success: true,
      message: '좋아요한 상품 목록 조회 성공',
      data: liked.map((item) => item.product),
    });
  },
};
