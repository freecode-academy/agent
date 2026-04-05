import { builder } from '../../../builder'
import { ResourceWhereInput } from '../inputs'
import { buildResourcesWhere } from '../helpers/buildResourcesWhere'

builder.queryField('resourcesCount', (t) =>
  t.int({
    args: {
      where: t.arg({ type: ResourceWhereInput }),
    },
    resolve: async (_root, args, ctx) => {
      return await ctx.prisma.resource.count({
        where: buildResourcesWhere(args.where, ctx),
      })
    },
  }),
)
