import { builder } from '../../../builder'
import { TechnologyUpdateInput, TechnologyWhereUniqueInput } from '../inputs'
import { validateTechnology } from './validateTechnology'

builder.mutationField('updateTechnology', (t) =>
  t.prismaField({
    type: 'Technology',
    args: {
      data: t.arg({ type: TechnologyUpdateInput, required: true }),
      where: t.arg({ type: TechnologyWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, { data, where }, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser) {
        throw new Error('Please sign in to continue')
      }

      validateTechnology(data)

      const { name, content, ...other } = data

      return prisma.technology.update({
        ...query,
        data: {
          name: name ?? undefined,
          contentText: content ?? undefined,
          ...other,
        },
        where: { id: where.id ?? undefined },
      })
    },
  }),
)
