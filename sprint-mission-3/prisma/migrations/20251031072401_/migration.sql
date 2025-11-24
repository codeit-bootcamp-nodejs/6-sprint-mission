/*
  Warnings:

  - Made the column `productId` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "productId" SET NOT NULL,
ALTER COLUMN "authorId" SET NOT NULL;
