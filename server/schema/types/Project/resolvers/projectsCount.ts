import { builder } from '../../../builder'
import { buildProjectsWhere } from '../helpers/buildProjectsWhere'
import { ProjectWhereInput } from '../inputs'

builder.queryField('projectsCount', (t) =>
  t.int({
    args: {
      where: t.arg({ type: ProjectWhereInput }),
    },
    resolve: async (_root, args, ctx) => {
      return await ctx.prisma.project.count({
        where: buildProjectsWhere(args.where, ctx),
      })
    },
  }),
)
