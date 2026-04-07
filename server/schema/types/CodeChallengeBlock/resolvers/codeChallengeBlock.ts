import { builder } from '../../../builder'
import { CodeChallengeBlockWhereUniqueInput } from '../inputs'

builder.queryField('codeChallengeBlock', (t) =>
  t.prismaField({
    type: 'CodeChallengeBlock',
    nullable: true,
    args: {
      where: t.arg({
        type: CodeChallengeBlockWhereUniqueInput,
        required: true,
      }),
    },
    resolve: async (query, _root, args, ctx) => {
      const { id, ...other } = args.where

      return await ctx.prisma.codeChallengeBlock.findUnique({
        ...query,
        where: { id: id ?? undefined, ...other },
      })
    },
  }),
)
