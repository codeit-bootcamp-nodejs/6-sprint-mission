// TODO) Upload-Controller: 요청 처리
import type { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../core/error/error-handler.js';

export const uploadController = {
  image(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      return next(new ValidationError('file', '업로드된 파일이 없습니다'));
    }

    return res.status(201).json({
      success: true,
      path: `/uploads/${req.file.filename}`,
    });
  },
};
