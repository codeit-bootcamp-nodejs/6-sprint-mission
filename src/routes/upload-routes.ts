// TODO) Upload-Routes: URL 매핑
import { Router } from 'express';
import { upload } from '../config/multer.js';

import { uploadController } from '../controllers/upload-controller.js';

const router = Router();

// 1) 이미지 업로드
router.post('/', upload.single('image'), uploadController.image);

export default router;
