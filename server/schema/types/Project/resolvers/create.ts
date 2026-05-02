import { builder } from '../../../builder'
import { ProjectCreateInput } from '../inputs'

builder.mutationField('createProject', (t) =>
  t.prismaField({
    type: 'Project',
    args: {
      data: t.arg({ type: ProjectCreateInput, required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser) {
        throw new Error('Not authenticated')
      }

      const {
        data: { title, content, ...other },
      } = args

      return prisma.project.create({
        ...query,
        data: {
          ...other,
          name: title,
          contentText: content,
          // description: args.data.description ?? undefined,
          // content: args.data.content ?? undefined,
          // startDatePlaning: args.data.startDatePlaning ?? undefined,
          // endDatePlaning: args.data.endDatePlaning ?? undefined,
          // parentId: args.data.parentId ?? undefined,
          CreatedBy: currentUser.id,
          // assigneeId: assigneeId !== undefined ? assigneeId : currentUser.id,
        },
      })
    },
  }),
)
