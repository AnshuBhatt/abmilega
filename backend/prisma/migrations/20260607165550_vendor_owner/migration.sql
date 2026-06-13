-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "ownerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
