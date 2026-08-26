import { builder } from 'server/schema/builder'
import { TaskCreateInput } from '../inputs'

builder.mutationField('createTask', (t) =>
  t.prismaField({
    type: 'Task',
    args: {
      data: t.arg({ type: TaskCreateInput, required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser) {
        throw new Error('Not authenticated')
      }

      const {
        data: { assigneeId, name, ...other },
      } = args

      return prisma.task.create({
        ...query,
        data: {
          title: name,
          description: args.data.description ?? undefined,
          content: args.data.content ?? undefined,
          startDatePlaning: args.data.startDatePlaning ?? undefined,
          endDatePlaning: args.data.endDatePlaning ?? undefined,
          parentId: args.data.parentId ?? undefined,
          ...other,
          createdById: currentUser.id,
          assigneeId: assigneeId !== undefined ? assigneeId : currentUser.id,
        },
      })
    },
  }),
)
