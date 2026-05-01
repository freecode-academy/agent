import { Prisma } from '@prisma/client'
import { PrismaContext } from 'server/context/interfaces'
import { OfferWhereInput } from '../inputs'
import { buildStringFilterWhere } from 'server/schema/types/helpers/buildStringNullableFilterWhere'

type OfferWhereInput = typeof OfferWhereInput.$inferInput

export function buildOfferWhere(
  where: OfferWhereInput | null | undefined,
  _ctx: PrismaContext | undefined,
): Prisma.OfferWhereInput {
  const { id, title, description, intro, content, published, ...other } =
    where || {}

  const result: Prisma.OfferWhereInput = {
    ...other,
    id: buildStringFilterWhere(id),
    title: buildStringFilterWhere(title),
    description: buildStringFilterWhere(description),
    intro: buildStringFilterWhere(intro),
    content: buildStringFilterWhere(content),
    published:
      typeof published === 'boolean'
        ? {
            equals: published,
          }
        : undefined,
  }

  return result
}
