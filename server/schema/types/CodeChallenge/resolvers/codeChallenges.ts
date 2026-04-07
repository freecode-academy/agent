import { builder } from 'server/schema/builder'
import { CodeChallengeOrderByInput, CodeChallengeWhereInput } from '../inputs'

builder.queryField('codeChallenges', (t) =>
  t.prismaField({
    type: ['CodeChallenge'],
    args: {
      where: t.arg({ type: CodeChallengeWhereInput }),
      orderBy: t.arg({ type: CodeChallengeOrderByInput }),
      skip: t.arg.int(),
      take: t.arg.int(),
    },
    resolve: async (query, _root, args, ctx) => {
      return await ctx.prisma.codeChallenge.findMany({
        ...query,
        where: {},
        orderBy: {
          createdAt: args.orderBy?.createdAt ?? undefined,
          updatedAt: args.orderBy?.updatedAt ?? undefined,
        },
        skip: args.skip ?? undefined,
        take: args.take ?? undefined,
      })
    },
  }),
)
