import { builder } from '../../../builder'
import { LearnStrategyWhereInput } from '../inputs'
import { buildLearnStrategyWhere } from '../helpers/buildLearnStrategyWhere'

builder.queryField('learnStrategies', (t) =>
  t.prismaField({
    type: ['LearnStrategy'],
    args: {
      where: t.arg({ type: LearnStrategyWhereInput }),
      skip: t.arg.int(),
      take: t.arg.int(),
    },
    resolve: async (query, _root, args, ctx) => {
      return await ctx.prisma.learnStrategy.findMany({
        ...query,
        where: buildLearnStrategyWhere(args.where),
        orderBy: {
          name: 'asc',
        },
        skip: args.skip ?? undefined,
        take: args.take ?? undefined,
      })
    },
  }),
)
