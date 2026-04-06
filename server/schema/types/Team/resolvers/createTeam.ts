import { builder } from '../../../builder'
import { TeamCreateInput } from '../inputs'

builder.mutationField('createTeam', (t) =>
  t.prismaField({
    type: 'Team',
    args: {
      data: t.arg({ type: TeamCreateInput, required: true }),
    },
    resolve: async (query, _root, { data }, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser) {
        throw new Error('Please sign in to continue')
      }

      const { ...other } = data

      return prisma.team.create({
        ...query,
        data: {
          ...other,
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
