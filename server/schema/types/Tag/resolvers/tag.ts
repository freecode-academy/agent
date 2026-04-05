import { builder } from '../../../builder'
import { TagWhereUniqueInput } from '../inputs'

builder.queryField('tag', (t) =>
  t.prismaField({
    type: 'Tag',
    nullable: true,
    args: {
      where: t.arg({ type: TagWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { id, name, ...other } = args.where

      return await ctx.prisma.tag.findUnique({
        ...query,
        where: { id: id ?? undefined, name: name ?? undefined, ...other },
      })
    },
  }),
)
