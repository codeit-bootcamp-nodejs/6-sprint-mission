import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import http from 'http';
import { setupSocket } from './websocket/socketIO';
import { defaultNotFoundHandler, globalErrorHandler } from './middleware/errorHandler';
import { PUBLIC_IMG_PATH, STATIC_IMG_PATH } from './lib/constants';
import { PORT } from './lib/constants';
import authRouter from './router/auth.router';
import userRouter from './router/user.router';
import productRouter from './router/product.router';
import articleRouter from './router/article.router';
import commentRouter from './router/comment.router';
import imageRouter from './router/image.router';
import notiRouter from './router/notification.router';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(process.cwd(), 'public')));
const server = http.createServer(app);
setupSocket(server);

app.use(
  path.join(PUBLIC_IMG_PATH, 'product'),
  express.static(path.join(STATIC_IMG_PATH, 'product'))
);
app.use(
  path.join(PUBLIC_IMG_PATH, 'article'),
  express.static(path.join(STATIC_IMG_PATH, 'article'))
);
app.use(path.join(PUBLIC_IMG_PATH, 'user'), express.static(path.join(STATIC_IMG_PATH, 'user')));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/notifications', notiRouter);
app.use('/products', productRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);
app.use('/images', imageRouter);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
