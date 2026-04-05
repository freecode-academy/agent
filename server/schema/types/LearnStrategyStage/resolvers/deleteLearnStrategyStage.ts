import { builder } from '../../../builder'
import { LearnStrategyStageWhereUniqueInput } from '../inputs'

builder.mutationField('deleteLearnStrategyStage', (t) =>
  t.prismaField({
    type: 'LearnStrategyStage',
    args: {
      where: t.arg({
        type: LearnStrategyStageWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser) {
        throw new Error('Please sign in to continue')
      }

      const where = { id: args.where.id ?? undefined }

      const learnStrategyStageCurrent =
        await prisma.learnStrategyStage.findUnique({
          where,
          include: {
            LearnStrategy: true,
          },
        })

      if (!learnStrategyStageCurrent) {
        throw new Error('Не был получен объект')
      }

      if (
        learnStrategyStageCurrent.LearnStrategy.createdById !== currentUser.id
      ) {
        throw new Error('Нельзя редактировать чужой объект')
      }

      return prisma.learnStrategyStage.delete({
        ...query,
        where,
      })
    },
  }),
)
