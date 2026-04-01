-- CreateEnum
CREATE TYPE "userType" AS ENUM ('Human', 'AI');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('New', 'Accepted', 'Rejected', 'Processing', 'Completed', 'Reopened');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('Education');

-- CreateEnum
CREATE TYPE "ProjectMemberStatus" AS ENUM ('Invited', 'Active', 'Fired', 'Quit');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('Blog', 'Comment', 'PersonalBlog', 'Project', 'Resource', 'Service', 'Team', 'Topic');

-- CreateEnum
CREATE TYPE "TagStatus" AS ENUM ('Active', 'Moderated', 'Blocked');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('New', 'Accepted', 'Rejected', 'Progress', 'Paused', 'Done', 'Discuss', 'Approved', 'RevisionsRequired', 'Completed');

-- CreateEnum
CREATE TYPE "TaskMemberStatus" AS ENUM ('Invited', 'Active', 'Fired', 'Quit');

-- CreateEnum
CREATE TYPE "TaskReactionType" AS ENUM ('UpVote', 'DownVote');

-- CreateEnum
CREATE TYPE "TeamStatus" AS ENUM ('Active', 'Inactive');

-- CreateEnum
CREATE TYPE "TeamMemberStatus" AS ENUM ('Invited', 'Active', 'Fired');

-- CreateEnum
CREATE TYPE "TechnologyLessonUserStatus" AS ENUM ('Accepted', 'Completed');

-- CreateEnum
CREATE TYPE "UserTechnologyStatus" AS ENUM ('PlanToStudy', 'RefusedToStudy', 'Study', 'RarelyUse', 'ActiveUse', 'NoLongerUse');

-- CreateEnum
CREATE TYPE "UserTechnologyHiringStatus" AS ENUM ('Active', 'Neutral', 'Negative');

-- CreateEnum
CREATE TYPE "LetterStatus" AS ENUM ('Created', 'Processing', 'Sended', 'Error');

-- CreateEnum
CREATE TYPE "LogLevel" AS ENUM ('Info', 'Notice', 'Warning', 'Error', 'Fatal');

-- CreateEnum
CREATE TYPE "MentorMenteeStatus" AS ENUM ('Request', 'Accepted', 'Rejected');

