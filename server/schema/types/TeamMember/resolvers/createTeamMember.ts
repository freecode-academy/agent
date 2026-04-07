import { Prisma } from '@prisma/client'
import { builder } from '../../../builder'
import { TeamMemberCreateInput } from '../inputs'

builder.mutationField('createTeamMember', (t) =>
  t.prismaField({
    type: 'TeamMember',
    args: {
      data: t.arg({ type: TeamMemberCreateInput, required: true }),
    },
    resolve: async (query, _root, { data }, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser) {
        throw new Error('Please sign in to continue')
      }

      const { team, ...other } = data

      const Team = await prisma.team.findUnique({
        where: {
          id: team.id ?? undefined,
        },
      })

      if (!Team) {
        throw new Error('Can not find team')
      }

      const createData: Prisma.TeamMemberCreateInput = {
        ...other,
        User_TeamMember_CreatedByToUser: {
          connect: {
            id: currentUser.id,
          },
        },
        Team_TeamToTeamMember: {
          connect: {
            id: Team.id,
          },
        },
        User_TeamMember_UserToUser: {
          connect: {
            id: currentUser.id,
          },
        },
        status: 'Applied',
      }

      return prisma.teamMember.create({
        ...query,
        data: createData,
      })
    },
  }),
)
