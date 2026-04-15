// TODO) Multer-Loader: 환경, 설정, 공통 미들웨어 정의
// ?) 이미지 업로드 설정
import multer, { type FileFilterCallback } from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import type { Request } from 'express';

// 1) 파일 크기 제한
const limits = { fileSize: 5 * 1024 * 1024 }; // 5MB

// 2) 업로드 폴더 생성 (없으면 자동 생성) -> 업로드 저장소 만들기 위한 목적
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

// 3) 파일 저장 방식 설정
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const validExt = ['.jpg', '.jpeg', '.png'].includes(ext) ? ext : '';
    cb(null, crypto.randomUUID() + validExt);
  },
});

// 4) 허용 MIME 타입 필터링
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const isValidType = ['image/jpeg', 'image/png'].includes(file.mimetype);
  if (isValidType) {
    cb(null, true);
  } else {
    cb(new Error('jpeg/png만 업로드 가능합니다.'));
  }
};

// 5) 최종 업로드 인스턴스
export const upload = multer({
  storage,
  limits,
  fileFilter,
});