-- CreateEnum
CREATE TYPE "MindLogType" AS ENUM ('Stimulus', 'Reaction', 'Action', 'Error', 'Result', 'Conclusion', 'Evaluation', 'Correction', 'Knowledge');

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "showEmail" BOOLEAN NOT NULL DEFAULT false,
    "showPhone" BOOLEAN NOT NULL DEFAULT false,
    "showFullname" BOOLEAN NOT NULL DEFAULT true,
    "password" TEXT,
    "fullname" TEXT,
    "image" TEXT,
    "address" TEXT,
    "active" BOOLEAN,
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "activated" BOOLEAN,
    "deleted" BOOLEAN,
    "hidden" BOOLEAN,
    "sudo" BOOLEAN,
    "CreatedBy" VARCHAR(32),
    "EthAccountAuthed" VARCHAR(32),
    "isMentor" BOOLEAN NOT NULL DEFAULT false,
    "technologyLevel" SMALLINT,
    "telegram" TEXT,
    "type" "userType" NOT NULL DEFAULT 'Human',
    "data" JSONB,
    "intro" TEXT,
    "content" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" TIMESTAMP(3),
    "userId" VARCHAR(32),

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" VARCHAR(32) NOT NULL,
    "path" TEXT NOT NULL,
    "name" TEXT,
    "filename" TEXT,
    "mimetype" TEXT NOT NULL,
    "encoding" TEXT NOT NULL,
    "hash" TEXT,
    "size" DECIMAL(65,30),
    "ImageResource" VARCHAR(32),
    "CreatedBy" VARCHAR(32),
    "rank" INTEGER,
    "Gallery" VARCHAR(32),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "description" TEXT,
    "start_date" TIMESTAMP(3),
    "CreatedBy" VARCHAR(32),

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessageOld" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" JSONB,
    "contentText" TEXT,
    "CreatedBy" VARCHAR(32),
    "Room" VARCHAR(32),
    "toUser" VARCHAR(32),

    CONSTRAINT "ChatMessageOld_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatRoom" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "code" VARCHAR(32),
    "isPublic" BOOLEAN,
    "CreatedBy" VARCHAR(32),

    CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeChallenge" (
    "id" VARCHAR(32) NOT NULL,
    "externalKey" VARCHAR(32),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "dashedName" TEXT,
    "localeTitle" TEXT,
    "description" TEXT,
    "challengeType" INTEGER,
    "forumTopicId" INTEGER,
    "translations" JSONB,
    "tests" JSONB,
    "solutions" JSONB,
    "instructions" TEXT,
    "files" JSONB,
    "videoUrl" TEXT,
    "order" INTEGER,
    "superOrder" INTEGER,
    "challengeOrder" INTEGER,
    "required" JSONB,
    "isRequired" BOOLEAN,
    "isPrivate" BOOLEAN,
    "isBeta" BOOLEAN,
    "template" TEXT,
    "time" TEXT,
    "rank" INTEGER,
    "Block" VARCHAR(32),
    "CreatedBy" VARCHAR(32),
    "Topic" VARCHAR(32),

    CONSTRAINT "CodeChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeChallengeBlock" (
    "id" VARCHAR(32) NOT NULL,
    "externalKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "rank" INTEGER,
    "CreatedBy" VARCHAR(32),
    "Parent" VARCHAR(32),

    CONSTRAINT "CodeChallengeBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeChallengeCompletion" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Task" VARCHAR(32),
    "CreatedBy" VARCHAR(32),
    "CodeChallenge" VARCHAR(32),
    "content" TEXT,
    "success" BOOLEAN,

    CONSTRAINT "CodeChallengeCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationType" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "code" VARCHAR(32),
    "comment" TEXT,
    "CreatedBy" VARCHAR(32),

    CONSTRAINT "NotificationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" VARCHAR(32) NOT NULL,
    "code" VARCHAR(32),
    "name" TEXT NOT NULL,
    "CreatedBy" VARCHAR(32),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" VARCHAR(32) NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "url" TEXT,
    "content" JSONB,
    "contentText" TEXT,
    "status" "ProjectStatus" DEFAULT 'New',
    "public" BOOLEAN,
    "CreatedBy" VARCHAR(32),
    "Image" VARCHAR(32),
    "Team" VARCHAR(32),
    "Resource" VARCHAR(32),
    "type" "ProjectType",

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectMember" (
    "id" VARCHAR(32) NOT NULL,
    "status" "ProjectMemberStatus" NOT NULL DEFAULT 'Active',
    "User" VARCHAR(32),
    "CreatedBy" VARCHAR(32),
    "Project" VARCHAR(32),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTask" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Project" VARCHAR(32),
    "Task" VARCHAR(32),
    "CreatedBy" VARCHAR(32),

    CONSTRAINT "ProjectTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResetPassword" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" VARCHAR(32) NOT NULL,
    "password" TEXT NOT NULL,
    "validTill" TIMESTAMP(3),
    "User" VARCHAR(32) NOT NULL,

    CONSTRAINT "ResetPassword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" VARCHAR(32) NOT NULL,
    "code" VARCHAR(32),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "ResourceType" NOT NULL DEFAULT 'Resource',
    "name" TEXT,
    "longtitle" TEXT,
    "content" JSONB,
    "contentText" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "hidemenu" BOOLEAN NOT NULL DEFAULT false,
    "searchable" BOOLEAN NOT NULL DEFAULT true,
    "uri" TEXT NOT NULL,
    "isfolder" BOOLEAN NOT NULL,
    "rating" DECIMAL(65,30),
    "positiveVotesCount" INTEGER,
    "negativeVotesCount" INTEGER,
    "neutralVotesCount" INTEGER,
    "oldID" INTEGER,
    "commentOldID" INTEGER,
    "class_key" TEXT,
    "template" INTEGER,
    "mockUpdate" TIMESTAMP(3),
    "components" JSONB,
    "Parent" VARCHAR(32),
    "Team" VARCHAR(32),
    "Service" VARCHAR(32),
    "EthAccount" VARCHAR(32),
    "PrismaProject" VARCHAR(32),
    "CreatedBy" VARCHAR(32),
    "Topic" VARCHAR(32),
    "Blog" VARCHAR(32),
    "Task" VARCHAR(32),

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceTag" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "CreatedBy" VARCHAR(32),
    "Resource" VARCHAR(32),
    "Tag" VARCHAR(32),

    CONSTRAINT "ResourceTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" VARCHAR(32) NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "code" VARCHAR(32),
    "rank" INTEGER,
    "oldID" INTEGER,
    "Category" VARCHAR(32),
    "Parent" VARCHAR(32),
    "CreatedBy" VARCHAR(32),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceCategory" (
    "id" VARCHAR(32) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "code" VARCHAR(32),
    "Parent" VARCHAR(32),
    "CreatedBy" VARCHAR(32),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "status" "TagStatus" NOT NULL DEFAULT 'Active',
    "CreatedBy" VARCHAR(32),

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'New',
    "startDatePlaning" TIMESTAMP(3),
    "endDatePlaning" TIMESTAMP(3),
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "CreatedBy" VARCHAR(32),
    "Parent" VARCHAR(32),
    "ChatRoom" VARCHAR(32),
    "needHelp" BOOLEAN,
    "projectId" VARCHAR(32),

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskMember" (
    "id" VARCHAR(32) NOT NULL,
    "status" "TaskMemberStatus" NOT NULL DEFAULT 'Active',
    "Task" VARCHAR(32),
    "User" VARCHAR(32),
    "CreatedBy" VARCHAR(32),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskReaction" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "TaskReactionType" NOT NULL,
    "Task" VARCHAR(32),
    "CreatedBy" VARCHAR(32) NOT NULL,

    CONSTRAINT "TaskReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskTechnology" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" SMALLINT,
    "Technology" VARCHAR(32),
    "Task" VARCHAR(32),
    "CreatedBy" VARCHAR(32) NOT NULL,

    CONSTRAINT "TaskTechnology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" VARCHAR(32) NOT NULL,
    "name" TEXT NOT NULL,
    "status" "TeamStatus" NOT NULL DEFAULT 'Active',
    "oldID" INTEGER,
    "address" TEXT,
    "website" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "Parent" VARCHAR(32),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedBy" VARCHAR(32) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" VARCHAR(32) NOT NULL,
    "status" "TeamMemberStatus" NOT NULL DEFAULT 'Active',
    "User" VARCHAR(32),
    "Team" VARCHAR(32),
    "CreatedBy" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technology" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "components" JSONB,
    "contentText" TEXT,
    "site_url" TEXT,
    "level1hours" INTEGER,
    "level2hours" INTEGER,
    "level3hours" INTEGER,
    "level4hours" INTEGER,
    "level5hours" INTEGER,
    "CreatedBy" VARCHAR(32) NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnologyLesson" (
    "id" VARCHAR(32) NOT NULL,
    "name" TEXT,
    "components" JSONB,
    "contentText" TEXT,
    "CreatedBy" VARCHAR(32) NOT NULL,
    "Technology" VARCHAR(32) NOT NULL,

    CONSTRAINT "TechnologyLesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnologyLessonUser" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "TechnologyLessonUserStatus" NOT NULL DEFAULT 'Accepted',
    "completedAt" TIMESTAMP(3),
    "CreatedBy" VARCHAR(32) NOT NULL,
    "Lesson" VARCHAR(32) NOT NULL,

    CONSTRAINT "TechnologyLessonUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timer" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stopedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Task" VARCHAR(32),
    "CreatedBy" VARCHAR(32),

    CONSTRAINT "Timer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTechnology" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "components" JSONB,
    "date_from" TIMESTAMP(3),
    "date_till" TIMESTAMP(3),
    "status" "UserTechnologyStatus",
    "hiring_status" "UserTechnologyHiringStatus",
    "isMentor" BOOLEAN NOT NULL DEFAULT false,
    "CreatedBy" VARCHAR(32) NOT NULL,
    "Technology" VARCHAR(32) NOT NULL,
    "level" SMALLINT,
    "rating" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserTechnology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DECIMAL(65,30) NOT NULL,
    "Resource" VARCHAR(32),
    "User" VARCHAR(32) NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Letter" (
    "id" VARCHAR(32) NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "LetterStatus" NOT NULL DEFAULT 'Created',
    "errorMessage" TEXT,
    "rank" INTEGER,
    "deleteOnSend" BOOLEAN NOT NULL DEFAULT true,
    "replyTo" TEXT,
    "returnTo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "User" VARCHAR(32),

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" VARCHAR(32) NOT NULL,
    "level" "LogLevel" NOT NULL DEFAULT 'Info',
    "objectType" VARCHAR(32),
    "message" TEXT NOT NULL,
    "stack" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearnStrategy" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "level" SMALLINT NOT NULL,
    "createdById" VARCHAR(32) NOT NULL,

    CONSTRAINT "LearnStrategy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearnStrategyStage" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "learnStrategyId" VARCHAR(32) NOT NULL,
    "learnStrategyTargetId" VARCHAR(32),
    "technologyId" VARCHAR(32),
    "level" SMALLINT,

    CONSTRAINT "LearnStrategyStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLearnStrategy" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" VARCHAR(32) NOT NULL,
    "learnStrategyId" VARCHAR(32) NOT NULL,

    CONSTRAINT "UserLearnStrategy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MentorMentee" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "MentorMenteeStatus" NOT NULL,
    "mentorId" VARCHAR(32) NOT NULL,
    "menteeId" VARCHAR(32) NOT NULL,

    CONSTRAINT "MentorMentee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MindLog" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "MindLogType" NOT NULL,
    "data" TEXT NOT NULL,
    "quality" DOUBLE PRECISION,
    "createdById" VARCHAR(36) NOT NULL,
    "relatedToUserId" VARCHAR(36),

    CONSTRAINT "MindLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" VARCHAR(36) NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mood" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "assertiveness" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "intentTone" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "socialGoal" TEXT,
    "tags" TEXT,
    "usage" JSONB,
    "createdBy" VARCHAR(36) NOT NULL,
    "toUserId" VARCHAR(36),

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PositionUsers" (
    "A" VARCHAR(32) NOT NULL,
    "B" VARCHAR(32) NOT NULL
);

