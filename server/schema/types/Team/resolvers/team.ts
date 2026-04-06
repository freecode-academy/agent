import { builder } from '../../../builder'
import { TeamWhereUniqueInput } from '../inputs'

builder.queryField('team', (t) =>
  t.prismaField({
    type: 'Team',
    nullable: true,
    args: {
      where: t.arg({ type: TeamWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { id, ...other } = args.where

      return await ctx.prisma.team.findUnique({
        ...query,
        where: { id: id ?? undefined, ...other },
      })
    },
  }),
)
