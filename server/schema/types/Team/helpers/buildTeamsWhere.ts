import { Prisma, TeamStatus } from '@prisma/client'
import { PrismaContext } from 'server/context/interfaces'

interface TeamWhereInput {
  status?: TeamStatus | null
  // id?: string | null
  // pathname?: string | null
}

export function buildTeamsWhere(
  where: TeamWhereInput | null | undefined,
  ctx: PrismaContext | undefined,
): Prisma.TeamWhereInput {
  const { currentUser } = ctx || {}

  const { status, ...other } = where || {}

  const result: Prisma.TeamWhereInput = {
    status: status ?? undefined,
    ...other,
  }

  if (currentUser) {
    result.OR = [
      {
        CreatedBy: currentUser.id,
      },
      {
        status: TeamStatus.Active,
      },
    ]
  } else {
    result.status = TeamStatus.Active
  }

  return result
}
