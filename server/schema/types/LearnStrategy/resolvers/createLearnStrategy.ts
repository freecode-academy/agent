import { builder } from '../../../builder'
import { LearnStrategyCreateInput } from '../inputs'

builder.mutationField('createLearnStrategy', (t) =>
  t.prismaField({
    type: 'LearnStrategy',
    args: {
      data: t.arg({ type: LearnStrategyCreateInput, required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { currentUser, prisma } = ctx

      const { name, description, level } = args.data

      if (!currentUser) {
        throw new Error('Please sign in to continue')
      }

      if (!name) {
        throw new Error('Не заполнено название')
      }

      const { id: currentUserId, technologyLevel } = currentUser

      if (!technologyLevel) {
        throw new Error(
          'Не указан ваш технологический уровень. Сделать это можно в своем профиле.',
        )
      } else if (technologyLevel + 1 < level) {
        throw new Error(
          `Нельзя указать технологический уровень выше вашего более чем на 1. Максимально разрешенный: ${
            technologyLevel + 1
          }`,
        )
      }

      return prisma.learnStrategy.create({
        ...query,
        data: {
          name,
          description,
          level,
          CreatedBy: {
            connect: {
              id: currentUserId,
            },
          },
        },
      })
    },
  }),
)
