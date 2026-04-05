import { builder } from '../../../builder'
import { ProjectWhereInput } from '../inputs'
import { buildProjectsWhere } from '../helpers/buildProjectsWhere'

builder.queryField('projects', (t) =>
  t.prismaField({
    type: ['Project'],
    args: {
      where: t.arg({ type: ProjectWhereInput }),
      skip: t.arg.int(),
      take: t.arg.int(),
    },
    resolve: async (query, _root, args, ctx) => {
      return await ctx.prisma.project.findMany({
        ...query,
        where: buildProjectsWhere(args.where, ctx),
        orderBy: { createdAt: 'desc' },
        skip: args.skip ?? undefined,
        take: args.take ?? undefined,
      })
    },
  }),
)
