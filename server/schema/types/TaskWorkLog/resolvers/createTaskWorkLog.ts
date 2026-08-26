import { builder } from 'server/schema/builder'
import { TaskWorkLogCreateInput } from '../inputs'

builder.mutationField('createTaskWorkLog', (t) =>
  t.prismaField({
    type: 'TaskWorkLog',
    args: {
      data: t.arg({ type: TaskWorkLogCreateInput, required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser) {
        throw new Error('Not authenticated')
      }

      const task = await ctx.prisma.task.findUnique({
        where: {
          id: args.data.taskId,
        },
      })

      if (!task) {
        throw new Error('Task not found')
      }

      if (!currentUser.sudo) {
        if (!(
          task.createdById === currentUser.id ||
          task.assigneeId === currentUser.id
        )) {
          throw new Error('Access denied')
        }
      }

      return prisma.taskWorkLog.create({
        ...query,
        data: {
          taskId: args.data.taskId,
          content: args.data.content,
          createdById: currentUser.id,
        },
      })
    },
  }),
)
