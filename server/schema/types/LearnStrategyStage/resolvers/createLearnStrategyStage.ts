import { Prisma } from '@prisma/client'
import { builder } from '../../../builder'
import { LearnStrategyStageCreateInput } from '../inputs'

builder.mutationField('createLearnStrategyStage', (t) =>
  t.prismaField({
    type: 'LearnStrategyStage',
    args: {
      data: t.arg({ type: LearnStrategyStageCreateInput, required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { currentUser, prisma } = ctx

      const { LearnStrategy, LearnStrategyTarget, TechnologyTarget } = args.data

      if (!currentUser) {
        throw new Error('Please sign in to continue')
      }

      const learnStrategyCurrent = await prisma.learnStrategy.findUnique({
        where: { id: LearnStrategy.id },
      })

      if (!learnStrategyCurrent) {
        throw new Error('Не был получен объект')
      }

      if (learnStrategyCurrent.createdById !== currentUser.id) {
        throw new Error('Нельзя редактировать чужой объект')
      }

      const createData: Prisma.LearnStrategyStageCreateInput = {
        LearnStrategy: {
          connect: {
            id: LearnStrategy.id,
          },
        },
      }

      if (LearnStrategyTarget && TechnologyTarget) {
        throw new Error(
          'Необходимо четко указать  или технологию или стретегию (не оба типа)',
        )
      } else if (LearnStrategyTarget) {
        if (!LearnStrategyTarget.id) {
          throw new Error('LearnStrategyTarget.id is empty')
        }

        if (LearnStrategyTarget.id === LearnStrategy.id) {
          throw new Error('Нельзя ссылаться на саму себя')
        }

        createData.LearnStrategyTarget = {
          connect: {
            id: LearnStrategyTarget.id,
          },
        }
      } else if (TechnologyTarget) {
        if (!TechnologyTarget.id) {
          throw new Error('TechnologyTarget.id is empty')
        }

        createData.Technology = {
          connect: {
            id: TechnologyTarget.id,
          },
        }

        createData.level = TechnologyTarget.level
      } else {
        throw new Error('Необходимо указать технологию или стретегию')
      }

      return prisma.learnStrategyStage.create({
        ...query,
        data: createData,
      })
    },
  }),
)
