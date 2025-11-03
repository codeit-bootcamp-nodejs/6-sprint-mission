import express from 'express';
import { Prisma } from '@prisma/client';
import {
    GetProduct,
    PostProduct,
    GetProductById,
    PatchProductById,
    DeleteProductById
} from '../apis/productapi.js';

const productRouter = express.Router();



productRouter.route('/')
    .get(GetProduct)
    .post(PostProduct);

productRouter.route('/:id')
    .get(GetProductById)
    .patch(PatchProductById)
    .delete(DeleteProductById);


productRouter.use((err, req, res, next) => {
    console.error(err.name);
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code == "P2025") {
        res.sendStatus(404);
    } else if (err instanceof Prisma.PrismaClientKnownRequestError && err.code == "P2002") {
        res.status(400).send({ message: err.message });
    } else if (err.name == "StructError") {
        res.status(400).send({ message: err.message });
    } else {
        res.status(500).send({ message: err.message });
    }
});

export default productRouter;