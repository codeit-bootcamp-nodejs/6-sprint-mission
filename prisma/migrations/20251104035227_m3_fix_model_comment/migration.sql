/*
  Warnings:

  - The `tags` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `images` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Reply2Article` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply2Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CommentType" AS ENUM ('Product', 'Article');

-- DropForeignKey
ALTER TABLE "Reply2Article" DROP CONSTRAINT "Reply2Article_articleId_fkey";

-- DropForeignKey
ALTER TABLE "Reply2Product" DROP CONSTRAINT "Reply2Product_productId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[],
DROP COLUMN "images",
ADD COLUMN     "images" TEXT[];

-- DropTable
DROP TABLE "Reply2Article";

-- DropTable
DROP TABLE "Reply2Product";

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "CommentType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productId" TEXT,
    "articleId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;
