import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routers/productsRouter.js';
import articlesRouter from './routers/articlesRouter.js';
import commentsRouter from './routers/commentsRouter.js';
import imagesRouter from './routers/imagesRouter.js';
import { errorHandler } from './controllers/errorController.js';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const origins = process.env.CORS_ORIGIN?.split(',') || [];
app.use(cors({ origin: origins.length ? origins : true }));

app.use(
  '/uploads',
  express.static(
    path.join(__dirname, '..', process.env.UPLOAD_DIR || 'public/uploads')
  )
);

app.use('/products', productsRouter);
app.use('/articles', articlesRouter);
app.use('/comments', commentsRouter);
app.use('/images', imagesRouter);

app.get('/', (req, res) => res.json({ ok: true }));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
