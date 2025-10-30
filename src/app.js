// src/app.js
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { Prisma } from '@prisma/client';

//-----------------------------------------

import { PORT } from './constants.js';
import productsRouter from './routes/products.js';
import articlesRouter from './routes/articles.js';
import productCommentsRouter from './routes/productComments.js';

const app = express();

app.use(cors());
app.use(express.json());

//-----------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//-----------------------------------------

app.use('/products', productsRouter);
app.use('/articles', articlesRouter);
app.use('/product-comments', productCommentsRouter);

//-----------------------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
  filename: (req, file, cb) => {
    const ext =
      path.extname(file.originalname) ||
      (file.mimetype === 'image/jpeg'
        ? '.jpg'
        : file.mimetype === 'image/png'
        ? '.png'
        : '');
    cb(null, crypto.randomUUID() + ext);
  },
});

const upload = multer({ storage });

app.route('/upload').post(upload.single('image'), (req, res) => {
  const contentType = req.headers['content-type'] || 'else-type';
  if (!contentType.startsWith('multipart/form-data')) {
    console.warn(`else-type: ${contentType}`);
    // * 멘토님 조언대로 찾아보니, warn이 경고 로그라 해서 넣어봤는데 적절한지? *
  } else {
    console.log(`content-type: ${contentType}`);
  } // * content-type이 아닐 수도 있어서 확인을 위해 의도함 *
  console.log(`upload result: ${Boolean(req.file)}`);
  // * postman 실행 시 성공 값을 알기 위해 boolean 의도함 *
  if (!req.file) {
    return res
      .status(400)
      .send({ message: '업로드된 파일이 없습니다. 요청을 다시 확인해주세요' });
  }
  return res.status(201).send({ path: `/uploads/${req.file.filename}` });
});

//-----------------------------------------

app.route('/health').get((_, res) => res.send({ ok: true }));

app.use((req, res) => {
  res.status(404).send({ message: 'Not Found' });
});

app.use((e, req, res, next) => {
  let status = e.status || 500;
  let message = e.message || 'Server Error';

  if (e.name === 'StructError') {
    status = 400;
  }
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2025') status = 404;
  }
  res.status(status).send({ message });
});

//-----------------------------------------

const port = Number(PORT) || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
