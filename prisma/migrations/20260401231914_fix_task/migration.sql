-- Rename Task.CreatedBy to Task.createdById
ALTER TABLE "Task" RENAME COLUMN "CreatedBy" TO "createdById";

-- Rename Task.Parent to Task.parentId
ALTER TABLE "Task" RENAME COLUMN "Parent" TO "parentId";

-- Update index names to match new column names
DROP INDEX IF EXISTS "Task_CreatedBy";
CREATE INDEX "Task_createdById" ON "Task"("createdById");

DROP INDEX IF EXISTS "Task_Parent";
CREATE INDEX "Task_parentId" ON "Task"("parentId");


/*
  Warnings:

  - Made the column `createdById` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_CreatedBy_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "assigneeId" VARCHAR(36),
ALTER COLUMN "createdById" SET NOT NULL;

-- RenameForeignKey
ALTER TABLE "Task" RENAME CONSTRAINT "Task_Parent_fkey" TO "Task_parentId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
