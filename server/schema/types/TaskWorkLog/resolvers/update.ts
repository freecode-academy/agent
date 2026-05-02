import { builder } from '../../../builder'
import { TaskWorkLogWhereUniqueInput, TaskWorkLogUpdateInput } from '../inputs'

builder.mutationField('updateTaskWorkLog', (t) =>
  t.prismaField({
    type: 'TaskWorkLog',
    args: {
      where: t.arg({ type: TaskWorkLogWhereUniqueInput, required: true }),
      data: t.arg({ type: TaskWorkLogUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser) {
        throw new Error('Not authenticated')
      }

      const taskWorkLogId = args.where.id

      if (!taskWorkLogId) {
        throw new Error('TaskWorkLog ID is required')
      }

      const existing = await ctx.prisma.taskWorkLog.findFirst({
        where: {
          id: taskWorkLogId,
        },
      })

      if (!existing) {
        throw new Error('TaskWorkLog not found')
      }

      if (!currentUser.sudo) {
        if (existing.createdById !== currentUser.id) {
          throw new Error("Cannot edit another user's taskWorkLog")
        }
      }

      const {
        data: { content, ...other },
      } = args

      return prisma.taskWorkLog.update({
        ...query,
        where: {
          id: taskWorkLogId,
        },
        data: {
          ...other,
          content: content ?? undefined,
        },
      })
    },
  }),
)
