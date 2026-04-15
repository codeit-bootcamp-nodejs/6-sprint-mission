// TODO) Health-Routes: URL 매핑
import { Router } from 'express';

import {
  checkHealth,
  checkDatabase,
} from '../controllers/health-controller.js';

const router = Router();

// 1) 서버 연결 확인
router.get('/', checkHealth);

// 2) DB 연결 확인
router.get('/db', checkDatabase);

export default router;
