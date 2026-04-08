// import { Prisma } from '@prisma/client'
// import {
//   enumType,
//   extendType,
//   // inputObjectType,
//   // nonNull,
//   objectType,
// } from 'nexus'
// import { createUserTechnologyProcessor } from './resolvers/createUserTechnologyProcessor'
// import { updateUserTechnologyProcessor } from './resolvers/updateUserTechnologyProcessor'

import { builder } from 'server/schema/builder'

import './inputs'
import './resolvers/createUserTechnology'
import './resolvers/updateUserTechnology'
import './resolvers/deleteUserTechnology'

import {
  UserTechnologyHiringStatusEnum,
  UserTechnologyStatusEnum,
} from './types'

builder.prismaObject('UserTechnology', {
  fields: (t) => ({
    id: t.exposeID('id', {
      nullable: false,
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime', nullable: false }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime', nullable: false }),
    // components: t.expose('components', { type: 'Json', nullable: true }),
    // name: t.exposeString('name'),
    // description: t.exposeString('description', { nullable: true }),
    rating: t.exposeInt('rating', {
      description: 'Рейтинг от 0 до 1000',
    }),
    date_from: t.expose('date_from', { type: 'DateTime' }),
    date_till: t.expose('date_till', { type: 'DateTime' }),
    // createdById: t.exposeString('createdById'),
    // LearnStrategyStages: t.relation('LearnStrategyStages'),
    // UserLearnStrategies: t.relation('UserLearnStrategies'),
    status: t.field({
      type: UserTechnologyStatusEnum,
      resolve: ({ status }) => status,
    }),
    hiring_status: t.field({
      type: UserTechnologyHiringStatusEnum,
      resolve: ({ hiring_status }) => hiring_status,
    }),
    level: t.exposeInt('level', {
      nullable: true,
    }),
    isMentor: t.exposeBoolean('isMentor', {
      description: 'Готов быть ментором',
    }),
    createdById: t.exposeString('CreatedBy'),
    CreatedBy: t.relation('User'),
    technologyId: t.exposeString('Technology'),
    Technology: t.relation('Technology_TechnologyToUserTechnology'),
  }),
})

// export const UserTechnology = objectType({
//   name: 'UserTechnology',
//   definition(t) {
//     t.nonNull.id('id')
//     t.nonNull.date('createdAt')
//     t.nonNull.date('updatedAt')
//     t.field('components', {
//       type: 'JSON',
//     })
//     t.nonNull.int('rating', {
//       description: 'Рейтинг от 0 до 1000',
//     })
//     t.date('date_from')
//     t.date('date_till')
//     t.field('status', {
//       type: 'UserTechnologyStatus',
//     })
//     t.field('hiring_status', {
//       type: 'UserTechnologyHiringStatus',
//     })
//     t.int('level')
//     t.boolean('isMentor', {
//       description: 'Готов быть ментором',
//     })
//     t.id('CreatedBy')
//     t.field('UserTechnologyCreatedBy', {
//       type: 'User',

//       resolve({ CreatedBy }, _, ctx) {
//         return CreatedBy
//           ? ctx.prisma.user.findUnique({ where: { id: CreatedBy } })
//           : null
//       },
//     })
//     t.nonNull.id('Technology')
//     t.nonNull.string('technologyId', {
//       resolve({ Technology }) {
//         return Technology
//       },
//     })
//     t.field('UserTechnologyTechnology', {
//       type: 'Technology',

//       resolve({ Technology }, _, ctx) {
//         return Technology
//           ? ctx.prisma.technology.findUnique({ where: { id: Technology } })
//           : null
//       },
//     })
//   },
// })

// export const UserTechnologyStatus = enumType({
//   name: 'UserTechnologyStatus',
//   members: [
//     {
//       name: 'PlanToStudy',
//       description: 'Планирую изучать',
//     },
//     {
//       name: 'RefusedToStudy',
//       description: 'Отказался изучать',
//     },
//     {
//       name: 'Study',
//       description: 'Изучаю',
//     },
//     {
//       name: 'RarelyUse',
//       description: 'Иногда использую',
//     },
//     {
//       name: 'ActiveUse',
//       description: 'Активно использую',
//     },
//     {
//       name: 'NoLongerUse',
//       description: 'Больше не использую',
//     },
//   ],
// })

