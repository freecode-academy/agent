import { Prisma, ProjectStatus, ProjectType } from '@prisma/client'
import { PrismaContext } from 'server/context/interfaces'

interface ProjectWhereInput {
  status?: ProjectStatus | null
  id?: string | null
  pathname?: string | null
}

export function buildProjectsWhere(
  where: ProjectWhereInput | null | undefined,
  _ctx: PrismaContext | undefined,
): Prisma.ProjectWhereInput {
  // const { currentUser } = ctx || {}

  const { id, pathname, ...other } = where || {}

  const result: Prisma.ProjectWhereInput = {
    ...other,
    AND: [
      {
        OR: [
          {
            type: null,
          },
          {
            type: {
              not: {
                equals: ProjectType.Education,
              },
            },
          },
        ],
      },
    ],
  }

  if (id) {
    result.id = id
  } else if (pathname) {
    result.Resource_Project_ResourceToResource = {
      OR: [
        {
          uri: {
            equals: pathname,
          },
        },
        {
          uri: {
            equals: pathname + '/',
          },
        },
      ],
    }
  }

  // if (currentUser) {
  //   result.OR = [
  //     {
  //       CreatedBy: currentUser.id,
  //     },
  //     {
  //       public: true,
  //     },
  //   ]
  // } else {
  //   result.public = true
  // }

  return result
}
