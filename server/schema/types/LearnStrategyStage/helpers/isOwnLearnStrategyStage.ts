import { Prisma } from '@prisma/client'
import { PrismaContext } from 'server/context/interfaces'

/**
 * Проверка является ли текущий пользователь владельцем стретегии
 */
export const isOwnLearnStrategyStage = async (
  ctx: PrismaContext,
  where: Prisma.LearnStrategyStageWhereUniqueInput,
) => {
  const { id: currentUserId } = ctx.currentUser || {}

  if (!currentUserId) {
    throw new Error('Please sign in to continue')
  }

  const learnStrategyStageCurrent =
    await ctx.prisma.learnStrategyStage.findUnique({
      where,
      include: {
        LearnStrategy: true,
      },
    })

  if (!learnStrategyStageCurrent) {
    throw new Error('Не был получен объект')
  }

  if (learnStrategyStageCurrent.LearnStrategy.createdById !== currentUserId) {
    throw new Error('Нельзя редактировать чужой объект')
  }

  return { currentUserId }
}
