import { builder } from '../../../builder'
import { LearnStrategyWhereUniqueInput } from '../inputs'

builder.queryField('learnStrategy', (t) =>
  t.prismaField({
    type: 'LearnStrategy',
    args: {
      where: t.arg({ type: LearnStrategyWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { id, ...other } = args.where

      return await ctx.prisma.learnStrategy.findUniqueOrThrow({
        ...query,
        where: { id: id ?? undefined, ...other },
      })
    },
  }),
)
