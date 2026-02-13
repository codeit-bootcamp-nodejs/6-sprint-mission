import multer from 'multer';
import path from 'path';
import fs from 'fs';
import BadRequestError from './errors/BadRequestError';
import { NODE_ENV } from '../lib/constants';
import { STATIC_IMG_PATH } from '../lib/constants';
import { ImgUploadParams } from '../types/interfaceType';
import { Request } from 'express';

const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

// multer 인스터스 생성 -> 라우터에서 미들웨어로 사용
let storage;
if (NODE_ENV === 'production') {
  storage = multer.memoryStorage();
} else {
  storage = multer.diskStorage({
    destination(req, file, cb) {
      const { type, id } = (req as Request<ImgUploadParams>).params;
      if (!type || !id) return cb(new BadRequestError('type/id required'), '');

      const dir = path.join(STATIC_IMG_PATH, 'images', type, id);
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename(req, file, cb) {
      const { type, id } = (req as Request<ImgUploadParams>).params;
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`);
    }
  });
}

const upload = multer({
  storage,

  limits: { fileSize: FILE_SIZE_LIMIT }, // 파일 크기 설정

  fileFilter: function (req, file, cb) {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      const err = new BadRequestError('png, jpeg, jpg 확장자만 가능합니다.');
      return cb(err); //파일 확장자 확인
    }

    cb(null, true);
  }
});

export default upload;
