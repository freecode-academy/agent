import { builder } from '../../../builder'
import { LearnStrategyWhereInput } from '../inputs'
import { buildLearnStrategyWhere } from '../helpers/buildLearnStrategyWhere'

builder.queryField('learnStrategiesCount', (t) =>
  t.field({
    type: 'Int',
    args: {
      where: t.arg({ type: LearnStrategyWhereInput }),
    },
    resolve: async (_root, args, ctx) => {
      return await ctx.prisma.learnStrategy.count({
        where: buildLearnStrategyWhere(args.where),
      })
    },
  }),
)
