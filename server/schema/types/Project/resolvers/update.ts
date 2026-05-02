import { builder } from '../../../builder'
import { ProjectWhereUniqueInput, ProjectUpdateInput } from '../inputs'

builder.mutationField('updateProject', (t) =>
  t.prismaField({
    type: 'Project',
    args: {
      where: t.arg({ type: ProjectWhereUniqueInput, required: true }),
      data: t.arg({ type: ProjectUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser) {
        throw new Error('Not authenticated')
      }

      const projectId = args.where.id

      if (!projectId) {
        throw new Error('Project ID is required')
      }

      const existing = await ctx.prisma.project.findFirst({
        where: {
          id: projectId,
          // assigneeId: currentUser.id,
        },
      })

      if (!existing) {
        throw new Error('Project not found')
      }

      if (!currentUser.sudo) {
        if (existing.CreatedBy !== currentUser.id) {
          throw new Error("Cannot edit another user's project")
        }
      }

      const {
        data: { content, ...other },
      } = args

      return prisma.project.update({
        ...query,
        where: {
          id: projectId,
        },
        data: {
          ...other,
          name: args.data.title ?? undefined,
          contentText: content,
          status: args.data.status ?? undefined,
        },
      })
    },
  }),
)
