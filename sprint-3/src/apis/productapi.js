import { PrismaClient } from '@prisma/client';
import { assert } from 'superstruct';
import { CreateProduct, PatchProduct } from '../libs/structs.js';


const prisma = new PrismaClient();

export async function GetProduct(req, res) {
    const { offset = 0, limit = 0, order = 'newset', name = "", description = "" } = req.query;
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
            name: {
                contains: name,
            },
            description: {
                contains: description,
            },
        },
        orderBy,
        skip: parsedOffset,
    };

    if (!Number.isNaN(parsedLimit) && parsedLimit > 0) {
        findOptions.take = parsedLimit;
    }

    const product = await prisma.product.findMany(findOptions);
    res.send(product);
}


export async function GetProductById(req, res) {
    const { id } = req.params;
    const product = await prisma.product.findUniqueOrThrow({
        where: {
            id
        },
    });
    res.send(product);
}

export async function PostProduct(req, res) {
    assert(req.body, CreateProduct);
    const { ...userFields } = req.body;
    const product = await prisma.product.create({
        data: {
            ...userFields
        },
    });
    res.status(201).send(product);
}

export async function PatchProductById(req, res) {
    const { id } = req.params;
    assert(req.body, PatchProduct);
    const { ...userFields } = req.body;
    const Product = await prisma.product.update({
        where: {
            id
        },
        data: {
            ...userFields
        },
    });
    res.send(Product);
}

export async function DeleteProductById(req, res) {
    const { id } = req.params;
    const Product = await prisma.product.delete({
        where: {
            id
        },
    });
    res.send(Product);
}