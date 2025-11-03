/*
  Warnings:

  - You are about to drop the column `tag` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "tag",
ADD COLUMN     "tags" TEXT;
