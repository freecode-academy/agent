import { Prisma } from '@prisma/client'
import { builder } from '../../../builder'
import {
  LearnStrategyUpdateDataInput,
  LearnStrategyWhereUniqueInput,
} from '../inputs'

builder.mutationField('updateLearnStrategy', (t) =>
  t.prismaField({
    type: 'LearnStrategy',
    args: {
      data: t.arg({ type: LearnStrategyUpdateDataInput, required: true }),
      where: t.arg({ type: LearnStrategyWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { name, description } = args.data
      const { id: currentUserId } = ctx.currentUser || {}

      const where: Prisma.LearnStrategyWhereUniqueInput = {
        id: args.where.id ?? undefined,
      }

      if (!currentUserId) {
        throw new Error('Please sign in to continue')
      }

      const learnStrategyCurrent = await ctx.prisma.learnStrategy.findUnique({
        where,
      })

      if (!learnStrategyCurrent) {
        throw new Error('Не был получен объект')
      }

      if (learnStrategyCurrent.createdById !== currentUserId) {
        throw new Error('Нельзя редактировать чужой объект')
      }

      if (name !== undefined && !name) {
        throw new Error('Не заполнено название')
      }

      return ctx.prisma.learnStrategy.update({
        ...query,
        data: {
          name,
          description,
        },
        where,
      })
    },
  }),
)
