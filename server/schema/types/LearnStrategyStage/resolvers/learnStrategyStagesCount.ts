import { builder } from '../../../builder'
import { LearnStrategyStageWhereInput } from '../inputs'

builder.queryField('learnStrategyStagesCount', (t) =>
  t.field({
    type: 'Int',
    args: {
      where: t.arg({ type: LearnStrategyStageWhereInput }),
    },
    resolve: async (_root, { where }, ctx) => {
      return await ctx.prisma.learnStrategyStage.count({
        where: { learnStrategyId: where?.learnStrategyId ?? undefined },
      })
    },
  }),
)
