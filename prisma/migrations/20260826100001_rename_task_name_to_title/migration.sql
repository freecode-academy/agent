-- Migration: Rename Task.name to Task.title
-- This migration merges the legacy "name" field from freecode.academy schema
-- with the "title" field from the haih/agent schema.
--
-- Strategy:
-- 1. If title is NULL, copy name to title
-- 2. Drop the name column
-- 3. Make title NOT NULL (as in original schema)

-- Step 1: Copy name to title where title is NULL
UPDATE "Task" SET "title" = "name" WHERE "title" IS NULL;

-- Step 2: Make title NOT NULL (it was optional, now required)
ALTER TABLE "Task" ALTER COLUMN "title" SET NOT NULL;

-- Step 3: Drop the legacy name column
ALTER TABLE "Task" DROP COLUMN "name";
