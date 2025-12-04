import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import authRouter from './routers/auth.router.js';
import usersRouter from './routers/users.router.js';
import productsRouter from './routers/products.router.js';
import articlesRouter from './routers/articles.router.js';
import postsRouter from './routers/posts.router.js'; // 새로 만든 posts.router.js 임포트
import commentsRouter from './routers/comments.router.js';
import { PORT } from './lib/constants.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors());

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(cookieParser());
app.use(express.json());

// API routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/posts', postsRouter); // /api/posts 경로에 새로운 postsRouter 할당
app.use('/api/comments', commentsRouter);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  // Log the error for debugging purposes. Consider using a logger like Winston.
  console.error(err);

  // Send a generic error message to the client
  // Avoid sending stack trace in production
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
