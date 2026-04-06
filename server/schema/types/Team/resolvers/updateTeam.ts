import { builder } from '../../../builder'
import { TeamUpdateInput, TeamWhereUniqueInput } from '../inputs'

builder.mutationField('updateTeam', (t) =>
  t.prismaField({
    type: 'Team',
    args: {
      data: t.arg({ type: TeamUpdateInput, required: true }),
      where: t.arg({ type: TeamWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, { data, where }, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser) {
        throw new Error('Please sign in to continue')
      }

      const { status, ...other } = data

      return prisma.team.update({
        ...query,
        data: {
          ...other,
          status: status ?? undefined,
        },
        where: { id: where.id ?? undefined },
      })
    },
  }),
)
