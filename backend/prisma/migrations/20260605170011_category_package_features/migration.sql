-- CreateTable
CREATE TABLE "CategoryPackageFeatureTemplate" (
    "categoryId" INTEGER NOT NULL,
    "featureId" INTEGER NOT NULL,

    CONSTRAINT "CategoryPackageFeatureTemplate_pkey" PRIMARY KEY ("categoryId","featureId")
);

-- AddForeignKey
ALTER TABLE "CategoryPackageFeatureTemplate" ADD CONSTRAINT "CategoryPackageFeatureTemplate_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryPackageFeatureTemplate" ADD CONSTRAINT "CategoryPackageFeatureTemplate_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "PackageFeatureTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
