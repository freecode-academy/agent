import { builder } from 'server/schema/builder'
import { OfferWhereInput } from '../inputs'
import { buildOfferWhere } from '../helpers/buildWhere'

builder.queryField('offersCount', (t) =>
  t.int({
    args: {
      where: t.arg({ type: OfferWhereInput }),
    },
    resolve: async (_root, args, ctx) => {
      return await ctx.prisma.offer.count({
        where: buildOfferWhere(args.where, ctx),
      })
    },
  }),
)
