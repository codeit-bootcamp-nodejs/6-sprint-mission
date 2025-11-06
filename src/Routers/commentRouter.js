import express from 'express';
import { Prisma } from '@prisma/client';
import {
    GetComment,
    PostComment,
    GetCommentById,
    PatchCommentById,
    DeleteCommentById
} from '../apis/commentapi.js';

const commentRouter = express.Router();

commentRouter.route('/')
    .get(GetComment)
    .post(PostComment);

commentRouter.route('/:id')
    .get(GetCommentById)
    .patch(PatchCommentById)
    .delete(DeleteCommentById);


commentRouter.use((err, req, res, next) => {
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

export default commentRouter;