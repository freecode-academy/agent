import { builder } from 'server/schema/builder'

import './resolvers/codeChallengeBlock'
import './resolvers/codeChallengeBlocks'

builder.prismaObject('CodeChallengeBlock', {
  fields: (t) => ({
    id: t.exposeID('id', {
      nullable: false,
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime', nullable: false }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime', nullable: false }),
    name: t.exposeString('name'),
    rank: t.exposeInt('rank'),

    parentId: t.exposeString('Parent'),
    Parent: t.relation('CodeChallengeBlock'),

    Children: t.relation('other_CodeChallengeBlock'),

    Challenges: t.relation('CodeChallenge'),

    // status: t.field({
    //   type: TeamMemberStatusEnum,
    //   resolve: ({ status }) => status,
    //   nullable: false,
    // }),

    createdById: t.exposeString('CreatedBy'),
    // CreatedBy: t.relation('User_TeamMember_CreatedByToUser'),

    // userId: t.exposeString('User'),
    // User: t.relation('User_TeamMember_CreatedByToUser'),
  }),
})

// import { Prisma } from '@prisma/client'
// import { extendType, objectType } from 'nexus'

// export const CodeChallengeBlock = objectType({
//   name: 'CodeChallengeBlock',
//   definition(t) {
//     t.nonNull.id('id')
//     t.nonNull.date('createdAt')
//     t.nonNull.date('updatedAt')
//     t.string('name')
//     t.int('rank')

//     t.id('Parent')
//     t.field('CodeChallengeBlockParent', {
//       type: 'CodeChallengeBlock',

//       resolve({ Parent }, _, ctx) {
//         return Parent
//           ? ctx.prisma.codeChallengeBlock.findUnique({ where: { id: Parent } })
//           : null
//       },
//     })

//     t.list.nonNull.field('Challenges', {
//       type: 'CodeChallenge',
//       args: {
//         orderBy: 'CodeChallengeOrderByWithRelationInput',
//       },
//       resolve({ id }, args, ctx) {
//         const orderBy = args.orderBy as
//           | Prisma.CodeChallengeOrderByWithRelationInput
//           | undefined

//         return ctx.prisma.codeChallenge.findMany({
//           where: { Block: id },
//           orderBy: orderBy ? [orderBy] : undefined,
//         })
//       },
//     })

//     t.list.nonNull.field('Children', {
//       type: 'CodeChallengeBlock',
//       args: {
//         orderBy: 'CodeChallengeBlockOrderByWithRelationInput',
//       },
//       resolve({ id }, args, ctx) {
//         const orderBy = args.orderBy as
//           | Prisma.CodeChallengeBlockOrderByWithRelationInput
//           | undefined

//         return ctx.prisma.codeChallengeBlock.findMany({
//           where: { Parent: id },
//           orderBy: orderBy ? [orderBy] : undefined,
//         })
//       },
//     })
//   },
// })

// export const CodeChallengeBlockQuery = extendType({
//   type: 'Query',
//   definition(t) {
//     t.crud.codeChallengeBlocks({
//       filtering: true,
//       ordering: true,
//       /**
//        * Сортировка в новой версии не работает, когда массив передан. Да и вообще
//        */
//       // resolve(_, args, ctx) {
//       //   const orderBy = args.orderBy

//       //   console.log('orderBy', orderBy)

//       //   const rank = orderBy?.[0]?.rank

//       //   if (orderBy?.[0] && rank?.sort) {
//       //     console.log('rank', rank?.sort)

//       //     // @ts-expect-error Бага с типизацией сортировки
//       //     orderBy[0].rank = rank?.sort
//       //   }

//       //   // if(orderBy && !Array.isArray(orderBy) && orderBy)

//       //   return ctx.prisma.codeChallengeBlock.findMany({
//       //     ...(args as Prisma.CodeChallengeBlockFindManyArgs),
//       //     orderBy: {
//       //       // createdAt: 'desc',
//       //       rank: 'asc',
//       //     },
//       //   })
//       // },
//     })

//     t.nonNull.int('codeChallengeBlocksCount', {
//       args: {
//         where: 'CodeChallengeBlockWhereInput',
//       },
//       resolve(_, args, ctx) {
//         return ctx.prisma.codeChallengeBlock.count({
//           where: args.where as Prisma.CodeChallengeBlockCountArgs['where'],
//         })
//       },
//     })

//     t.crud.codeChallengeBlock({})
//   },
// })
