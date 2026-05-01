import { Prisma, ProjectType } from '@prisma/client'
import { PrismaContext } from 'server/context/interfaces'
import { ProjectWhereInput } from '../inputs'
import { buildStringFilterWhere } from '../../helpers/buildStringNullableFilterWhere'

// interface ProjectWhereInput {
//   status?: ProjectStatus | null
//   id?: string | null
//   pathname?: string | null
// }

type WhereArgs = typeof ProjectWhereInput.$inferInput

export function buildProjectsWhere(
  where: WhereArgs | null | undefined,
  _ctx: PrismaContext | undefined,
): Prisma.ProjectWhereInput {
  // const { currentUser } = ctx || {}

  const { id, pathname, createdById, ...other } = where || {}

  const result: Prisma.ProjectWhereInput = {
    ...other,
    CreatedBy: createdById ? buildStringFilterWhere(createdById) : undefined,
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
    result.id = buildStringFilterWhere(id)
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
