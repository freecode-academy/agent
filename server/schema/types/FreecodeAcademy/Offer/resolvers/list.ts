import { builder } from 'server/schema/builder'
import { Offer } from '../types'
import { OfferOrderByInput, OfferWhereInput } from '../inputs'
import { InferArgs } from 'server/schema/types/helpers/types'
import { PrismaContext } from 'server/context/interfaces'
import { GraphQLResolveInfo } from 'graphql'
import { buildOfferWhere } from '../helpers/buildWhere'

type Offer = typeof Offer.$inferType

export const offersResolverArgs = (
  t: Parameters<Parameters<typeof builder.queryField>[1]>[0],
) => ({
  where: t.arg({ type: OfferWhereInput }),
  orderBy: t.arg({ type: OfferOrderByInput }),
  skip: t.arg.int(),
  take: t.arg.int(),
})

type ConceptsArgs = InferArgs<ReturnType<typeof offersResolverArgs>>

export const offersResolver = async (
  _root: unknown,
  args: ConceptsArgs,
  ctx: PrismaContext,
  _info?: GraphQLResolveInfo,
): Promise<Offer[]> => {
  const { prisma } = ctx

  const where = buildOfferWhere(args.where, ctx)

  return await prisma.offer.findMany({
    where,
    orderBy: { createdAt: 'asc' },
    skip: args.skip ?? undefined,
    take: args.take ?? undefined,
    include: {
      CreatedBy: true,
    },
  })
}

builder.queryField('offers', (t) =>
  t.field({
    type: [Offer],
    args: {
      where: t.arg({ type: OfferWhereInput }),
      skip: t.arg.int(),
      take: t.arg.int(),
    },
    resolve: offersResolver,
  }),
)
