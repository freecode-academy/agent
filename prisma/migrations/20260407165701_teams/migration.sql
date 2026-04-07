/*
  Warnings:

  - A unique constraint covering the columns `[Team,User]` on the table `TeamMember` will be added. If there are existing duplicate values, this will fail.
  - Made the column `User` on table `TeamMember` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TeamMemberStatus" ADD VALUE 'Applied';
ALTER TYPE "TeamMemberStatus" ADD VALUE 'Rejected';

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_User_fkey";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "content" TEXT;

-- AlterTable
ALTER TABLE "TeamMember" ALTER COLUMN "User" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_Team_User_key" ON "TeamMember"("Team", "User");

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_User_fkey" FOREIGN KEY ("User") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
