/*
  Warnings:

  - You are about to drop the column `category` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Vendor` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Made the column `rating` on table `Vendor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "category",
DROP COLUMN "city",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "cityId" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "rating" SET NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "City_slug_key" ON "City"("slug");

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
