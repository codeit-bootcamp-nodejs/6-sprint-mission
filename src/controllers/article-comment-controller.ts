// TODO) Article-Comment-Controller: 요청 처리
import type { Request, Response } from 'express';
import { articleCommentService } from '../services/article-comment-service.js';

export const articleCommentController = {
  // 1) 댓글 목록 조회
  async list(req: Request, res: Response) {
    const articleId = Number(req.params.articleId);
    const comments = await articleCommentService.list(articleId);

    res.status(200).json({
      success: true,
      message: '게시글 댓글 목록 조회 성공',
      data: comments,
    });
  },

  // 2) 댓글 생성
  async create(req: Request, res: Response) {
    const comment = await articleCommentService.create(req.body, req.user!.id);

    res.status(201).json({
      success: true,
      message: '게시글 댓글이 등록되었습니다',
      data: comment,
    });
  },

  // 3) 댓글 수정
  async update(req: Request, res: Response) {
    const commentId = Number(req.params.id);
    const comment = await articleCommentService.update(
      commentId,
      req.body.content,
      req.user!.id
    );

    res.status(200).json({
      success: true,
      message: '게시글 댓글이 수정되었습니다',
      data: comment,
    });
  },

  // 4) 댓글 삭제
  async remove(req: Request, res: Response) {
    const commentId = Number(req.params.id);
    await articleCommentService.remove(commentId, req.user!.id);

    res.status(200).json({
      success: true,
      message: '게시글 댓글이 삭제되었습니다',
    });
  },
};
