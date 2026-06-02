-- CreateTable
CREATE TABLE "DifficultyColor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "colorCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DifficultyColor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DifficultyColor_name_key" ON "DifficultyColor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DifficultyColor_colorCode_key" ON "DifficultyColor"("colorCode");
