import { builder } from '../../../builder'
import { CodeChallengeWhereUniqueInput } from '../inputs'

builder.queryField('codeChallenge', (t) =>
  t.prismaField({
    type: 'CodeChallenge',
    nullable: true,
    args: {
      where: t.arg({ type: CodeChallengeWhereUniqueInput, required: true }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { id, ...other } = args.where

      return await ctx.prisma.codeChallenge.findUnique({
        ...query,
        where: { id: id ?? undefined, ...other },
      })
    },
  }),
)
