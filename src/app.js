import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import errorHandler from './middlewares/errorHandler.js';
// import userRouter from './routes/user.router.js';
// import productRouter from './routes/product.router.js';
// import articleRouter from './routes/article.router.js';
// import commentRouter from './routes/comment.router.js';
// import uploadRouter from './routes/upload.router.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('두려워하지 마십시오. 죽음이 끝은 아닙니다.');
});

// //중고마켓
// app.use('/products', productRouter);

// //자유게시판
// app.use('/articles', articleRouter);

// //댓글
// app.use('/comments', commentRouter);

// //이미지
// app.use('/uploads', uploadRouter);

// //마지막에 실행.
// app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`열려라 참깨! 시스템: ${process.env.PORT || 3000} 문이 열립니다. ( b^-^)b`);
});
