-- CreateTable
CREATE TABLE "CategoryStatTemplate" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "icon" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CategoryStatTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorStat" (
    "id" SERIAL NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "templateId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "VendorStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmenityTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "AmenityTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryAmenityTemplate" (
    "categoryId" INTEGER NOT NULL,
    "amenityId" INTEGER NOT NULL,

    CONSTRAINT "CategoryAmenityTemplate_pkey" PRIMARY KEY ("categoryId","amenityId")
);

-- CreateTable
CREATE TABLE "VendorAmenity" (
    "vendorId" INTEGER NOT NULL,
    "amenityId" INTEGER NOT NULL,

    CONSTRAINT "VendorAmenity_pkey" PRIMARY KEY ("vendorId","amenityId")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageFeature" (
    "id" SERIAL NOT NULL,
    "packageId" INTEGER NOT NULL,
    "feature" TEXT NOT NULL,

    CONSTRAINT "PackageFeature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VendorStat_vendorId_idx" ON "VendorStat"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "AmenityTemplate_slug_key" ON "AmenityTemplate"("slug");

-- CreateIndex
CREATE INDEX "VendorAmenity_vendorId_idx" ON "VendorAmenity"("vendorId");

-- CreateIndex
CREATE INDEX "Package_vendorId_idx" ON "Package"("vendorId");

-- CreateIndex
CREATE INDEX "Vendor_categoryId_idx" ON "Vendor"("categoryId");

-- CreateIndex
CREATE INDEX "Vendor_cityId_idx" ON "Vendor"("cityId");

-- AddForeignKey
ALTER TABLE "CategoryStatTemplate" ADD CONSTRAINT "CategoryStatTemplate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorStat" ADD CONSTRAINT "VendorStat_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorStat" ADD CONSTRAINT "VendorStat_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "CategoryStatTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryAmenityTemplate" ADD CONSTRAINT "CategoryAmenityTemplate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryAmenityTemplate" ADD CONSTRAINT "CategoryAmenityTemplate_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "AmenityTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorAmenity" ADD CONSTRAINT "VendorAmenity_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorAmenity" ADD CONSTRAINT "VendorAmenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "AmenityTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageFeature" ADD CONSTRAINT "PackageFeature_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
