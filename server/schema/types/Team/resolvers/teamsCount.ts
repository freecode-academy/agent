import { builder } from '../../../builder'
import { buildTeamsWhere } from '../helpers/buildTeamsWhere'
import { TeamWhereInput } from '../inputs'

builder.queryField('teamsCount', (t) =>
  t.int({
    args: {
      where: t.arg({ type: TeamWhereInput }),
    },
    resolve: async (_root, args, ctx) => {
      return await ctx.prisma.team.count({
        where: buildTeamsWhere(args.where, ctx),
      })
    },
  }),
)
