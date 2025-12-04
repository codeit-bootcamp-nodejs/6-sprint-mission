/*
  Warnings:

  - You are about to drop the `_LikedProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LikedProducts" DROP CONSTRAINT "_LikedProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikedProducts" DROP CONSTRAINT "_LikedProducts_B_fkey";

-- DropTable
DROP TABLE "_LikedProducts";

-- CreateTable
CREATE TABLE "_likedProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_likedProducts_AB_unique" ON "_likedProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_likedProducts_B_index" ON "_likedProducts"("B");

-- AddForeignKey
ALTER TABLE "_likedProducts" ADD CONSTRAINT "_likedProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedProducts" ADD CONSTRAINT "_likedProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
