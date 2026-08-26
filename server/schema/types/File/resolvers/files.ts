import { builder } from 'server/schema/builder'
import { buildFileWhere } from '../helpers/buildWhere'
import { FileOrderByInput, FileWhereInput } from '../inputs'

builder.queryField('files', (t) =>
  t.prismaField({
    type: ['File'],
    args: {
      where: t.arg({ type: FileWhereInput }),
      orderBy: t.arg({ type: FileOrderByInput }),
      take: t.arg.int(),
      skip: t.arg.int(),
    },
    resolve: async (query, _root, args, ctx) => {
      const { prisma } = ctx

      return prisma.file.findMany({
        ...query,
        take: args.take ?? 10,
        skip: args.skip ?? 0,
        where: {
          ...buildFileWhere(args.where, ctx),
          Resource: {
            isNot: null,
          },
        },
        orderBy: {
          createdAt: args.orderBy?.createdAt ?? undefined,
          updatedAt: args.orderBy?.updatedAt ?? undefined,
          name: args.orderBy?.name ?? undefined,
          size: args.orderBy?.size ?? undefined,
          rank: args.orderBy?.rank ?? undefined,
        },
      })
    },
  }),
)
