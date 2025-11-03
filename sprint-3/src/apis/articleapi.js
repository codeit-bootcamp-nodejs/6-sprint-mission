import { PrismaClient } from '@prisma/client';
import { assert } from 'superstruct';
import { CreateArticle, PatchArticle } from '../libs/structs.js';


const prisma = new PrismaClient();

export async function GetArticle(req, res) {
    const { offset = 0, limit = 0, order = 'newset', title = "", content = "" } = req.query;
    let orderBy;
    switch (order) {
        case 'oldest':
            orderBy = { createdAt: 'asc' };
            break;
        case 'newest':
            orderBy = { createdAt: 'desc' };
            break;
        default:
            orderBy = { createdAt: 'desc' };
    }
    // parse offset/limit and only include `take` when a positive integer is provided
    const parsedOffset = Number.isNaN(parseInt(offset)) ? 0 : parseInt(offset);
    const parsedLimit = parseInt(limit);

    const findOptions = {
        where: {
            title: {
                contains: title,
            },
            content: {
                contains: content,
            },
        },
        orderBy,
        skip: parsedOffset,
    };

    if (!Number.isNaN(parsedLimit) && parsedLimit > 0) {
        findOptions.take = parsedLimit;
    }

    const article = await prisma.article.findMany(findOptions);
    res.send(article);
}


export async function GetArticleById(req, res) {
    const { id } = req.params;
    const article = await prisma.article.findUniqueOrThrow({
        where: {
            id
        },
    });
    res.send(article);
}

export async function PostArticle(req, res) {
    assert(req.body, CreateArticle);
    const { ...userFields } = req.body;
    const article = await prisma.article.create({
        data: {
            ...userFields
        },
    });
    res.status(201).send(article);
}

export async function PatchArticleById(req, res) {
    const { id } = req.params;
    assert(req.body, PatchArticle);
    const { ...userFields } = req.body;
    const article = await prisma.article.update({
        where: {
            id
        },
        data: {
            ...userFields
        },
    });
    res.send(article);
}

export async function DeleteArticleById(req, res) {
    const { id } = req.params;
    const article = await prisma.article.delete({
        where: {
            id
        },
    });
    res.send(article);
}


