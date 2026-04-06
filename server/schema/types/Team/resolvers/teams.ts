import { builder } from '../../../builder'
import { TeamOrderByInput, TeamWhereInput } from '../inputs'
import { buildTeamsWhere } from '../helpers/buildTeamsWhere'

builder.queryField('teams', (t) =>
  t.prismaField({
    type: ['Team'],
    args: {
      where: t.arg({ type: TeamWhereInput }),
      orderBy: t.arg({ type: TeamOrderByInput }),
      skip: t.arg.int(),
      take: t.arg.int(),
    },
    resolve: async (query, _root, args, ctx) => {
      return await ctx.prisma.team.findMany({
        ...query,
        where: buildTeamsWhere(args.where, ctx),
        orderBy: {
          updatedAt: args.orderBy?.updatedAt ?? undefined,
          name: args.orderBy?.name ?? undefined,
        },
        skip: args.skip ?? undefined,
        take: args.take ?? undefined,
      })
    },
  }),
)
