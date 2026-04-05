import { builder } from '../../../builder'
import { TechnologyWhereUniqueInput } from '../inputs'

builder.queryField('technology', (t) =>
  t.prismaField({
    type: 'Technology',
    nullable: true,
    args: {
      where: t.arg({ type: TechnologyWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { id, ...other } = args.where

      return await ctx.prisma.technology.findUnique({
        ...query,
        where: { id: id ?? undefined, ...other },
      })
    },
  }),
)
