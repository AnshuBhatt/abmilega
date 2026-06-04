/*
  Warnings:

  - You are about to drop the `Package` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PackageFeature` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "PackageFeature" DROP CONSTRAINT "PackageFeature_packageId_fkey";

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "pricingUnit" TEXT,
ADD COLUMN     "showPackages" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startingPrice" TEXT;

-- DropTable
DROP TABLE "Package";

-- DropTable
DROP TABLE "PackageFeature";

-- CreateTable
CREATE TABLE "CategoryPackageTemplate" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CategoryPackageTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageFeatureTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "PackageFeatureTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorPackage" (
    "id" SERIAL NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "packageTemplateId" INTEGER NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "VendorPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorPackageFeature" (
    "packageId" INTEGER NOT NULL,
    "featureId" INTEGER NOT NULL,

    CONSTRAINT "VendorPackageFeature_pkey" PRIMARY KEY ("packageId","featureId")
);

-- CreateIndex
CREATE INDEX "CategoryPackageTemplate_categoryId_idx" ON "CategoryPackageTemplate"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "PackageFeatureTemplate_slug_key" ON "PackageFeatureTemplate"("slug");

-- CreateIndex
CREATE INDEX "VendorPackage_vendorId_idx" ON "VendorPackage"("vendorId");

-- CreateIndex
CREATE INDEX "VendorPackage_packageTemplateId_idx" ON "VendorPackage"("packageTemplateId");

-- CreateIndex
CREATE INDEX "CategoryStatTemplate_categoryId_idx" ON "CategoryStatTemplate"("categoryId");

-- AddForeignKey
ALTER TABLE "CategoryPackageTemplate" ADD CONSTRAINT "CategoryPackageTemplate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorPackage" ADD CONSTRAINT "VendorPackage_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorPackage" ADD CONSTRAINT "VendorPackage_packageTemplateId_fkey" FOREIGN KEY ("packageTemplateId") REFERENCES "CategoryPackageTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorPackageFeature" ADD CONSTRAINT "VendorPackageFeature_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "VendorPackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorPackageFeature" ADD CONSTRAINT "VendorPackageFeature_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "PackageFeatureTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
