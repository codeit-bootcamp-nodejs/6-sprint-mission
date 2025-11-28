/*
  Warnings:

  - You are about to drop the `ArticleComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArticleComment" DROP CONSTRAINT "ArticleComment_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleComment" DROP CONSTRAINT "ArticleComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProductComment" DROP CONSTRAINT "ProductComment_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductComment" DROP CONSTRAINT "ProductComment_userId_fkey";

-- DropTable
DROP TABLE "ArticleComment";

-- DropTable
DROP TABLE "ProductComment";

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "articleId" INTEGER,
    "productId" INTEGER,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
