// Express 라우터를 가져옵니다
import express from 'express';
// 업로드 컨트롤러를 가져옵니다
import UploadController from '../controllers/uploadControllers.js';
// 이미지 업로드 관련 미들웨어를 가져옵니다
import { imageUpload, handleUploadError } from '../lib/upload.js';
// 에러 핸들러를 가져옵니다
import { asyncHandler } from '../lib/errors/errorHandler.js';

// Express 라우터를 생성합니다
const router = express.Router();

// 이미지 업로드 API (POST /api/upload/upload)
// 이미지 파일을 서버에 업로드할 때 사용합니다
router.post('/upload', imageUpload, handleUploadError, asyncHandler(UploadController.uploadImage));

// 라우터를 내보냅니다
export default router;
