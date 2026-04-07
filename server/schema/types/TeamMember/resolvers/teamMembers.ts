import { builder } from 'server/schema/builder'
import { TeamMemberOrderByInput, TeamMemberWhereInput } from '../inputs'

builder.queryField('teamMembers', (t) =>
  t.prismaField({
    type: ['TeamMember'],
    args: {
      where: t.arg({ type: TeamMemberWhereInput }),
      orderBy: t.arg({ type: TeamMemberOrderByInput }),
      skip: t.arg.int(),
      take: t.arg.int(),
    },
    resolve: async (query, _root, args, ctx) => {
      const { currentUser } = ctx

      if (!currentUser) {
        throw new Error('Access denied')
      }

      return await ctx.prisma.teamMember.findMany({
        ...query,
        where: {
          // OR: [
          //   {
          //     CreatedBy: currentUser.id,
          //   },
          //   {
          //     User: currentUser.id,
          //   },
          // ],
        },
        orderBy: {
          createdAt: args.orderBy?.createdAt ?? undefined,
          updatedAt: args.orderBy?.updatedAt ?? undefined,
        },
        skip: args.skip ?? undefined,
        take: args.take ?? undefined,
      })
    },
  }),
)
