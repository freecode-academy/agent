import { builder } from '../../../builder'
import {
  UserTechnologyUpdateInput,
  UserTechnologyWhereUniqueInput,
} from '../inputs'

builder.mutationField('updateUserTechnology', (t) =>
  t.prismaField({
    type: 'UserTechnology',
    args: {
      data: t.arg({ type: UserTechnologyUpdateInput, required: true }),
      where: t.arg({ type: UserTechnologyWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, { data, where }, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser) {
        throw new Error('Please sign in to continue')
      }

      const userTechnology = await prisma.userTechnology.findUnique({
        where: { id: where.id ?? undefined },
      })

      if (!userTechnology) {
        throw new Error('UserTechnology not found')
      }

      if (userTechnology.CreatedBy !== currentUser.id) {
        throw new Error('You can only update your own technologies')
      }

      return prisma.userTechnology.update({
        ...query,
        data,
        where: { id: where.id ?? undefined },
      })
    },
  }),
)
