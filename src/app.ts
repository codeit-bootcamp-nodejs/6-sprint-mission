// TODO) App: 서버 진입점
// &) Config Import
import './config/env.js'; // 맨 위 필수!
import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import http from 'http';

// &) Core Import
import { debugLog } from './core/error/debug.js';
import { errorHandler, notFoundHandler } from './core/error/error-handler.js';

// &) Route Import
import healthRoutes from './routes/health-routes.js';
import uploadRoutes from './routes/upload-routes.js';
import productsRoutes from './routes/product-routes.js';
import articlesRoutes from './routes/article-routes.js';
import productCommentsRoutes from './routes/product-comment-routes.js';
import articleCommentsRoutes from './routes/article-comment-routes.js';
import userRoutes from './routes/user-routes.js';
import productLikeRoutes from './routes/product-like-routes.js';
import articleLikeRoutes from './routes/article-like-routes.js';
import notificationRoutes from './routes/notification-routes.js';
import { initSocket } from './socket/io.js';

// ?) 환경 변수
const PORT = Number(process.env.PORT ?? 4000);

// ?) Express 진입
const app = express();
const server = http.createServer(app);

// ?) 미들 웨어 진입
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ?) 이미지 정적 경로 진입
app.use(
  '/uploads',
  express.static(path.join(process.cwd(), 'public', 'uploads'))
);

// ?) 라우터 진입 (핵심)
app.use('/health', healthRoutes); // 헬스 체크
app.use('/upload', uploadRoutes); // 이미지
app.use('/products', productsRoutes); // 상품
app.use('/articles', articlesRoutes); // 게시글
app.use('/product-comments', productCommentsRoutes); // 상품 댓글
app.use('/article-comments', articleCommentsRoutes); // 게시글 댓글
app.use('/users', userRoutes); // 유저
app.use('/product-likes', productLikeRoutes); // 상품 좋아요
app.use('/article-likes', articleLikeRoutes); // 게시글 좋아요
app.use('/notifications', notificationRoutes); // 알림

// ?) 404 핸들러 진입
app.use(notFoundHandler);

// ?) 전역 에러 핸들러 진입 (맨 마지막!)
app.use(errorHandler);

// ?) 서버 실행 진입
initSocket(server);

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`🚀 Server is running on port http://localhost:${PORT}`);
    debugLog('Debug mode is enabled');
    debugLog(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

export { app, server };