-- CreateTable
CREATE TABLE "_PrismaProjectUsers" (
    "A" VARCHAR(32) NOT NULL,
    "B" VARCHAR(32) NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectCustomers" (
    "A" VARCHAR(32) NOT NULL,
    "B" VARCHAR(32) NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectMemberServices" (
    "A" VARCHAR(32) NOT NULL,
    "B" VARCHAR(32) NOT NULL
);

-- CreateIndex
CREATE INDEX "User_CreatedBy" ON "User"("CreatedBy");

-- CreateIndex
CREATE INDEX "User_EthAccountAuthed" ON "User"("EthAccountAuthed");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "Token_createdAt_idx" ON "Token"("createdAt");

-- CreateIndex
CREATE INDEX "File_CreatedBy" ON "File"("CreatedBy");

-- CreateIndex
CREATE INDEX "File_Gallery" ON "File"("Gallery");

-- CreateIndex
CREATE INDEX "File_ImageResource" ON "File"("ImageResource");

-- CreateIndex
CREATE INDEX "Career_CreatedBy" ON "Career"("CreatedBy");

-- CreateIndex
CREATE INDEX "ChatMessageOld_CreatedBy" ON "ChatMessageOld"("CreatedBy");

-- CreateIndex
CREATE INDEX "ChatMessageOld_Room" ON "ChatMessageOld"("Room");

