import { builder } from 'server/schema/builder'

import './resolvers/codeChallenge'
import './resolvers/codeChallenges'

builder.prismaObject('CodeChallenge', {
  fields: (t) => ({
    id: t.exposeID('id', {
      nullable: false,
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime', nullable: false }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime', nullable: false }),
    name: t.exposeString('name'),
    description: t.exposeString('description'),
    instructions: t.exposeString('instructions'),
    rank: t.exposeInt('rank'),

    // parentId: t.exposeString('Parent'),
    // Parent: t.relation('CodeChallenge'),

    // Children: t.relation('other_CodeChallenge'),

    // status: t.field({
    //   type: TeamMemberStatusEnum,
    //   resolve: ({ status }) => status,
    //   nullable: false,
    // }),

    createdById: t.exposeString('CreatedBy'),
    // CreatedBy: t.relation('User_TeamMember_CreatedByToUser'),

    // userId: t.exposeString('User'),
    // User: t.relation('User_TeamMember_CreatedByToUser'),

    topicId: t.exposeString('Topic'),
    Topic: t.relation('Resource'),

    blockId: t.exposeString('Block'),
    CodeChallengeBlock: t.relation('CodeChallengeBlock'),
  }),
})

// import { Prisma } from '@prisma/client'
// import {
//   extendType,
//   inputObjectType,
//   intArg,
//   list,
//   nonNull,
//   objectType,
// } from 'nexus'
// import { updateCodeChallenge } from './resolvers/updateCodeChallenge'

// export const CodeChallenge = objectType({
//   name: 'CodeChallenge',
//   definition(t) {
//     t.id('externalKey')
//     t.string('dashedName')
//     t.string('localeTitle')
//     t.string('videoUrl')
//     t.string('template')
//     t.string('time')

//     t.int('challengeType')
//     t.int('forumTopicId')
//     t.int('order')
//     t.int('superOrder')
//     t.int('challengeOrder')
//     t.int('rank')

//     t.field('translations', { type: 'JSON' })
//     t.field('tests', { type: 'JSON' })
//     t.field('solutions', { type: 'JSON' })
//     t.field('files', { type: 'JSON' })
//     t.field('required', { type: 'JSON' })

//     t.boolean('isRequired')
//     t.boolean('isPrivate')
//     t.boolean('isBeta')
//     t.id('Block')

//     t.id('CreatedBy')
//     t.field('CreatedByUser', {
//       type: 'User',

//       resolve({ CreatedBy }, _, ctx) {
//         return CreatedBy
//           ? ctx.prisma.user.findUnique({ where: { id: CreatedBy } })
//           : null
//       },
//     })

//     t.id('Topic')
//     t.field('CodeChallengeTopic', {
//       type: 'Resource',

//       resolve({ Topic }, _, ctx) {
//         return Topic
//           ? ctx.prisma.resource.findUnique({ where: { id: Topic } })
//           : null
//       },
//     })

//     t.field('CodeChallengeBlock', {
//       type: 'CodeChallengeBlock',
//       resolve({ Block }, _, ctx) {
//         return Block
//           ? ctx.prisma.codeChallengeBlock.findUnique({ where: { id: Block } })
//           : null
//       },
//     })

//     t.list.nonNull.field('CodeChallengeCompletions', {
//       type: 'CodeChallengeCompletion',
//       args: {
//         orderBy: list(
//           nonNull('CodeChallengeCompletionOrderByWithRelationInput')
//         ),
//         where: 'CodeChallengeCompletionWhereInput',
//         take: intArg(),
//         skip: intArg(),
//       },
//       resolve({ id }, args, ctx) {
//         const orderBy =
//           args.orderBy as Prisma.CodeChallengeCompletionFindManyArgs['orderBy']
//         const where =
//           args.where as Prisma.CodeChallengeCompletionFindManyArgs['where']

//         return ctx.prisma.codeChallengeCompletion.findMany({
//           where: {
//             AND: [
//               {
//                 CodeChallenge: id,
//               },
//               {
//                 ...where,
//               },
//             ],
//           },
//           orderBy,
//           take: args.take || undefined,
//           skip: args.skip || undefined,
//         })
//       },
//     })
//   },
// })

// export const CodeChallengeExtendQuery = extendType({
//   type: 'Query',
//   definition(t) {
//     t.crud.codeChallenge({})
//     t.crud.codeChallenges({
//       filtering: true,
//       ordering: true,
//     })
//   },
// })

// export const CodeChallengeExtendMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('updateCodeChallenge', {
//       type: 'CodeChallenge',
//       args: {
//         where: nonNull('CodeChallengeWhereUniqueInput'),
//         data: nonNull('CodeChallengeUpdateInput'),
//       },
//       resolve: updateCodeChallenge,
//     })
//   },
// })

// export const CodeChallengeUpdateInput = inputObjectType({
//   name: 'CodeChallengeUpdateInput',
//   definition(t) {
//     t.string('localeTitle')
//     t.string('description')
//     t.string('instructions')
//   },
// })
