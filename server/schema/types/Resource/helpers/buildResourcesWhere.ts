import { Prisma, ResourceType } from '@prisma/client'
import { PrismaContext } from 'server/context/interfaces'

interface ResourceWhereInput {
  type?: ResourceType | null
  blogId?: string | null
  topicId?: string | null
}

export function buildResourcesWhere(
  where: ResourceWhereInput | null | undefined,
  ctx: PrismaContext | undefined,
): Prisma.ResourceWhereInput {
  const { currentUser } = ctx || {}

  const { type, blogId, topicId, ...other } = where || {}

  let filterByStatus: Prisma.ResourceWhereInput['AND'] | undefined = [
    {
      published: true,
    },
    {
      deleted: false,
    },
  ]

  if (currentUser) {
    if (currentUser.sudo) {
      filterByStatus = undefined
    } else {
      filterByStatus = [
        {
          CreatedBy: currentUser.id,
        },
        {
          AND: filterByStatus,
        },
      ]
    }
  }

  const result: Prisma.ResourceWhereInput = {
    type: type || undefined,
    AND: filterByStatus || undefined,
    ...other,
    Blog: blogId ?? undefined,
    Topic: topicId ?? undefined,

    /**
     * Исключаем обсуждения тестовых заданий
     */
    CodeChallenges: {
      none: {},
    },
  }

  return result
}
