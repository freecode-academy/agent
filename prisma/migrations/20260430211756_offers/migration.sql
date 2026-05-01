-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "description" VARCHAR(3072),
ADD COLUMN     "image" VARCHAR(1024),
ADD COLUMN     "intro" TEXT;

-- CreateTable
CREATE TABLE "Offer" (
    "id" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(512) NOT NULL,
    "description" VARCHAR(3072),
    "intro" TEXT,
    "content" TEXT,
    "image" VARCHAR(1024),
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdById" VARCHAR(36) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Offer_createdById_idx" ON "Offer"("createdById");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
