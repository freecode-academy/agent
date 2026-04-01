-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "contentV2" TEXT;

-- CreateTable
CREATE TABLE "TelegramAccount" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "externalKey" INTEGER NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "username" TEXT,
    "photo_url" TEXT,
    "auth_date" TIMESTAMP(0),
    "userId" VARCHAR(32) NOT NULL,

    CONSTRAINT "TelegramAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TelegramAccount_externalKey_key" ON "TelegramAccount"("externalKey");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramAccount_userId_key" ON "TelegramAccount"("userId");

-- AddForeignKey
ALTER TABLE "TelegramAccount" ADD CONSTRAINT "TelegramAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
