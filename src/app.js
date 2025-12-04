import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { defaultNotFoundHandler, globalErrorHandler } from './middleware/errorHandler.js';
import { PUBLIC_IMG_PATH, STATIC_IMG_PATH } from './lib/constants.js';
import { PORT } from './lib/constants.js';
import userRouter from './router/user.router.js';
import productRouter from './router/product.router.js';
import articleRouter from './router/article.router.js';
import commentRouter from './router/comment.router.js';
import imageRouter from './router/image.router.js';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(
  path.join(PUBLIC_IMG_PATH, 'product'),
  express.static(path.join(STATIC_IMG_PATH, 'product'))
);
app.use(
  path.join(PUBLIC_IMG_PATH, 'article'),
  express.static(path.join(STATIC_IMG_PATH, 'article'))
);
app.use(path.join(PUBLIC_IMG_PATH, 'user'), express.static(path.join(STATIC_IMG_PATH, 'user')));

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);
app.use('/images', imageRouter);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
