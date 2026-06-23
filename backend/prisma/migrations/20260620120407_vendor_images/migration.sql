-- CreateTable
CREATE TABLE "VendorImage" (
    "id" SERIAL NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "altText" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VendorImage_vendorId_idx" ON "VendorImage"("vendorId");

-- AddForeignKey
ALTER TABLE "VendorImage" ADD CONSTRAINT "VendorImage_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
