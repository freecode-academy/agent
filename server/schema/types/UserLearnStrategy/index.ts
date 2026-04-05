// import { Prisma } from '@prisma/client'
// import { extendType, objectType } from 'nexus'
// import { createUserLearnStrategy } from './resolvers/createUserLearnStrategy'

import { builder } from 'server/schema/builder'

builder.prismaObject('UserLearnStrategy', {
  fields: (t) => ({
    id: t.exposeID('id', {
      nullable: false,
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime', nullable: false }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime', nullable: false }),
    createdById: t.exposeID('createdById'),
    CreatedBy: t.relation('CreatedBy'),
    learnStrategyId: t.exposeID('learnStrategyId'),
    LearnStrategy: t.relation('LearnStrategy'),
    // name: t.exposeString('name'),
    // description: t.exposeString('description', { nullable: true }),
    // components: t.expose('components', { type: 'Json', nullable: true }),
    // contentText: t.exposeString('contentText', { nullable: true }),
    // site_url: t.exposeString('site_url', { nullable: true }),
    // level1hours: t.exposeInt('level1hours', { nullable: true }),
    // level2hours: t.exposeInt('level2hours', { nullable: true }),
    // level3hours: t.exposeInt('level3hours', { nullable: true }),
    // level4hours: t.exposeInt('level4hours', { nullable: true }),
    // level5hours: t.exposeInt('level5hours', { nullable: true }),
    // CreatedBy: t.exposeString('CreatedBy'),
    // UserTechnologies: t.relation('UserTechnologies'),
    // LearnStrategyStages: t.relation('LearnStrategyStages'),
  }),
})

// export const UserLearnStrategy = objectType({
//   name: 'UserLearnStrategy',
//   definition(t) {
//     t.nonNull.id('id')
//     t.nonNull.date('createdAt')
//     t.nonNull.date('updatedAt')
//     // t.string('name')
//     // t.field('components', { type: 'JSON' })
//     // t.string('contentText')
//     t.string('createdById')
//     t.field('CreatedBy', {
//       type: 'User',

//       resolve({ createdById }, _, ctx) {
//         return createdById
//           ? ctx.prisma.user.findUnique({ where: { id: createdById } })
//           : null
//       },
//     })
//     t.string('learnStrategyId')
//     t.field('LearnStrategy', {
//       type: 'LearnStrategy',

//       resolve({ learnStrategyId }, _, ctx) {
//         return learnStrategyId
//           ? ctx.prisma.learnStrategy.findUnique({
//               where: { id: learnStrategyId },
//             })
//           : null
//       },
//     })
//   },
// })

// export const UserLearnStrategyExtendQuery = extendType({
//   type: 'Query',
//   definition(t) {
//     t.crud.userLearnStrategy()

//     t.crud.userLearnStrategies({
//       filtering: true,
//       ordering: true,
//     })

//     t.nonNull.int('userLearnStrategiesCount', {
//       args: {
//         where: 'UserLearnStrategyWhereInput',
//       },
//       resolve(_, args, ctx) {
//         const where = args.where as Prisma.UserLearnStrategyWhereInput

//         return ctx.prisma.userLearnStrategy.count({
//           where,
//         })
//       },
//     })
//   },
// })

// export const UserLearnStrategyExtendMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('createUserLearnStrategy', {
//       type: 'UserLearnStrategy',
//       args: {
//         data: nonNull('UserLearnStrategyCreateInput'),
//       },
//       resolve: createUserLearnStrategy,
//     })
//   },
// })

// export const UserLearnStrategyCreateInput = inputObjectType({
//   name: 'UserLearnStrategyCreateInput',
//   definition(t) {
//     t.nonNull.field('LearnStrategy', {
//       type: 'LearnStrategyWhereUniqueInput',
//     })
//   },
// })
