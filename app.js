import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import productRouter from './routes/products.js';
import articleRouter from './routes/articles.js';
import commentRouter from './routes/comments.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // 이미지 접근
app.use('/products', productRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running...');
});
