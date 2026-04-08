import { builder } from '../../../builder'
import { UserTechnologyCreateInput } from '../inputs'

builder.mutationField('createUserTechnology', (t) =>
  t.prismaField({
    type: 'UserTechnology',
    args: {
      data: t.arg({ type: UserTechnologyCreateInput, required: true }),
    },
    resolve: async (query, _root, { data }, ctx) => {
      const { currentUser, prisma } = ctx

      if (!currentUser) {
        throw new Error('Please sign in to continue')
      }

      const {
        technologyId,
        date_from: _date_from,
        date_till,
        hiring_status,
        level,
        status,
        // components,
        // isMentor,
        ...other
      } = data

      return prisma.userTechnology.create({
        ...query,
        data: {
          ...other,
          date_from: new Date(),
          date_till,
          hiring_status,
          level,
          status,
          // components,
          // isMentor,
          User: {
            connect: {
              id: currentUser.id,
            },
          },
          Technology_TechnologyToUserTechnology: {
            connect: {
              id: technologyId,
            },
          },
        },
      })
    },
  }),
)
