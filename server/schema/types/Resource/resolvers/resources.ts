import { builder } from '../../../builder'
import { ResourceOrderByInput, ResourceWhereInput } from '../inputs'
import { buildResourcesWhere } from '../helpers/buildResourcesWhere'

builder.queryField('resources', (t) =>
  t.prismaField({
    type: ['Resource'],
    args: {
      where: t.arg({ type: ResourceWhereInput }),
      orderBy: t.arg({ type: ResourceOrderByInput }),
      skip: t.arg.int(),
      take: t.arg.int(),
    },
    resolve: async (query, _root, args, ctx) => {
      return await ctx.prisma.resource.findMany({
        ...query,
        where: buildResourcesWhere(args.where, ctx),
        orderBy: args.orderBy
          ? {
              name: args.orderBy?.name ?? undefined,
              createdAt: args.orderBy?.createdAt ?? undefined,
              updatedAt: args.orderBy?.updatedAt ?? undefined,
            }
          : {
              createdAt: 'desc',
            },
        skip: args.skip ?? undefined,
        take: args.take ?? undefined,
      })
    },
  }),
)
