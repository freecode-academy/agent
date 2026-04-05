import { builder } from '../../../builder'
import { ResourceWhereInput } from '../inputs'
import { buildResourcesWhere } from '../helpers/buildResourcesWhere'

builder.queryField('resources', (t) =>
  t.prismaField({
    type: ['Resource'],
    args: {
      where: t.arg({ type: ResourceWhereInput }),
      skip: t.arg.int(),
      take: t.arg.int(),
    },
    resolve: async (query, _root, args, ctx) => {
      return await ctx.prisma.resource.findMany({
        ...query,
        where: buildResourcesWhere(args.where, ctx),
        orderBy: { createdAt: 'desc' },
        skip: args.skip ?? undefined,
        take: args.take ?? undefined,
      })
    },
  }),
)
