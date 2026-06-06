-- CreateTable
CREATE TABLE "VendorEvent" (
    "id" SERIAL NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "eventType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VendorEvent_vendorId_idx" ON "VendorEvent"("vendorId");

-- CreateIndex
CREATE INDEX "VendorEvent_eventType_idx" ON "VendorEvent"("eventType");

-- AddForeignKey
ALTER TABLE "VendorEvent" ADD CONSTRAINT "VendorEvent_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
