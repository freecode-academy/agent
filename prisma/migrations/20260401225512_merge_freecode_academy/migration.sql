/*
  Warnings:

  - The primary key for the `ChatMessage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ChatMessage` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `VarChar(32)`.
  - You are about to alter the column `createdBy` on the `ChatMessage` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `VarChar(32)`.
  - You are about to alter the column `toUserId` on the `ChatMessage` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `VarChar(32)`.
  - You are about to alter the column `createdById` on the `MindLog` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `VarChar(32)`.
  - You are about to alter the column `relatedToUserId` on the `MindLog` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `VarChar(32)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(72)`.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('newbie', 'active', 'blocked');

-- CreateEnum
CREATE TYPE "KBLabelRole" AS ENUM ('primary', 'synonym', 'alias', 'abbreviation');

-- CreateEnum
CREATE TYPE "KBFactStatus" AS ENUM ('unverified', 'tentative', 'verified', 'disputed', 'deprecated');

-- CreateEnum
CREATE TYPE "KBFactType" AS ENUM ('raw', 'derived');

-- CreateEnum
CREATE TYPE "KBConflictStatus" AS ENUM ('open', 'resolved', 'dismissed');

-- CreateEnum
CREATE TYPE "KBIdentityOperationType" AS ENUM ('merge', 'split');

-- CreateEnum
CREATE TYPE "KBProposalStatus" AS ENUM ('untested', 'tested', 'confirmed', 'rejected');

-- CreateEnum
CREATE TYPE "KBDecisionStatus" AS ENUM ('superseded', 'context_invalid', 'still_valid');

-- CreateEnum
CREATE TYPE "KBKnowledgeSpaceType" AS ENUM ('private', 'shared', 'public');

-- CreateEnum
CREATE TYPE "KBFactProjectionVisibility" AS ENUM ('visible', 'hidden');

-- CreateEnum
CREATE TYPE "EXReflexType" AS ENUM ('unconditional', 'conditional');

-- CreateEnum
CREATE TYPE "EXReflexStatus" AS ENUM ('active', 'disabled', 'draft');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('TopUp', 'TransferOut', 'TransferIn');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('draft', 'published', 'unpublished');

-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_toUserId_fkey";

-- DropForeignKey
ALTER TABLE "MindLog" DROP CONSTRAINT "MindLog_createdById_fkey";

-- AlterTable
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "createdBy" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "toUserId" SET DATA TYPE VARCHAR(32),
ADD CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MindLog" ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "relatedToUserId" SET DATA TYPE VARCHAR(32);

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "TelegramAccount" ALTER COLUMN "createdAt" SET DATA TYPE DATE,
ALTER COLUMN "updatedAt" SET DATA TYPE DATE,
ALTER COLUMN "externalKey" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "referrerId" VARCHAR(32),
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'active',
ALTER COLUMN "password" SET DATA TYPE VARCHAR(72),
ALTER COLUMN "sudo" SET DEFAULT false;

-- AlterTable
ALTER TABLE "_PositionUsers" ADD CONSTRAINT "_PositionUsers_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_PositionUsers_AB_unique";

-- AlterTable
ALTER TABLE "_PrismaProjectUsers" ADD CONSTRAINT "_PrismaProjectUsers_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_PrismaProjectUsers_AB_unique";

-- AlterTable
ALTER TABLE "_ProjectCustomers" ADD CONSTRAINT "_ProjectCustomers_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProjectCustomers_AB_unique";

-- AlterTable
ALTER TABLE "_ProjectMemberServices" ADD CONSTRAINT "_ProjectMemberServices_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ProjectMemberServices_AB_unique";

-- CreateTable
CREATE TABLE "EthAccount" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" VARCHAR(42) NOT NULL,
    "userId" VARCHAR(32),

    CONSTRAINT "EthAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskWorkLog" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "taskId" VARCHAR(32) NOT NULL,
    "createdById" VARCHAR(32) NOT NULL,

    CONSTRAINT "TaskWorkLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KBConcept" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" VARCHAR(100),
    "name" VARCHAR(500) NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "createdById" VARCHAR(32) NOT NULL,

    CONSTRAINT "KBConcept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KBLabel" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" VARCHAR(500) NOT NULL,
    "language" VARCHAR(10),
    "role" "KBLabelRole" NOT NULL DEFAULT 'primary',
    "conceptId" VARCHAR(32) NOT NULL,
    "createdById" VARCHAR(32) NOT NULL,

    CONSTRAINT "KBLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KBFact" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" VARCHAR(32) NOT NULL,
    "type" VARCHAR(200) NOT NULL,
    "statement" TEXT NOT NULL,
    "validFrom" DATE,
    "validTo" DATE,
    "knownSince" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "status" "KBFactStatus" NOT NULL DEFAULT 'unverified',
    "source" TEXT,
    "importance" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "importanceBasis" JSONB,
    "factType" "KBFactType" NOT NULL DEFAULT 'raw',
    "derivedFrom" JSONB,

    CONSTRAINT "KBFact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KBFactParticipation" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conceptId" VARCHAR(32) NOT NULL,
    "factId" VARCHAR(32) NOT NULL,
    "role" VARCHAR(100) NOT NULL,
    "impact" VARCHAR(50),
    "value" TEXT,
    "localImportance" DOUBLE PRECISION NOT NULL DEFAULT 0.5,

    CONSTRAINT "KBFactParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KBConstraint" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "constraint" TEXT NOT NULL,
    "scope" JSONB,
    "createdById" VARCHAR(32) NOT NULL,

    CONSTRAINT "KBConstraint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KBConflict" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" VARCHAR(100) NOT NULL,
    "severity" VARCHAR(50) NOT NULL,
    "status" "KBConflictStatus" NOT NULL DEFAULT 'open',
    "createdById" VARCHAR(32) NOT NULL,
    "constraintId" VARCHAR(32),

    CONSTRAINT "KBConflict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KBConflictFact" (
    "conflictId" VARCHAR(32) NOT NULL,
    "factId" VARCHAR(32) NOT NULL,

    CONSTRAINT "KBConflictFact_pkey" PRIMARY KEY ("conflictId","factId")
);

-- CreateTable
CREATE TABLE "KBIdentityOperation" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "operation" "KBIdentityOperationType" NOT NULL,
    "rationale" TEXT,
    "createdById" VARCHAR(32) NOT NULL,

    CONSTRAINT "KBIdentityOperation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KBProposal" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statement" TEXT NOT NULL,
    "status" "KBProposalStatus" NOT NULL DEFAULT 'untested',
    "testedBy" VARCHAR(32),
    "createdById" VARCHAR(32) NOT NULL,

    CONSTRAINT "KBProposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KBDecision" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subject" VARCHAR(500) NOT NULL,
    "decision" TEXT NOT NULL,
    "context" JSONB,
    "outcome" JSONB,
    "status" "KBDecisionStatus" NOT NULL DEFAULT 'still_valid',
    "revisedById" VARCHAR(32),
    "basedOnProposalId" VARCHAR(32),
    "createdById" VARCHAR(32) NOT NULL,

    CONSTRAINT "KBDecision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KBKnowledgeSpace" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "KBKnowledgeSpaceType" NOT NULL DEFAULT 'private',
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "createdById" VARCHAR(32) NOT NULL,

    CONSTRAINT "KBKnowledgeSpace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KBFactProjection" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "factId" VARCHAR(32) NOT NULL,
    "knowledgeSpaceId" VARCHAR(32) NOT NULL,
    "visibility" "KBFactProjectionVisibility" NOT NULL DEFAULT 'visible',
    "trustLevel" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "importance" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "notes" TEXT,
    "createdById" VARCHAR(32) NOT NULL,

    CONSTRAINT "KBFactProjection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EXReflex" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "EXReflexType" NOT NULL DEFAULT 'conditional',
    "status" "EXReflexStatus" NOT NULL DEFAULT 'active',
    "stimulus" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "effectiveness" DOUBLE PRECISION,
    "executionRate" DOUBLE PRECISION,
    "createdById" VARCHAR(32) NOT NULL,

    CONSTRAINT "EXReflex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EXReaction" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reflexId" VARCHAR(32) NOT NULL,
    "stimulus" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "tokensUsed" INTEGER,
    "durationMs" INTEGER,
    "scoreAgent" DOUBLE PRECISION,
    "scoreTarget" DOUBLE PRECISION,
    "scoreMentor" DOUBLE PRECISION,
    "feedback" TEXT,
    "createdById" VARCHAR(32) NOT NULL,
    "relatedToUserId" VARCHAR(32),

    CONSTRAINT "EXReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balance" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" VARCHAR(32) NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(32) NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "title" TEXT,
    "parentId" VARCHAR(32),
    "balanceId" VARCHAR(32) NOT NULL,
    "ethTransactionId" VARCHAR(32),

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EthTransaction" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" VARCHAR(32) NOT NULL,
    "chainId" INTEGER NOT NULL,
    "txHash" VARCHAR(66) NOT NULL,
    "from" VARCHAR(42) NOT NULL,
    "to" VARCHAR(42) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "blockNumber" INTEGER,
    "message" TEXT NOT NULL,
    "signature" TEXT NOT NULL,

    CONSTRAINT "EthTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revision" INTEGER NOT NULL DEFAULT 1,
    "createdById" VARCHAR(32) NOT NULL,
    "status" "PostStatus" NOT NULL DEFAULT 'draft',
    "title" VARCHAR(512),
    "description" VARCHAR(3072),
    "intro" TEXT,
    "content" TEXT NOT NULL,
    "signature" TEXT,
    "parentId" VARCHAR(32),
    "rootId" VARCHAR(32),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostRevision" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" VARCHAR(32) NOT NULL,
    "status" "PostStatus" NOT NULL,
    "title" VARCHAR(512),
    "description" VARCHAR(3072),
    "intro" TEXT,
    "content" TEXT NOT NULL,
    "signature" TEXT,

    CONSTRAINT "PostRevision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IdentityInput" (
    "A" VARCHAR(32) NOT NULL,
    "B" VARCHAR(32) NOT NULL,

    CONSTRAINT "_IdentityInput_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_IdentityOutput" (
    "A" VARCHAR(32) NOT NULL,
    "B" VARCHAR(32) NOT NULL,

    CONSTRAINT "_IdentityOutput_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "EthAccount_userId_key" ON "EthAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EthAccount_address_key" ON "EthAccount"("address");

-- CreateIndex
CREATE INDEX "KBLabel_conceptId_idx" ON "KBLabel"("conceptId");

-- CreateIndex
CREATE INDEX "KBFact_type_idx" ON "KBFact"("type");

-- CreateIndex
CREATE INDEX "KBFactParticipation_conceptId_idx" ON "KBFactParticipation"("conceptId");

-- CreateIndex
CREATE INDEX "KBFactParticipation_factId_idx" ON "KBFactParticipation"("factId");

-- CreateIndex
CREATE INDEX "KBFactParticipation_role_idx" ON "KBFactParticipation"("role");

-- CreateIndex
CREATE UNIQUE INDEX "KBFactParticipation_conceptId_factId_role_key" ON "KBFactParticipation"("conceptId", "factId", "role");

-- CreateIndex
CREATE INDEX "KBFactProjection_factId_idx" ON "KBFactProjection"("factId");

-- CreateIndex
CREATE INDEX "KBFactProjection_knowledgeSpaceId_idx" ON "KBFactProjection"("knowledgeSpaceId");

-- CreateIndex
CREATE UNIQUE INDEX "KBFactProjection_factId_knowledgeSpaceId_key" ON "KBFactProjection"("factId", "knowledgeSpaceId");

-- CreateIndex
CREATE INDEX "EXReflex_type_idx" ON "EXReflex"("type");

-- CreateIndex
CREATE INDEX "EXReflex_status_idx" ON "EXReflex"("status");

-- CreateIndex
CREATE INDEX "EXReaction_reflexId_idx" ON "EXReaction"("reflexId");

-- CreateIndex
CREATE INDEX "EXReaction_createdById_idx" ON "EXReaction"("createdById");

-- CreateIndex
CREATE INDEX "EXReaction_relatedToUserId_idx" ON "EXReaction"("relatedToUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Balance_userId_key" ON "Balance"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_ethTransactionId_key" ON "Transaction"("ethTransactionId");

-- CreateIndex
CREATE UNIQUE INDEX "EthTransaction_chainId_txHash_key" ON "EthTransaction"("chainId", "txHash");

-- CreateIndex
CREATE INDEX "Post_createdById_idx" ON "Post"("createdById");

-- CreateIndex
CREATE INDEX "Post_createdAt_idx" ON "Post"("createdAt");

-- CreateIndex
CREATE INDEX "Post_status_idx" ON "Post"("status");

-- CreateIndex
CREATE INDEX "PostRevision_postId_idx" ON "PostRevision"("postId");

-- CreateIndex
CREATE INDEX "PostRevision_createdAt_idx" ON "PostRevision"("createdAt");

-- CreateIndex
CREATE INDEX "_IdentityInput_B_index" ON "_IdentityInput"("B");

-- CreateIndex
CREATE INDEX "_IdentityOutput_B_index" ON "_IdentityOutput"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EthAccount" ADD CONSTRAINT "EthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MindLog" ADD CONSTRAINT "MindLog_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskWorkLog" ADD CONSTRAINT "TaskWorkLog_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskWorkLog" ADD CONSTRAINT "TaskWorkLog_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBConcept" ADD CONSTRAINT "KBConcept_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBLabel" ADD CONSTRAINT "KBLabel_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "KBConcept"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBLabel" ADD CONSTRAINT "KBLabel_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBFact" ADD CONSTRAINT "KBFact_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBFactParticipation" ADD CONSTRAINT "KBFactParticipation_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "KBConcept"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBFactParticipation" ADD CONSTRAINT "KBFactParticipation_factId_fkey" FOREIGN KEY ("factId") REFERENCES "KBFact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBConstraint" ADD CONSTRAINT "KBConstraint_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBConflict" ADD CONSTRAINT "KBConflict_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBConflict" ADD CONSTRAINT "KBConflict_constraintId_fkey" FOREIGN KEY ("constraintId") REFERENCES "KBConstraint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBConflictFact" ADD CONSTRAINT "KBConflictFact_conflictId_fkey" FOREIGN KEY ("conflictId") REFERENCES "KBConflict"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBConflictFact" ADD CONSTRAINT "KBConflictFact_factId_fkey" FOREIGN KEY ("factId") REFERENCES "KBFact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBIdentityOperation" ADD CONSTRAINT "KBIdentityOperation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBProposal" ADD CONSTRAINT "KBProposal_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBDecision" ADD CONSTRAINT "KBDecision_revisedById_fkey" FOREIGN KEY ("revisedById") REFERENCES "KBDecision"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBDecision" ADD CONSTRAINT "KBDecision_basedOnProposalId_fkey" FOREIGN KEY ("basedOnProposalId") REFERENCES "KBProposal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBDecision" ADD CONSTRAINT "KBDecision_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBKnowledgeSpace" ADD CONSTRAINT "KBKnowledgeSpace_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBFactProjection" ADD CONSTRAINT "KBFactProjection_factId_fkey" FOREIGN KEY ("factId") REFERENCES "KBFact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBFactProjection" ADD CONSTRAINT "KBFactProjection_knowledgeSpaceId_fkey" FOREIGN KEY ("knowledgeSpaceId") REFERENCES "KBKnowledgeSpace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KBFactProjection" ADD CONSTRAINT "KBFactProjection_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EXReflex" ADD CONSTRAINT "EXReflex_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EXReaction" ADD CONSTRAINT "EXReaction_reflexId_fkey" FOREIGN KEY ("reflexId") REFERENCES "EXReflex"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EXReaction" ADD CONSTRAINT "EXReaction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "Balance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_ethTransactionId_fkey" FOREIGN KEY ("ethTransactionId") REFERENCES "EthTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EthTransaction" ADD CONSTRAINT "EthTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostRevision" ADD CONSTRAINT "PostRevision_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IdentityInput" ADD CONSTRAINT "_IdentityInput_A_fkey" FOREIGN KEY ("A") REFERENCES "KBConcept"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IdentityInput" ADD CONSTRAINT "_IdentityInput_B_fkey" FOREIGN KEY ("B") REFERENCES "KBIdentityOperation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IdentityOutput" ADD CONSTRAINT "_IdentityOutput_A_fkey" FOREIGN KEY ("A") REFERENCES "KBConcept"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IdentityOutput" ADD CONSTRAINT "_IdentityOutput_B_fkey" FOREIGN KEY ("B") REFERENCES "KBIdentityOperation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
