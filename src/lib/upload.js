// multer, path, fs 모듈을 가져옵니다
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// 업로드할 파일들을 저장할 디렉토리를 설정합니다
const uploadDir = process.env.UPLOAD_DIR || 'uploads';

// 업로드 디렉토리가 없으면 생성합니다
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 파일을 저장할 때 사용할 설정입니다
const storage = multer.diskStorage({
  // 파일을 저장할 디렉토리를 지정합니다
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  // 저장할 파일의 이름을 지정합니다
  filename: (req, file, cb) => {
    // 파일명: 원본이름_타임스탬프_랜덤숫자.확장자
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // 파일 확장자
    const name = path.basename(file.originalname, ext); // 확장자 제외한 파일명
    cb(null, `${name}_${uniqueSuffix}${ext}`);
  },
});

// 업로드할 파일의 타입을 필터링하는 함수입니다
const fileFilter = (req, file, cb) => {
  // 이미지 파일만 허용합니다
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // 허용
  } else {
    cb(new Error('이미지 파일만 업로드 가능합니다.'), false); // 거부
  }
};

// multer 설정을 생성합니다
const upload = multer({
  storage: storage, // 파일 저장 설정
  fileFilter: fileFilter, // 파일 타입 필터
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 최대 5MB
    files: 1, // 한 번에 하나의 파일만 업로드 가능
  },
});

// 단일 이미지 파일을 업로드하는 미들웨어입니다
const uploadSingleImage = upload.single('image');

// 이미지 업로드 중 발생하는 오류를 처리하는 미들웨어입니다
const handleUploadError = (err, req, res, next) => {
  // multer에서 발생한 오류인지 확인합니다
  if (err instanceof multer.MulterError) {
    // 파일 크기가 너무 큰 경우
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: '파일 크기가 너무 큽니다. (최대 5MB)',
      });
    }
    // 파일 개수가 초과된 경우
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: '파일 개수가 초과되었습니다.',
      });
    }
    // 예상치 못한 파일 필드인 경우
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: '예상치 못한 파일 필드입니다.',
      });
    }
  }

  // 이미지 파일이 아닌 경우
  if (err.message === '이미지 파일만 업로드 가능합니다.') {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // 다른 오류는 다음 미들웨어로 넘깁니다
  next(err);
};

// 이미지 업로드를 처리하는 미들웨어입니다 (에러 처리 포함)
const imageUpload = (req, res, next) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      // 오류가 발생하면 에러 처리 미들웨어를 호출합니다
      return handleUploadError(err, req, res, next);
    }
    // 오류가 없으면 다음 미들웨어로 넘어갑니다
    next();
  });
};

export { imageUpload, handleUploadError };
