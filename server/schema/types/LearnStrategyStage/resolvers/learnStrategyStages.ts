import { builder } from '../../../builder'
import { LearnStrategyStageWhereInput } from '../inputs'

builder.queryField('learnStrategyStages', (t) =>
  t.prismaField({
    type: ['LearnStrategyStage'],
    args: {
      where: t.arg({ type: LearnStrategyStageWhereInput }),
      skip: t.arg.int(),
      take: t.arg.int(),
    },
    resolve: async (query, _root, { where, skip, take }, ctx) => {
      return await ctx.prisma.learnStrategyStage.findMany({
        ...query,
        where: { learnStrategyId: where?.learnStrategyId ?? undefined },
        orderBy: { createdAt: 'asc' },
        skip: skip ?? undefined,
        take: take ?? undefined,
      })
    },
  }),
)