-- CreateIndex
CREATE UNIQUE INDEX "ChatRoom_code_key" ON "ChatRoom"("code");

-- CreateIndex
CREATE INDEX "ChatRoom_CreatedBy" ON "ChatRoom"("CreatedBy");

-- CreateIndex
CREATE UNIQUE INDEX "CodeChallenge_externalKey_key" ON "CodeChallenge"("externalKey");

-- CreateIndex
CREATE INDEX "CodeChallenge_Block" ON "CodeChallenge"("Block");

-- CreateIndex
CREATE INDEX "CodeChallenge_CreatedBy" ON "CodeChallenge"("CreatedBy");

-- CreateIndex
CREATE INDEX "CodeChallenge_Topic" ON "CodeChallenge"("Topic");

-- CreateIndex
CREATE INDEX "CodeChallengeBlock_CreatedBy" ON "CodeChallengeBlock"("CreatedBy");

-- CreateIndex
CREATE INDEX "CodeChallengeBlock_Parent" ON "CodeChallengeBlock"("Parent");

-- CreateIndex
CREATE INDEX "CodeChallengeCompletion_CodeChallenge" ON "CodeChallengeCompletion"("CodeChallenge");

-- CreateIndex
CREATE INDEX "CodeChallengeCompletion_CreatedBy" ON "CodeChallengeCompletion"("CreatedBy");

