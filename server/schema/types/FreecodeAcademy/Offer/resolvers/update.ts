import { OfferUpdateInput, OfferWhereUniqueInput } from '../inputs'
import { Offer } from '../types'
import { builder } from 'server/schema/builder'

builder.mutationField('updateOffer', (t) =>
  t.field({
    type: Offer,
    args: {
      where: t.arg({ type: OfferWhereUniqueInput, required: true }),
      data: t.arg({ type: OfferUpdateInput, required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser?.sudo) {
        throw new Error('Unauthorized')
      }

      const { published, ...other } = args.data
      const { id, ...otherWhere } = args.where

      return prisma.offer.update({
        where: {
          ...otherWhere,
          id: id ?? undefined,
        },
        data: {
          ...other,
          createdById: currentUser.id,
          published: published ?? undefined,
        },
      })
    },
  }),
)
