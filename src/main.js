import cors from 'cors';
import express from 'express';
import { PORT } from './lib/prisma.js';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import articleRouter from './routers/articleRouter.js';
import { uploadsPath } from './middlewares/imageUpload.js';
import { errorHandler } from './middlewares/errorController.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/articles', articleRouter);
app.use('/uploads', express.static(uploadsPath));

app.use(errorHandler);

// listener
app.listen(PORT || 3000, () =>
  console.log(`Server listening on port ${PORT}!`),
);