-- CreateIndex
CREATE INDEX "CodeChallengeCompletion_Task" ON "CodeChallengeCompletion"("Task");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationType_code_key" ON "NotificationType"("code");

-- CreateIndex
CREATE INDEX "NotificationType_CreatedBy" ON "NotificationType"("CreatedBy");

-- CreateIndex
CREATE UNIQUE INDEX "Position_code_key" ON "Position"("code");

-- CreateIndex
CREATE INDEX "Position_CreatedBy" ON "Position"("CreatedBy");

-- CreateIndex
CREATE INDEX "Project_CreatedBy" ON "Project"("CreatedBy");

-- CreateIndex
CREATE INDEX "Project_Image" ON "Project"("Image");

-- CreateIndex
CREATE INDEX "Project_Resource" ON "Project"("Resource");

-- CreateIndex
CREATE INDEX "Project_Team" ON "Project"("Team");

-- CreateIndex
CREATE INDEX "ProjectMember_CreatedBy" ON "ProjectMember"("CreatedBy");

-- CreateIndex
CREATE INDEX "ProjectMember_Project" ON "ProjectMember"("Project");

-- CreateIndex
CREATE INDEX "ProjectMember_User" ON "ProjectMember"("User");

-- CreateIndex
CREATE INDEX "ProjectTask_CreatedBy" ON "ProjectTask"("CreatedBy");

-- CreateIndex
CREATE INDEX "ProjectTask_Project" ON "ProjectTask"("Project");

-- CreateIndex
CREATE INDEX "ProjectTask_Task" ON "ProjectTask"("Task");

-- CreateIndex
CREATE INDEX "ResetPassword_User" ON "ResetPassword"("User");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_code_key" ON "Resource"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_oldID_key" ON "Resource"("oldID");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_commentOldID_key" ON "Resource"("commentOldID");

-- CreateIndex
CREATE INDEX "Resource_Blog" ON "Resource"("Blog");

-- CreateIndex
CREATE INDEX "Resource_CreatedBy" ON "Resource"("CreatedBy");

-- CreateIndex
CREATE INDEX "Resource_EthAccount" ON "Resource"("EthAccount");

-- CreateIndex
CREATE INDEX "Resource_Parent" ON "Resource"("Parent");

-- CreateIndex
CREATE INDEX "Resource_PrismaProject" ON "Resource"("PrismaProject");

-- CreateIndex
CREATE INDEX "Resource_Service" ON "Resource"("Service");

-- CreateIndex
CREATE INDEX "Resource_Task" ON "Resource"("Task");

-- CreateIndex
CREATE INDEX "Resource_Team" ON "Resource"("Team");

-- CreateIndex
CREATE INDEX "Resource_Topic" ON "Resource"("Topic");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_uri_key" ON "Resource"("uri");

-- CreateIndex
CREATE INDEX "ResourceTag_CreatedBy" ON "ResourceTag"("CreatedBy");

-- CreateIndex
CREATE INDEX "ResourceTag_Resource" ON "ResourceTag"("Resource");

-- CreateIndex
CREATE INDEX "ResourceTag_Tag" ON "ResourceTag"("Tag");

-- CreateIndex
CREATE UNIQUE INDEX "Service_code_key" ON "Service"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Service_oldID_key" ON "Service"("oldID");

-- CreateIndex
CREATE INDEX "Service_Category" ON "Service"("Category");

-- CreateIndex
CREATE INDEX "Service_CreatedBy" ON "Service"("CreatedBy");

-- CreateIndex
CREATE INDEX "Service_Parent" ON "Service"("Parent");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceCategory_code_key" ON "ServiceCategory"("code");

-- CreateIndex
CREATE INDEX "ServiceCategory_CreatedBy" ON "ServiceCategory"("CreatedBy");

-- CreateIndex
CREATE INDEX "ServiceCategory_Parent" ON "ServiceCategory"("Parent");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "Tag_CreatedBy" ON "Tag"("CreatedBy");

-- CreateIndex
CREATE INDEX "Task_ChatRoom" ON "Task"("ChatRoom");

-- CreateIndex
CREATE INDEX "Task_CreatedBy" ON "Task"("CreatedBy");

-- CreateIndex
CREATE INDEX "Task_Parent" ON "Task"("Parent");

-- CreateIndex
CREATE INDEX "TaskMember_CreatedBy" ON "TaskMember"("CreatedBy");

-- CreateIndex
CREATE INDEX "TaskMember_Task" ON "TaskMember"("Task");

-- CreateIndex
CREATE INDEX "TaskMember_User" ON "TaskMember"("User");

-- CreateIndex
CREATE INDEX "TaskReaction_CreatedBy" ON "TaskReaction"("CreatedBy");

-- CreateIndex
CREATE INDEX "TaskReaction_Task" ON "TaskReaction"("Task");

-- CreateIndex
CREATE INDEX "TaskTechnology_CreatedBy" ON "TaskTechnology"("CreatedBy");

-- CreateIndex
CREATE INDEX "TaskTechnology_Task" ON "TaskTechnology"("Task");

-- CreateIndex
CREATE INDEX "TaskTechnology_Technology" ON "TaskTechnology"("Technology");

-- CreateIndex
CREATE UNIQUE INDEX "tt_task_tech_uniq" ON "TaskTechnology"("Task", "Technology");

-- CreateIndex
CREATE UNIQUE INDEX "Team_oldID_key" ON "Team"("oldID");

-- CreateIndex
CREATE INDEX "Team_CreatedBy" ON "Team"("CreatedBy");

-- CreateIndex
CREATE INDEX "Team_Parent" ON "Team"("Parent");

-- CreateIndex
CREATE INDEX "TeamMember_CreatedBy" ON "TeamMember"("CreatedBy");

-- CreateIndex
CREATE INDEX "TeamMember_Team" ON "TeamMember"("Team");

-- CreateIndex
CREATE INDEX "TeamMember_User" ON "TeamMember"("User");

-- CreateIndex
CREATE INDEX "Technology_CreatedBy" ON "Technology"("CreatedBy");

-- CreateIndex
CREATE UNIQUE INDEX "Technology_name_key" ON "Technology"("name");

-- CreateIndex
CREATE INDEX "TechnologyLesson_CreatedBy" ON "TechnologyLesson"("CreatedBy");

-- CreateIndex
CREATE INDEX "TechnologyLesson_Technology" ON "TechnologyLesson"("Technology");

-- CreateIndex
CREATE INDEX "TechnologyLessonUser_CreatedBy" ON "TechnologyLessonUser"("CreatedBy");

-- CreateIndex
CREATE INDEX "TechnologyLessonUser_Lesson" ON "TechnologyLessonUser"("Lesson");

-- CreateIndex
CREATE INDEX "Timer_CreatedBy" ON "Timer"("CreatedBy");

-- CreateIndex
CREATE INDEX "Timer_Task" ON "Timer"("Task");

-- CreateIndex
CREATE INDEX "UserTechnology_CreatedBy" ON "UserTechnology"("CreatedBy");

-- CreateIndex
CREATE INDEX "UserTechnology_Technology" ON "UserTechnology"("Technology");

-- CreateIndex
CREATE UNIQUE INDEX "ut_user_tech_uniq" ON "UserTechnology"("CreatedBy", "Technology");

-- CreateIndex
CREATE INDEX "Vote_Resource" ON "Vote"("Resource");

-- CreateIndex
CREATE INDEX "Vote_User" ON "Vote"("User");

-- CreateIndex
CREATE INDEX "Letter_User" ON "Letter"("User");

