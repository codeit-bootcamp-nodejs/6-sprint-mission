/*
  Warnings:

  - The `tags` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];
