import { builder } from '../../../builder'
import { ProjectWhereUniqueInput } from '../inputs'

builder.queryField('project', (t) =>
  t.prismaField({
    type: 'Project',
    nullable: true,
    args: {
      where: t.arg({ type: ProjectWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { id, ...other } = args.where

      return await ctx.prisma.project.findUnique({
        ...query,
        where: { id: id ?? undefined, ...other },
      })
    },
  }),
)
