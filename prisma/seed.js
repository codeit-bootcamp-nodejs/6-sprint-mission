import { PrismaClient } from "@prisma/client";
import { PRODUCTS } from './mock.js';

const prisma = new PrismaClient();

async function main() {
    await prisma.product.deleteMany({});
    await prisma.product.createMany({
        data: PRODUCTS,
        skipDuplicates: true,
    });
    await prisma.article.deleteMany({});
    await prisma.articleproduct.createMany({
        data: ARTICLES,
        skipDuplicates: true,
    });
}

main().then(async () => { await prisma.$disconnect(); })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });