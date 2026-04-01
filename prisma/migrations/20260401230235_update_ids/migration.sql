/*
  Warnings:

  - The primary key for the `Balance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Career` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ChatMessage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ChatMessageOld` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ChatRoom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CodeChallenge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CodeChallengeBlock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CodeChallengeCompletion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EXReaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EXReflex` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EthAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EthTransaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `File` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `KBConcept` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `KBConflict` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `KBConflictFact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `KBConstraint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `KBDecision` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `KBFact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `KBFactParticipation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `KBFactProjection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `KBIdentityOperation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `KBKnowledgeSpace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `KBLabel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `KBProposal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LearnStrategy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LearnStrategyStage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Letter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Log` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MentorMentee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MindLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `NotificationType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Position` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PostRevision` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProjectMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProjectTask` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ResetPassword` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Resource` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ResourceTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ServiceCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TaskMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TaskReaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TaskTechnology` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TaskWorkLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TeamMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Technology` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TechnologyLesson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TechnologyLessonUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TelegramAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Timer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserLearnStrategy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserTechnology` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_IdentityInput` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_IdentityOutput` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_PositionUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_PrismaProjectUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ProjectCustomers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ProjectMemberServices` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_userId_fkey";

-- DropForeignKey
ALTER TABLE "Career" DROP CONSTRAINT "Career_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_toUserId_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessageOld" DROP CONSTRAINT "ChatMessageOld_Room_fkey";

-- DropForeignKey
ALTER TABLE "CodeChallenge" DROP CONSTRAINT "CodeChallenge_Block_fkey";

-- DropForeignKey
ALTER TABLE "CodeChallenge" DROP CONSTRAINT "CodeChallenge_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "CodeChallenge" DROP CONSTRAINT "CodeChallenge_Topic_fkey";

-- DropForeignKey
ALTER TABLE "CodeChallengeBlock" DROP CONSTRAINT "CodeChallengeBlock_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "CodeChallengeBlock" DROP CONSTRAINT "CodeChallengeBlock_Parent_fkey";

-- DropForeignKey
ALTER TABLE "CodeChallengeCompletion" DROP CONSTRAINT "CodeChallengeCompletion_CodeChallenge_fkey";

-- DropForeignKey
ALTER TABLE "CodeChallengeCompletion" DROP CONSTRAINT "CodeChallengeCompletion_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "CodeChallengeCompletion" DROP CONSTRAINT "CodeChallengeCompletion_Task_fkey";

-- DropForeignKey
ALTER TABLE "EXReaction" DROP CONSTRAINT "EXReaction_createdById_fkey";

-- DropForeignKey
ALTER TABLE "EXReaction" DROP CONSTRAINT "EXReaction_reflexId_fkey";

-- DropForeignKey
ALTER TABLE "EXReflex" DROP CONSTRAINT "EXReflex_createdById_fkey";

-- DropForeignKey
ALTER TABLE "EthAccount" DROP CONSTRAINT "EthAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "EthTransaction" DROP CONSTRAINT "EthTransaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_ImageResource_fkey";

-- DropForeignKey
ALTER TABLE "KBConcept" DROP CONSTRAINT "KBConcept_createdById_fkey";

-- DropForeignKey
ALTER TABLE "KBConflict" DROP CONSTRAINT "KBConflict_constraintId_fkey";

-- DropForeignKey
ALTER TABLE "KBConflict" DROP CONSTRAINT "KBConflict_createdById_fkey";

-- DropForeignKey
ALTER TABLE "KBConflictFact" DROP CONSTRAINT "KBConflictFact_conflictId_fkey";

-- DropForeignKey
ALTER TABLE "KBConflictFact" DROP CONSTRAINT "KBConflictFact_factId_fkey";

-- DropForeignKey
ALTER TABLE "KBConstraint" DROP CONSTRAINT "KBConstraint_createdById_fkey";

-- DropForeignKey
ALTER TABLE "KBDecision" DROP CONSTRAINT "KBDecision_basedOnProposalId_fkey";

-- DropForeignKey
ALTER TABLE "KBDecision" DROP CONSTRAINT "KBDecision_createdById_fkey";

-- DropForeignKey
ALTER TABLE "KBDecision" DROP CONSTRAINT "KBDecision_revisedById_fkey";

-- DropForeignKey
ALTER TABLE "KBFact" DROP CONSTRAINT "KBFact_createdById_fkey";

-- DropForeignKey
ALTER TABLE "KBFactParticipation" DROP CONSTRAINT "KBFactParticipation_conceptId_fkey";

-- DropForeignKey
ALTER TABLE "KBFactParticipation" DROP CONSTRAINT "KBFactParticipation_factId_fkey";

-- DropForeignKey
ALTER TABLE "KBFactProjection" DROP CONSTRAINT "KBFactProjection_createdById_fkey";

-- DropForeignKey
ALTER TABLE "KBFactProjection" DROP CONSTRAINT "KBFactProjection_factId_fkey";

-- DropForeignKey
ALTER TABLE "KBFactProjection" DROP CONSTRAINT "KBFactProjection_knowledgeSpaceId_fkey";

-- DropForeignKey
ALTER TABLE "KBIdentityOperation" DROP CONSTRAINT "KBIdentityOperation_createdById_fkey";

-- DropForeignKey
ALTER TABLE "KBKnowledgeSpace" DROP CONSTRAINT "KBKnowledgeSpace_createdById_fkey";

-- DropForeignKey
ALTER TABLE "KBLabel" DROP CONSTRAINT "KBLabel_conceptId_fkey";

-- DropForeignKey
ALTER TABLE "KBLabel" DROP CONSTRAINT "KBLabel_createdById_fkey";

-- DropForeignKey
ALTER TABLE "KBProposal" DROP CONSTRAINT "KBProposal_createdById_fkey";

-- DropForeignKey
ALTER TABLE "LearnStrategy" DROP CONSTRAINT "LearnStrategy_createdById_fkey";

-- DropForeignKey
ALTER TABLE "LearnStrategyStage" DROP CONSTRAINT "LearnStrategyStage_learnStrategyId_fkey";

-- DropForeignKey
ALTER TABLE "LearnStrategyStage" DROP CONSTRAINT "LearnStrategyStage_learnStrategyTargetId_fkey";

-- DropForeignKey
ALTER TABLE "LearnStrategyStage" DROP CONSTRAINT "LearnStrategyStage_technologyId_fkey";

-- DropForeignKey
ALTER TABLE "MentorMentee" DROP CONSTRAINT "MentorMentee_menteeId_fkey";

-- DropForeignKey
ALTER TABLE "MentorMentee" DROP CONSTRAINT "MentorMentee_mentorId_fkey";

-- DropForeignKey
ALTER TABLE "MindLog" DROP CONSTRAINT "MindLog_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_createdById_fkey";

-- DropForeignKey
ALTER TABLE "PostRevision" DROP CONSTRAINT "PostRevision_postId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_Image_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_Resource_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_Team_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMember" DROP CONSTRAINT "ProjectMember_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMember" DROP CONSTRAINT "ProjectMember_Project_fkey";

-- DropForeignKey
ALTER TABLE "ProjectMember" DROP CONSTRAINT "ProjectMember_User_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTask" DROP CONSTRAINT "ProjectTask_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTask" DROP CONSTRAINT "ProjectTask_Project_fkey";

-- DropForeignKey
ALTER TABLE "ProjectTask" DROP CONSTRAINT "ProjectTask_Task_fkey";

-- DropForeignKey
ALTER TABLE "ResetPassword" DROP CONSTRAINT "ResetPassword_User_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_Blog_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_Parent_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_PrismaProject_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_Service_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_Task_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_Team_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_Topic_fkey";

-- DropForeignKey
ALTER TABLE "ResourceTag" DROP CONSTRAINT "ResourceTag_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "ResourceTag" DROP CONSTRAINT "ResourceTag_Resource_fkey";

-- DropForeignKey
ALTER TABLE "ResourceTag" DROP CONSTRAINT "ResourceTag_Tag_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_Category_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_Parent_fkey";

-- DropForeignKey
ALTER TABLE "ServiceCategory" DROP CONSTRAINT "ServiceCategory_Parent_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_ChatRoom_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_Parent_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TaskMember" DROP CONSTRAINT "TaskMember_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "TaskMember" DROP CONSTRAINT "TaskMember_Task_fkey";

-- DropForeignKey
ALTER TABLE "TaskMember" DROP CONSTRAINT "TaskMember_User_fkey";

-- DropForeignKey
ALTER TABLE "TaskReaction" DROP CONSTRAINT "TaskReaction_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "TaskReaction" DROP CONSTRAINT "TaskReaction_Task_fkey";

-- DropForeignKey
ALTER TABLE "TaskTechnology" DROP CONSTRAINT "TaskTechnology_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "TaskTechnology" DROP CONSTRAINT "TaskTechnology_Task_fkey";

-- DropForeignKey
ALTER TABLE "TaskTechnology" DROP CONSTRAINT "TaskTechnology_Technology_fkey";

-- DropForeignKey
ALTER TABLE "TaskWorkLog" DROP CONSTRAINT "TaskWorkLog_createdById_fkey";

-- DropForeignKey
ALTER TABLE "TaskWorkLog" DROP CONSTRAINT "TaskWorkLog_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_Parent_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_Team_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_User_fkey";

-- DropForeignKey
ALTER TABLE "Technology" DROP CONSTRAINT "Technology_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "TechnologyLesson" DROP CONSTRAINT "TechnologyLesson_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "TechnologyLesson" DROP CONSTRAINT "TechnologyLesson_Technology_fkey";

-- DropForeignKey
ALTER TABLE "TechnologyLessonUser" DROP CONSTRAINT "TechnologyLessonUser_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "TechnologyLessonUser" DROP CONSTRAINT "TechnologyLessonUser_Lesson_fkey";

-- DropForeignKey
ALTER TABLE "TelegramAccount" DROP CONSTRAINT "TelegramAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "Timer" DROP CONSTRAINT "Timer_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "Timer" DROP CONSTRAINT "Timer_Task_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_balanceId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_ethTransactionId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_referrerId_fkey";

-- DropForeignKey
ALTER TABLE "UserLearnStrategy" DROP CONSTRAINT "UserLearnStrategy_createdById_fkey";

-- DropForeignKey
ALTER TABLE "UserLearnStrategy" DROP CONSTRAINT "UserLearnStrategy_learnStrategyId_fkey";

-- DropForeignKey
ALTER TABLE "UserTechnology" DROP CONSTRAINT "UserTechnology_CreatedBy_fkey";

-- DropForeignKey
ALTER TABLE "UserTechnology" DROP CONSTRAINT "UserTechnology_Technology_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_Resource_fkey";

-- DropForeignKey
ALTER TABLE "_IdentityInput" DROP CONSTRAINT "_IdentityInput_A_fkey";

-- DropForeignKey
ALTER TABLE "_IdentityInput" DROP CONSTRAINT "_IdentityInput_B_fkey";

-- DropForeignKey
ALTER TABLE "_IdentityOutput" DROP CONSTRAINT "_IdentityOutput_A_fkey";

-- DropForeignKey
ALTER TABLE "_IdentityOutput" DROP CONSTRAINT "_IdentityOutput_B_fkey";

-- DropForeignKey
ALTER TABLE "_PositionUsers" DROP CONSTRAINT "_PositionUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_PositionUsers" DROP CONSTRAINT "_PositionUsers_B_fkey";

-- DropForeignKey
ALTER TABLE "_PrismaProjectUsers" DROP CONSTRAINT "_PrismaProjectUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_PrismaProjectUsers" DROP CONSTRAINT "_PrismaProjectUsers_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectCustomers" DROP CONSTRAINT "_ProjectCustomers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectCustomers" DROP CONSTRAINT "_ProjectCustomers_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectMemberServices" DROP CONSTRAINT "_ProjectMemberServices_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectMemberServices" DROP CONSTRAINT "_ProjectMemberServices_B_fkey";

-- AlterTable
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "userId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Balance_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Career" DROP CONSTRAINT "Career_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Career_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdBy" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "toUserId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ChatMessageOld" DROP CONSTRAINT "ChatMessageOld_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Room" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "toUser" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "ChatMessageOld_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ChatRoom" DROP CONSTRAINT "ChatRoom_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "code" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "ChatRoom_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CodeChallenge" DROP CONSTRAINT "CodeChallenge_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "externalKey" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Block" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Topic" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "CodeChallenge_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CodeChallengeBlock" DROP CONSTRAINT "CodeChallengeBlock_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Parent" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "CodeChallengeBlock_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CodeChallengeCompletion" DROP CONSTRAINT "CodeChallengeCompletion_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Task" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CodeChallenge" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "CodeChallengeCompletion_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EXReaction" DROP CONSTRAINT "EXReaction_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "reflexId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "relatedToUserId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "EXReaction_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EXReflex" DROP CONSTRAINT "EXReflex_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "EXReflex_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EthAccount" DROP CONSTRAINT "EthAccount_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "userId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "EthAccount_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EthTransaction" DROP CONSTRAINT "EthTransaction_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "userId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "EthTransaction_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "File" DROP CONSTRAINT "File_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "ImageResource" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Gallery" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "File_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "KBConcept" DROP CONSTRAINT "KBConcept_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "KBConcept_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "KBConflict" DROP CONSTRAINT "KBConflict_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "constraintId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "KBConflict_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "KBConflictFact" DROP CONSTRAINT "KBConflictFact_pkey",
ALTER COLUMN "conflictId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "factId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "KBConflictFact_pkey" PRIMARY KEY ("conflictId", "factId");

-- AlterTable
ALTER TABLE "KBConstraint" DROP CONSTRAINT "KBConstraint_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "KBConstraint_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "KBDecision" DROP CONSTRAINT "KBDecision_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "revisedById" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "basedOnProposalId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "KBDecision_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "KBFact" DROP CONSTRAINT "KBFact_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "KBFact_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "KBFactParticipation" DROP CONSTRAINT "KBFactParticipation_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "conceptId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "factId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "KBFactParticipation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "KBFactProjection" DROP CONSTRAINT "KBFactProjection_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "factId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "knowledgeSpaceId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "KBFactProjection_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "KBIdentityOperation" DROP CONSTRAINT "KBIdentityOperation_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "KBIdentityOperation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "KBKnowledgeSpace" DROP CONSTRAINT "KBKnowledgeSpace_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "KBKnowledgeSpace_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "KBLabel" DROP CONSTRAINT "KBLabel_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "conceptId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "KBLabel_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "KBProposal" DROP CONSTRAINT "KBProposal_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "testedBy" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "KBProposal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "LearnStrategy" DROP CONSTRAINT "LearnStrategy_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "LearnStrategy_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "LearnStrategyStage" DROP CONSTRAINT "LearnStrategyStage_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "learnStrategyId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "learnStrategyTargetId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "technologyId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "LearnStrategyStage_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Letter" DROP CONSTRAINT "Letter_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "User" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Letter_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Log" DROP CONSTRAINT "Log_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "objectType" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Log_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MentorMentee" DROP CONSTRAINT "MentorMentee_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "mentorId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "menteeId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "MentorMentee_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MindLog" DROP CONSTRAINT "MindLog_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "relatedToUserId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "MindLog_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "NotificationType" DROP CONSTRAINT "NotificationType_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "code" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "NotificationType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Position" DROP CONSTRAINT "Position_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "code" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Position_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "parentId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "rootId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PostRevision" DROP CONSTRAINT "PostRevision_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "postId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "PostRevision_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Image" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Team" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Resource" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProjectMember" DROP CONSTRAINT "ProjectMember_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "User" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Project" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "ProjectMember_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProjectTask" DROP CONSTRAINT "ProjectTask_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Project" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Task" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "ProjectTask_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ResetPassword" DROP CONSTRAINT "ResetPassword_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "code" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "User" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "ResetPassword_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "code" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Parent" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Team" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Service" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "EthAccount" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "PrismaProject" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Topic" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Blog" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Task" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Resource_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ResourceTag" DROP CONSTRAINT "ResourceTag_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Resource" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Tag" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "ResourceTag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Service" DROP CONSTRAINT "Service_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "code" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Category" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Parent" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Service_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ServiceCategory" DROP CONSTRAINT "ServiceCategory_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "code" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Parent" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Parent" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "ChatRoom" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "projectId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TaskMember" DROP CONSTRAINT "TaskMember_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Task" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "User" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "TaskMember_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TaskReaction" DROP CONSTRAINT "TaskReaction_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Task" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "TaskReaction_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TaskTechnology" DROP CONSTRAINT "TaskTechnology_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Technology" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Task" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "TaskTechnology_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TaskWorkLog" DROP CONSTRAINT "TaskWorkLog_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "taskId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "TaskWorkLog_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Parent" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "User" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Team" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Technology" DROP CONSTRAINT "Technology_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Technology_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TechnologyLesson" DROP CONSTRAINT "TechnologyLesson_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Technology" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "TechnologyLesson_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TechnologyLessonUser" DROP CONSTRAINT "TechnologyLessonUser_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Lesson" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "TechnologyLessonUser_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TelegramAccount" DROP CONSTRAINT "TelegramAccount_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "userId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "TelegramAccount_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Timer" DROP CONSTRAINT "Timer_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Task" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Timer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Token" DROP CONSTRAINT "Token_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "userId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Token_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "userId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "parentId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "balanceId" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "ethTransactionId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "EthAccountAuthed" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "referrerId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserLearnStrategy" DROP CONSTRAINT "UserLearnStrategy_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "createdById" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "learnStrategyId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "UserLearnStrategy_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserTechnology" DROP CONSTRAINT "UserTechnology_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "CreatedBy" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Technology" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "UserTechnology_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "Resource" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "User" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "Vote_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_IdentityInput" DROP CONSTRAINT "_IdentityInput_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "B" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "_IdentityInput_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "_IdentityOutput" DROP CONSTRAINT "_IdentityOutput_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "B" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "_IdentityOutput_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "_PositionUsers" DROP CONSTRAINT "_PositionUsers_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "B" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "_PositionUsers_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "_PrismaProjectUsers" DROP CONSTRAINT "_PrismaProjectUsers_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "B" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "_PrismaProjectUsers_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "_ProjectCustomers" DROP CONSTRAINT "_ProjectCustomers_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "B" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "_ProjectCustomers_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "_ProjectMemberServices" DROP CONSTRAINT "_ProjectMemberServices_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "B" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "_ProjectMemberServices_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EthAccount" ADD CONSTRAINT "EthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelegramAccount" ADD CONSTRAINT "TelegramAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MindLog" ADD CONSTRAINT "MindLog_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_CreatedBy_fkey" FOREIGN KEY ("CreatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_Parent_fkey" FOREIGN KEY ("Parent") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_ChatRoom_fkey" FOREIGN KEY ("ChatRoom") REFERENCES "ChatRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
