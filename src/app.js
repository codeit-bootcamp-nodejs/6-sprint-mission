import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { defaultNotFoundHandler, globalErrorHandler } from './middleware/errorHandler.js';
import { PORT } from './lib/constants.js';
import userRouter from './router/userRouter.js';
import productRouter from './router/productRouter.js';
import articleRouter from './router/articleRouter.js';
import commentRouter from './router/commentRouter.js';
// import imageRouter from './router/imageRouter.js';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);
// app.use('/images', imageRouter);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
