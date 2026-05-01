import { OfferCreateInput } from '../inputs'
import { Offer } from '../types'
import { builder } from 'server/schema/builder'

builder.mutationField('createOffer', (t) =>
  t.field({
    type: Offer,
    args: {
      data: t.arg({ type: OfferCreateInput, required: true }),
    },
    resolve: async (_root, args, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser?.sudo) {
        throw new Error('Unauthorized')
      }

      const { published, ...other } = args.data

      return prisma.offer.create({
        data: {
          ...other,
          createdById: currentUser.id,
          published: published ?? undefined,
        },
      })
    },
  }),
)
