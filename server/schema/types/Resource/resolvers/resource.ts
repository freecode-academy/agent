import { builder } from '../../../builder'
import { ResourceWhereUniqueInput } from '../inputs'

builder.queryField('resource', (t) =>
  t.prismaField({
    type: 'Resource',
    nullable: true,
    args: {
      where: t.arg({ type: ResourceWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { id, uri, ...other } = args.where

      return await ctx.prisma.resource.findUnique({
        ...query,
        where: {
          id: id ?? undefined,
          uri: uri ?? undefined,
          ...other,
        },
      })
    },
  }),
)
