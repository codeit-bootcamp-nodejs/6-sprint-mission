import express from 'express';
import { PORT } from './libs/constants.js';
import productRouter from './Routers/productRouter.js';
import articleRouter from './Routers/articleRouter.js';
import commentRouter from './Routers/commentRouter.js';
import uploadRouter from './Routers/uploadRouter.js';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());


app.use('/products', productRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);
app.use('/files', uploadRouter);

app.listen(PORT, () => {
    console.log(`Server is running`);
});