import { builder } from '../../../builder'

builder.queryField('tags', (t) =>
  t.prismaField({
    type: ['Tag'],
    args: {
      skip: t.arg.int(),
      take: t.arg.int(),
    },
    resolve: async (query, _root, args, ctx) => {
      return await ctx.prisma.tag.findMany({
        ...query,
        orderBy: { name: 'asc' },
        skip: args.skip ?? undefined,
        take: args.take ?? undefined,
      })
    },
  }),
)
