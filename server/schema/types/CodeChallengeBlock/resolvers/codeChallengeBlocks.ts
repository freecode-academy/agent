import { builder } from 'server/schema/builder'
import {
  CodeChallengeBlockOrderByInput,
  CodeChallengeBlockWhereInput,
} from '../inputs'
import { Prisma } from '@prisma/client'

builder.queryField('codeChallengeBlocks', (t) =>
  t.prismaField({
    type: ['CodeChallengeBlock'],
    args: {
      where: t.arg({ type: CodeChallengeBlockWhereInput }),
      orderBy: t.arg({ type: CodeChallengeBlockOrderByInput }),
      skip: t.arg.int(),
      take: t.arg.int(),
    },
    resolve: async (query, _root, args, ctx) => {
      const { parentId, ...otherWhere } = args.where || {}

      const where: Prisma.CodeChallengeBlockWhereInput = {
        ...otherWhere,
        Parent: parentId,
      }

      return await ctx.prisma.codeChallengeBlock.findMany({
        ...query,
        where,
        orderBy: {
          createdAt: args.orderBy?.createdAt ?? undefined,
          updatedAt: args.orderBy?.updatedAt ?? undefined,
          rank: args.orderBy?.rank ?? undefined,
        },
        skip: args.skip ?? undefined,
        take: args.take ?? undefined,
      })
    },
  }),
)
