/*
  Warnings:

  - You are about to drop the column `createdAt` on the `VendorImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VendorImage" DROP COLUMN "createdAt",
ADD COLUMN     "mediaType" TEXT;

-- CreateTable
CREATE TABLE "CategorySectionTemplate" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CategorySectionTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryFieldTemplate" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "fieldType" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "placeholder" TEXT,
    "helpText" TEXT,
    "validationJson" JSONB,
    "defaultValue" JSONB,

    CONSTRAINT "CategoryFieldTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryFieldOption" (
    "id" SERIAL NOT NULL,
    "fieldId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CategoryFieldOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorFieldValue" (
    "id" SERIAL NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "fieldId" INTEGER NOT NULL,
    "valueJson" JSONB,

    CONSTRAINT "VendorFieldValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorSocialLink" (
    "id" SERIAL NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "VendorSocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CategorySectionTemplate_categoryId_idx" ON "CategorySectionTemplate"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "CategorySectionTemplate_categoryId_key_key" ON "CategorySectionTemplate"("categoryId", "key");

-- CreateIndex
CREATE INDEX "CategoryFieldTemplate_sectionId_idx" ON "CategoryFieldTemplate"("sectionId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryFieldTemplate_sectionId_key_key" ON "CategoryFieldTemplate"("sectionId", "key");

-- CreateIndex
CREATE INDEX "CategoryFieldOption_fieldId_idx" ON "CategoryFieldOption"("fieldId");

-- CreateIndex
CREATE INDEX "VendorFieldValue_vendorId_idx" ON "VendorFieldValue"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "VendorFieldValue_vendorId_fieldId_key" ON "VendorFieldValue"("vendorId", "fieldId");

-- CreateIndex
CREATE INDEX "VendorSocialLink_vendorId_idx" ON "VendorSocialLink"("vendorId");

-- AddForeignKey
ALTER TABLE "CategorySectionTemplate" ADD CONSTRAINT "CategorySectionTemplate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryFieldTemplate" ADD CONSTRAINT "CategoryFieldTemplate_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "CategorySectionTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryFieldOption" ADD CONSTRAINT "CategoryFieldOption_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "CategoryFieldTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorFieldValue" ADD CONSTRAINT "VendorFieldValue_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorFieldValue" ADD CONSTRAINT "VendorFieldValue_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "CategoryFieldTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorSocialLink" ADD CONSTRAINT "VendorSocialLink_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
