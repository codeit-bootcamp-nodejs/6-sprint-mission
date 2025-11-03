import express from 'express';
import { Prisma } from '@prisma/client';
import {
    GetArticle,
    PostArticle,
    GetArticleById,
    PatchArticleById,
    DeleteArticleById
} from '../apis/articleapi.js';

const articleRouter = express.Router();



articleRouter.route('/')
    .get(GetArticle)
    .post(PostArticle);

articleRouter.route('/:id')
    .get(GetArticleById)
    .patch(PatchArticleById)
    .delete(DeleteArticleById);


articleRouter.use((err, req, res, next) => {
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

export default articleRouter;