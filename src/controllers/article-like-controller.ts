// TODO) Article-Like-Controller: 요청 처리
import type { Request, Response } from 'express';
import { articleLikeService } from '../services/article-like-service.js';

export const articleLikeController = {
  // 1) 게시글 좋아요 등록
  async like(req: Request, res: Response) {
    const articleId = Number(req.params.id);
    const result = await articleLikeService.like(req.user!.id, articleId);

    res.status(201).json({
      success: true,
      message: '게시글 좋아요 완료',
      data: result,
    });
  },

  // 2) 게시글 좋아요 취소
  async unlike(req: Request, res: Response) {
    const articleId = Number(req.params.id);
    const result = await articleLikeService.unlike(req.user!.id, articleId);

    res.status(200).json({
      success: true,
      message: '게시글 좋아요 취소 완료',
      data: result,
    });
  },

  // 3) 좋아요한 게시글 조회
  async list(req: Request, res: Response) {
    const liked = await articleLikeService.list(req.user!.id);

    res.status(200).json({
      success: true,
      message: '좋아요한 게시글 목록 조회 성공',
      data: liked.map((item) => item.article),
    });
  },
};
