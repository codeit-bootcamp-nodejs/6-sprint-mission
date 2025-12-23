/*
  Warnings:

  - The values [ARTICLE_COMMENT,PRODUCT_PRICE_CHANGE] on the enum `NoficationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NoficationType_new" AS ENUM ('ARTICLE', 'PRODUCT');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "NoficationType_new" USING ("type"::text::"NoficationType_new");
ALTER TYPE "NoficationType" RENAME TO "NoficationType_old";
ALTER TYPE "NoficationType_new" RENAME TO "NoficationType";
DROP TYPE "NoficationType_old";
COMMIT;