// export const UserTechnologyExtendQuery = extendType({
//   type: 'Query',
//   definition(t) {
//     t.crud.userTechnology()

//     t.crud.userTechnologies({
//       filtering: true,
//       ordering: true,
//     })

//     t.nonNull.int('userTechnologysCount', {
//       args: {
//         where: 'UserTechnologyWhereInput',
//       },
//       resolve(_, args, ctx) {
//         const where = args.where as Prisma.UserTechnologyWhereInput

//         return ctx.prisma.userTechnology.count({
//           where,
//         })
//       },
//     })
//   },
// })

// export const UserTechnologyExtendMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('createUserTechnologyProcessor', {
//       type: 'UserTechnologyResponse',
//       args: {
//         data: nonNull('UserTechnologyCreateInput'),
//       },
//       resolve: createUserTechnologyProcessor,
//     })
//     t.nonNull.field('updateUserTechnologyProcessor', {
//       type: 'UserTechnologyResponse',
//       args: {
//         data: nonNull('UserTechnologyUpdateInput'),
//         where: nonNull('UserTechnologyWhereUniqueInput'),
//       },
//       resolve: updateUserTechnologyProcessor,
//     })
//   },
// })

// export const UserTechnologyHiringStatus = enumType({
//   name: 'UserTechnologyHiringStatus',
//   description: 'Готов ли принимать заказы с таким технологиями',
//   members: [
//     {
//       name: 'Active',
//       description: 'Очень интересно',
//     },
//     {
//       name: 'Neutral',
//       description: 'Малоинтересно',
//     },
//     {
//       name: 'Negative',
//       description: 'Отрицательно',
//     },
//   ],
// })

// export const UserTechnologyResponse = objectType({
//   name: 'UserTechnologyResponse',
//   definition(t) {
//     t.nonNull.boolean('success')
//     t.nonNull.string('message')
//     t.nonNull.list.nonNull.field('errors', {
//       type: 'RequestError',
//     })
//     t.field('data', {
//       type: 'UserTechnology',
//     })
//   },
// })

// export const UserTechnologyCreateInput = inputObjectType({
//   name: 'UserTechnologyCreateInput',
//   definition(t) {
//     // t.id('id')
//     // t.field('components', {
//     //   type: 'UserTechnologyLevel',
//     // })
//     // t.date('date_from')
//     // t.date('date_till')
//     // t.field('status', {
//     //   type: 'UserTechnologyStatus',
//     // })
//     // t.field('hiring_status', {
//     //   type: 'UserTechnologyHiringStatus',
//     // })
//     // t.field('level', {
//     //   type: 'UserTechnologyLevel',
//     // })
//     // t.field('CreatedBy', {
//     //   type: 'UserCreateOneInput',
//     // })
//     t.nonNull.field('Technology', {
//       type: 'TechnologyCreateOneWithoutUserTechnologiesInput',
//     })
//   },
// })

// export const UserTechnologyUpdateInput = inputObjectType({
//   name: 'UserTechnologyUpdateInput',
//   definition(t) {
//     t.field('components', {
//       type: 'UserTechnologyLevel',
//     })
//     t.date('date_from')
//     t.date('date_till')
//     t.field('status', {
//       type: 'UserTechnologyStatus',
//     })
//     t.field('hiring_status', {
//       type: 'UserTechnologyHiringStatus',
//     })
//     t.field('level', {
//       type: 'UserTechnologyLevel',
//     })
//     t.boolean('isMentor', {
//       description: 'Готов быть ментором',
//     })
//     // t.field('CreatedBy', {
//     //   type: 'UserCreateOneInput',
//     // })
//     // t.field('Technology', {
//     //   type: 'TechnologyCreateOneWithoutUserTechnologiesInput',
//     // })
//   },
// })

// export const TechnologyCreateOneWithoutUserTechnologiesInput = inputObjectType({
//   name: 'TechnologyCreateOneWithoutUserTechnologiesInput',
//   definition(t) {
//     t.field('connect', {
//       type: 'TechnologyWhereUniqueInput',
//     })
//   },
// })
