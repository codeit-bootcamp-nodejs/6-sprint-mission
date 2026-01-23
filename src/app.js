// 필요한 모듈들을 가져옵니다
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// ES6 모듈에서 __dirname을 사용하기 위한 설정입니다
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 환경 변수를 로드합니다
dotenv.config();

// Prisma 클라이언트를 가져옵니다 (데이터베이스 연결을 초기화)
import { prisma } from './prisma.js';

// 에러 핸들러 미들웨어를 가져옵니다
import { errorHandler, notFoundHandler, asyncHandler } from './lib/errors/errorHandler.js';

// 라우터 모듈들을 가져옵니다
import productsRouter from './routers/productsRouters.js';
import articlesRouter from './routers/articlesRouter.js';
import commentsRouter from './routers/commentsRouter.js';
import uploadRouter from './routers/uploadRouters.js';

// Express 애플리케이션을 생성합니다
const app = express();

// 서버 포트를 설정합니다 (환경 변수가 없으면 3000번 포트 사용)
const PORT = process.env.PORT || 3000;

// CORS(Cross-Origin Resource Sharing) 설정을 합니다
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://your-frontend-domain.com'] // 프로덕션 환경에서는 특정 도메인만 허용
        : ['http://localhost:3000', 'http://localhost:3001'], // 개발 환경에서는 로컬호스트 허용
    credentials: true, // 쿠키나 인증 정보를 포함한 요청을 허용
  }),
);

// JSON 형태의 요청 본문을 파싱하는 미들웨어입니다 (최대 10MB)
app.use(express.json({ limit: '10mb' }));

// URL 인코딩된 요청 본문을 파싱하는 미들웨어입니다 (최대 10MB)
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 정적 파일을 서빙하는 미들웨어입니다 (업로드된 이미지 파일들)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// 라우터를 등록합니다 (express.Router()를 활용한 라우트 모듈화)
app.use('/api/products', productsRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/upload', uploadRouter);

// favicon 요청 처리 (브라우저가 자동으로 요청함)
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// 서버 상태를 확인하는 헬스 체크 엔드포인트입니다
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '서버가 정상적으로 작동 중입니다.',
    timestamp: new Date().toISOString(),
  });
});

// 루트 경로에 대한 응답입니다 (API 정보 제공)
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '중고마켓 & 자유게시판 API 서버',
    version: '1.0.0',
    endpoints: {
      products: '/api/products', // 상품 API
      articles: '/api/articles', // 게시글 API
      comments: '/api/comments', // 댓글 API
      upload: '/api/upload', // 파일 업로드 API
      health: '/api/health', // 헬스 체크 API
    },
  });
});

// 404 에러를 처리하는 미들웨어입니다 (위의 라우트들에 매칭되지 않는 요청)
app.use(notFoundHandler);

// 모든 에러를 처리하는 미들웨어입니다 (가장 마지막에 위치해야 함)
app.use(errorHandler);

// 서버를 시작합니다
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`🌍 환경: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📝 API 문서: http://localhost:${PORT}/`);
});

// Express 앱을 내보냅니다 (테스트용)
export default app;
