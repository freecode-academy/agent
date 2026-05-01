import { builder } from 'server/schema/builder'
import { OfferWhereUniqueInput } from '../inputs'
import { Offer } from '../types'

builder.queryField('offer', (t) =>
  t.field({
    type: Offer,
    args: {
      where: t.arg({ type: OfferWhereUniqueInput, required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const {
        where: { id },
      } = args

      const offer = await ctx.prisma.offer.findUnique({
        where: {
          id: id ?? undefined,
        },
        include: {
          CreatedBy: true,
        },
      })

      if (!offer) {
        throw new Error('Offer not found or access denied')
      }

      return offer
    },
  }),
)
