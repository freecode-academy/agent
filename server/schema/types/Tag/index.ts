import { builder } from 'server/schema/builder'

import './resolvers/tag'
import './resolvers/tags'
import './resolvers/tagsCount'

builder.prismaObject('Tag', {
  fields: (t) => ({
    id: t.exposeID('id', {
      nullable: false,
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime', nullable: false }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime', nullable: false }),
    name: t.exposeString('name', { nullable: false }),

    createdById: t.exposeString('CreatedBy'),

    Resources: t.relation('ResourceTags'),
  }),
})

// import { Prisma } from '@prisma/client'
// import { extendType, objectType } from 'nexus'

// export const Tag = objectType({
//   name: 'Tag',
//   definition(t) {
//     t.nonNull.id('id')
//     t.nonNull.date('createdAt')
//     t.nonNull.date('updatedAt')
//     t.nonNull.string('name')
//     t.id('CreatedBy')
//     t.field('CreatedByUser', {
//       type: 'User',

//       resolve({ CreatedBy }, _, ctx) {
//         return CreatedBy
//           ? ctx.prisma.user.findUnique({ where: { id: CreatedBy } })
//           : null
//       },
//     })
//     t.list.nonNull.field('Resources', {
//       type: 'ResourceTag',

//       resolve({ id }, _, ctx) {
//         return ctx.prisma.resourceTag.findMany({
//           where: {
//             Tag: id,
//           },
//         })
//       },
//     })
//   },
// })

// export const TagExtendQuery = extendType({
//   type: 'Query',
//   definition(t) {
//     t.crud.tag({})
//     t.crud.tags({
//       filtering: true,
//       ordering: true,
//     })

//     t.nonNull.int('tagsCount', {
//       args: {
//         where: 'TagWhereInput',
//       },
//       resolve(_, args, ctx) {
//         const where = args.where as Prisma.TagWhereInput

//         return ctx.prisma.tag.count({
//           where,
//         })
//       },
//     })
//   },
// })
