import { builder } from '../../../builder'

builder.queryField('tagsCount', (t) =>
  t.int({
    args: {},
    resolve: async (_root, _args, ctx) => {
      return await ctx.prisma.tag.count({})
    },
  }),
)
