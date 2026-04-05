import { builder } from '../../../builder'
import { TechnologyWhereInput } from '../inputs'

builder.queryField('technologies', (t) =>
  t.prismaField({
    type: ['Technology'],
    args: {
      where: t.arg({ type: TechnologyWhereInput }),
      skip: t.arg.int(),
      take: t.arg.int(),
    },
    resolve: async (query, _root, { where, skip, take }, ctx) => {
      return await ctx.prisma.technology.findMany({
        ...query,
        where: { CreatedBy: where?.CreatedBy ?? undefined },
        orderBy: { name: 'asc' },
        skip: skip ?? undefined,
        take: take ?? undefined,
      })
    },
  }),
)
