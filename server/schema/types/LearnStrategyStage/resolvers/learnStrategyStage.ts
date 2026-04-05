import { builder } from '../../../builder'
import { LearnStrategyStageWhereUniqueInput } from '../inputs'

builder.queryField('learnStrategyStage', (t) =>
  t.prismaField({
    type: 'LearnStrategyStage',
    nullable: true,
    args: {
      where: t.arg({
        type: LearnStrategyStageWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { id, ...other } = args.where

      return await ctx.prisma.learnStrategyStage.findUnique({
        ...query,
        where: { id: id ?? undefined, ...other },
      })
    },
  }),
)
