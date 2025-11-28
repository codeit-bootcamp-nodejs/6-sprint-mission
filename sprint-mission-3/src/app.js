import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler.js';
import productRouter from './routers/productRouter.js';
import articleRouter from './routers/articleRouter.js';
import commentRouter from './routers/commentRouter.js';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('두려워하지 마십시오. 죽음이 끝은 아닙니다.');
});

//중고마켓
app.use('/products', productRouter);

//자유게시판
app.use('/articles', articleRouter);

//댓글
app.use('/comments', commentRouter);

//이미지
app.use('/uploads', uploadRouter);

//마지막에 실행.
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`열려라 참깨! 시스템: ${process.env.PORT || 3000} 문이 열립니다. ( b^-^)b`);
});
