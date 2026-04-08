import { builder } from '../../../builder'
import { UserTechnologyWhereUniqueInput } from '../inputs'

builder.mutationField('deleteUserTechnology', (t) =>
  t.prismaField({
    type: 'UserTechnology',
    args: {
      where: t.arg({ type: UserTechnologyWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, { where }, ctx) => {
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
        throw new Error('You can only delete your own technologies')
      }

      return prisma.userTechnology.delete({
        ...query,
        where: { id: where.id ?? undefined },
      })
    },
  }),
)