-- CreateIndex
CREATE UNIQUE INDEX "lss_strategy_target_uniq" ON "LearnStrategyStage"("learnStrategyId", "learnStrategyTargetId");

-- CreateIndex
CREATE UNIQUE INDEX "lss_strategy_tech_uniq" ON "LearnStrategyStage"("learnStrategyId", "technologyId");

-- CreateIndex
CREATE UNIQUE INDEX "uls_user_strategy_uniq" ON "UserLearnStrategy"("createdById", "learnStrategyId");

-- CreateIndex
CREATE UNIQUE INDEX "mm_mentor_mentee_uniq" ON "MentorMentee"("mentorId", "menteeId");

-- CreateIndex
CREATE INDEX "MindLog_type_idx" ON "MindLog"("type");

-- CreateIndex
CREATE INDEX "MindLog_relatedToUserId_idx" ON "MindLog"("relatedToUserId");

-- CreateIndex
CREATE UNIQUE INDEX "_PositionUsers_AB_unique" ON "_PositionUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_PositionUsers_B_index" ON "_PositionUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PrismaProjectUsers_AB_unique" ON "_PrismaProjectUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_PrismaProjectUsers_B_index" ON "_PrismaProjectUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectCustomers_AB_unique" ON "_ProjectCustomers"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectCustomers_B_index" ON "_ProjectCustomers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectMemberServices_AB_unique" ON "_ProjectMemberServices"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectMemberServices_B_index" ON "_ProjectMemberServices"("B");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_ImageResource_fkey" FOREIGN KEY ("ImageResource") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessageOld" ADD CONSTRAINT "ChatMessageOld_Room_fkey" FOREIGN KEY ("Room") REFERENCES "ChatRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeChallenge" ADD CONSTRAINT "CodeChallenge_Block_fkey" FOREIGN KEY ("Block") REFERENCES "CodeChallengeBlock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeChallenge" ADD CONSTRAINT "CodeChallenge_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeChallenge" ADD CONSTRAINT "CodeChallenge_Topic_fkey" FOREIGN KEY ("Topic") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeChallengeBlock" ADD CONSTRAINT "CodeChallengeBlock_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeChallengeBlock" ADD CONSTRAINT "CodeChallengeBlock_Parent_fkey" FOREIGN KEY ("Parent") REFERENCES "CodeChallengeBlock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeChallengeCompletion" ADD CONSTRAINT "CodeChallengeCompletion_CodeChallenge_fkey" FOREIGN KEY ("CodeChallenge") REFERENCES "CodeChallenge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeChallengeCompletion" ADD CONSTRAINT "CodeChallengeCompletion_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeChallengeCompletion" ADD CONSTRAINT "CodeChallengeCompletion_Task_fkey" FOREIGN KEY ("Task") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_Image_fkey" FOREIGN KEY ("Image") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_Resource_fkey" FOREIGN KEY ("Resource") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_Team_fkey" FOREIGN KEY ("Team") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_Project_fkey" FOREIGN KEY ("Project") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectMember" ADD CONSTRAINT "ProjectMember_User_fkey" FOREIGN KEY ("User") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTask" ADD CONSTRAINT "ProjectTask_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTask" ADD CONSTRAINT "ProjectTask_Project_fkey" FOREIGN KEY ("Project") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTask" ADD CONSTRAINT "ProjectTask_Task_fkey" FOREIGN KEY ("Task") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResetPassword" ADD CONSTRAINT "ResetPassword_User_fkey" FOREIGN KEY ("User") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_Blog_fkey" FOREIGN KEY ("Blog") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_Parent_fkey" FOREIGN KEY ("Parent") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_PrismaProject_fkey" FOREIGN KEY ("PrismaProject") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_Service_fkey" FOREIGN KEY ("Service") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_Task_fkey" FOREIGN KEY ("Task") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_Team_fkey" FOREIGN KEY ("Team") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_Topic_fkey" FOREIGN KEY ("Topic") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceTag" ADD CONSTRAINT "ResourceTag_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceTag" ADD CONSTRAINT "ResourceTag_Resource_fkey" FOREIGN KEY ("Resource") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceTag" ADD CONSTRAINT "ResourceTag_Tag_fkey" FOREIGN KEY ("Tag") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_Category_fkey" FOREIGN KEY ("Category") REFERENCES "ServiceCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_Parent_fkey" FOREIGN KEY ("Parent") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceCategory" ADD CONSTRAINT "ServiceCategory_Parent_fkey" FOREIGN KEY ("Parent") REFERENCES "ServiceCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_ChatRoom_fkey" FOREIGN KEY ("ChatRoom") REFERENCES "ChatRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_Parent_fkey" FOREIGN KEY ("Parent") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskMember" ADD CONSTRAINT "TaskMember_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskMember" ADD CONSTRAINT "TaskMember_Task_fkey" FOREIGN KEY ("Task") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskMember" ADD CONSTRAINT "TaskMember_User_fkey" FOREIGN KEY ("User") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskReaction" ADD CONSTRAINT "TaskReaction_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskReaction" ADD CONSTRAINT "TaskReaction_Task_fkey" FOREIGN KEY ("Task") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskTechnology" ADD CONSTRAINT "TaskTechnology_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskTechnology" ADD CONSTRAINT "TaskTechnology_Task_fkey" FOREIGN KEY ("Task") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskTechnology" ADD CONSTRAINT "TaskTechnology_Technology_fkey" FOREIGN KEY ("Technology") REFERENCES "Technology"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_Parent_fkey" FOREIGN KEY ("Parent") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_Team_fkey" FOREIGN KEY ("Team") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_User_fkey" FOREIGN KEY ("User") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Technology" ADD CONSTRAINT "Technology_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyLesson" ADD CONSTRAINT "TechnologyLesson_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyLesson" ADD CONSTRAINT "TechnologyLesson_Technology_fkey" FOREIGN KEY ("Technology") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyLessonUser" ADD CONSTRAINT "TechnologyLessonUser_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyLessonUser" ADD CONSTRAINT "TechnologyLessonUser_Lesson_fkey" FOREIGN KEY ("Lesson") REFERENCES "TechnologyLesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timer" ADD CONSTRAINT "Timer_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timer" ADD CONSTRAINT "Timer_Task_fkey" FOREIGN KEY ("Task") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTechnology" ADD CONSTRAINT "UserTechnology_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTechnology" ADD CONSTRAINT "UserTechnology_Technology_fkey" FOREIGN KEY ("Technology") REFERENCES "Technology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_Resource_fkey" FOREIGN KEY ("Resource") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnStrategy" ADD CONSTRAINT "LearnStrategy_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnStrategyStage" ADD CONSTRAINT "LearnStrategyStage_learnStrategyId_fkey" FOREIGN KEY ("learnStrategyId") REFERENCES "LearnStrategy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnStrategyStage" ADD CONSTRAINT "LearnStrategyStage_learnStrategyTargetId_fkey" FOREIGN KEY ("learnStrategyTargetId") REFERENCES "LearnStrategy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnStrategyStage" ADD CONSTRAINT "LearnStrategyStage_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "Technology"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLearnStrategy" ADD CONSTRAINT "UserLearnStrategy_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLearnStrategy" ADD CONSTRAINT "UserLearnStrategy_learnStrategyId_fkey" FOREIGN KEY ("learnStrategyId") REFERENCES "LearnStrategy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorMentee" ADD CONSTRAINT "MentorMentee_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorMentee" ADD CONSTRAINT "MentorMentee_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MindLog" ADD CONSTRAINT "MindLog_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PositionUsers" ADD CONSTRAINT "_PositionUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PositionUsers" ADD CONSTRAINT "_PositionUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrismaProjectUsers" ADD CONSTRAINT "_PrismaProjectUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrismaProjectUsers" ADD CONSTRAINT "_PrismaProjectUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectCustomers" ADD CONSTRAINT "_ProjectCustomers_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectCustomers" ADD CONSTRAINT "_ProjectCustomers_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectMemberServices" ADD CONSTRAINT "_ProjectMemberServices_A_fkey" FOREIGN KEY ("A") REFERENCES "ProjectMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectMemberServices" ADD CONSTRAINT "_ProjectMemberServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
