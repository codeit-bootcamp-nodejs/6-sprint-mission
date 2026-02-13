import multer from 'multer';
import BadRequestError from './errors/BadRequestError';

const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),

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
