-- CreateTable
CREATE TABLE "VendorReview" (
    "id" SERIAL NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "reviewerName" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VendorReview_vendorId_idx" ON "VendorReview"("vendorId");

-- AddForeignKey
ALTER TABLE "VendorReview" ADD CONSTRAINT "VendorReview_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
