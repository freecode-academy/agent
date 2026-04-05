import { Prisma } from '@prisma/client'

interface LearnStrategyWhereInput {
  level?: number | null
  createdById?: string | null
}

export function buildLearnStrategyWhere(
  where: LearnStrategyWhereInput | null | undefined,
): Prisma.LearnStrategyWhereInput {
  const { level, createdById, ...other } = where || {}

  const result: Prisma.LearnStrategyWhereInput = {
    level: level ?? undefined,
    createdById: createdById ?? undefined,
    ...other,
  }

  return result
}
