import { builder } from '../../../builder'
import { TeamMemberUpdateInput, TeamMemberWhereUniqueInput } from '../inputs'

builder.mutationField('updateTeamMember', (t) =>
  t.prismaField({
    type: 'TeamMember',
    args: {
      data: t.arg({ type: TeamMemberUpdateInput, required: true }),
      where: t.arg({ type: TeamMemberWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, { data, where }, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser) {
        throw new Error('Please sign in to continue')
      }

      const { status, ...other } = data

      return prisma.teamMember.update({
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
