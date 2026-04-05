import { builder } from '../../../builder'
import { TechnologyWhereInput } from '../inputs'

builder.queryField('technologiesCount', (t) =>
  t.field({
    type: 'Int',
    args: {
      where: t.arg({ type: TechnologyWhereInput }),
    },
    resolve: async (_root, { where }, ctx) => {
      return await ctx.prisma.technology.count({
        where: { CreatedBy: where?.CreatedBy ?? undefined },
      })
    },
  }),
)
