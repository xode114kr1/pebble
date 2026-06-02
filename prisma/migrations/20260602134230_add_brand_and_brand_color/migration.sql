-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrandColor" (
    "id" SERIAL NOT NULL,
    "brandId" INTEGER NOT NULL,
    "difficultyColorId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BrandColor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BrandColor_brandId_difficultyColorId_key" ON "BrandColor"("brandId", "difficultyColorId");

-- CreateIndex
CREATE UNIQUE INDEX "BrandColor_brandId_order_key" ON "BrandColor"("brandId", "order");

-- AddForeignKey
ALTER TABLE "BrandColor" ADD CONSTRAINT "BrandColor_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrandColor" ADD CONSTRAINT "BrandColor_difficultyColorId_fkey" FOREIGN KEY ("difficultyColorId") REFERENCES "DifficultyColor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
