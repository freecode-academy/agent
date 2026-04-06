import { builder } from '../../../builder'
import { TechnologyCreateInput } from '../inputs'
import { validateTechnology } from './validateTechnology'

builder.mutationField('createTechnology', (t) =>
  t.prismaField({
    type: 'Technology',
    args: {
      data: t.arg({ type: TechnologyCreateInput, required: true }),
    },
    resolve: async (query, _root, { data }, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser) {
        throw new Error('Please sign in to continue')
      }

      validateTechnology(data)

      const { content, ...other } = data

      return prisma.technology.create({
        ...query,
        data: {
          ...other,
          contentText: content ?? undefined,
          User: {
            connect: {
              id: currentUser.id,
            },
          },
        },
      })
    },
  }),
)
