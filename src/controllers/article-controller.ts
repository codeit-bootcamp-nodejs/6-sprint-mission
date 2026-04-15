// TODO) Article-Controller: 요청 처리
import type { Request, Response } from 'express';
import { articleService } from '../services/article-service.js';

export const articleController = {
  // 1) 게시글 목록 조회
  async list(req: Request, res: Response) {
    const articles = await articleService.list(req.query);

    res.status(200).json({
      success: true,
      message: '게시글 목록 조회 성공',
      data: articles,
    });
  },

  // 2) 게시글 조회
  async detail(req: Request, res: Response) {
    const articleId = Number(req.params.id);
    const article = await articleService.getOrThrow(articleId);
    const userId = req.user?.id;
    const liked = userId
      ? await articleService.isLiked(userId, article.id)
      : false;

    res.status(200).json({
      success: true,
      message: '게시글 조회 성공',
      data: { ...article, isLiked: liked },
    });
  },

  // 3) 게시글 생성
  async create(req: Request, res: Response) {
    const article = await articleService.create(req.body, req.user!.id);

    res.status(201).json({
      success: true,
      message: '게시글이 등록되었습니다',
      data: article,
    });
  },

  // 4) 게시글 수정
  async update(req: Request, res: Response) {
    const articleId = Number(req.params.id);
    const article = await articleService.update(
      articleId,
      req.body,
      req.user!.id
    );

    res.status(200).json({
      success: true,
      message: '게시글이 수정되었습니다',
      data: article,
    });
  },

  // 5) 게시글 삭제
  async remove(req: Request, res: Response) {
    const articleId = Number(req.params.id);
    await articleService.remove(articleId, req.user!.id);

    res.status(200).json({
      success: true,
      message: '게시글이 삭제되었습니다',
    });
  },
};
