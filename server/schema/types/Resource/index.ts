import { builder } from 'server/schema/builder'
import { ResourceTypeEnum } from './types'

import './resolvers/resource'
import './resolvers/resources'
import './resolvers/resourcesCount'

builder.prismaObject('Resource', {
  fields: (t) => ({
    id: t.exposeID('id', {
      nullable: false,
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime', nullable: false }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime', nullable: false }),
    name: t.exposeString('name'),
    uri: t.exposeString('uri', { nullable: false }),
    intro: t.exposeString('intro', { nullable: true }),
    longtitle: t.exposeString('longtitle', { nullable: true }),
    // contentText: t.exposeString('contentText', { nullable: true }),
    // contentV2: t.exposeString('contentV2', { nullable: true }),

    contentV2: t.string({
      resolve: ({ contentV2, contentText }) => contentV2 || contentText,
    }),
    published: t.exposeBoolean('published', {
      nullable: false,
    }),
    deleted: t.exposeBoolean('deleted', {
      nullable: false,
    }),
    searchable: t.exposeBoolean('searchable', {
      nullable: false,
    }),

    createdById: t.exposeString('CreatedBy'),
    CreatedBy: t.relation('User'),

    type: t.field({
      type: ResourceTypeEnum,
      resolve: ({ type }) => type,
    }),

    // status: t.field({
    //   type: ProjectStatusEnum,
    //   resolve: ({ status }) => status,
    // }),

    // resourceId: t.exposeID('Resource'),
    // Resource: t.relation('Resource_Project_ResourceToResource'),
  }),
})

// import { Prisma } from '@prisma/client'
// import { enumType, extendType, objectType } from 'nexus'
// // import { deleteResource } from './resolvers/deleteResource'

// export * from './Blog'
// export * from './Comment'
// export * from './Topic'

// export const Resource = objectType({
//   name: 'Resource',
//   definition(t) {
//     t.nonNull.id('id')
//     t.nonNull.date('createdAt')
//     t.nonNull.date('updatedAt')
//     t.field('type', {
//       type: 'ResourceType',
//     })
//     t.string('name')
//     t.string('longtitle')

//     // TODO Сейчас есть бага: если возвращать content при наличии данных в components,
//     // То в редактировании топика используется старый редактор, а не новый
//     t.field('content', {
//       type: 'JSON',
//       // @ts-expect-error types
//       resolve: ({ content, components }) => {
//         /**
//          * Так как ввели новое поле components, если оно заполнено,
//          * то поле content не выводим в целях экономии ресурсов
//          */

//         return components ? null : content
//       },
//       deprecation: 'Use contentV2 with markdown content instead',
//     })
//     t.field('components', {
//       type: 'JSON',
//       deprecation: 'Use contentV2 with markdown content instead',
//     })
//     t.string('contentText', {
//       deprecation: 'Use contentV2 with markdown content instead',
//     })
//     t.string('intro')
//     t.string('contentV2')
//     t.nonNull.boolean('published')
//     t.nonNull.boolean('deleted')
//     t.nonNull.boolean('hidemenu')
//     t.nonNull.boolean('searchable')
//     t.nonNull.boolean('isfolder')
//     t.nonNull.string('uri')
//     t.string('class_key')
//     t.field('rating', {
//       type: 'Decimal',
//     })
//     t.int('positiveVotesCount')
//     t.int('negativeVotesCount')
//     t.int('neutralVotesCount')
//     t.int('oldID')
//     t.int('commentOldID')
//     t.int('template')
//     t.date('mockUpdate')

//     t.field('CreatedBy', {
//       type: 'User',
//       // @ts-expect-error types
//       resolve({ CreatedBy }, _, ctx) {
//         return CreatedBy
//           ? ctx.prisma.user.findUnique({ where: { id: CreatedBy } })
//           : null
//       },
//     })

//     // TODO Перепроверить логику
//     t.list.nonNull.field('Comments', {
//       type: 'Resource',
//       description: 'Комментарии',
//       args: {
//         orderBy: 'ResourceOrderByWithRelationInput',
//       },
//       resolve({ id }, args, ctx) {
//         const orderBy = args.orderBy as Prisma.ResourceOrderByWithRelationInput

//         return id
//           ? ctx.prisma.resource.findMany({
//               where: {
//                 Topic: id,
//               },
//               orderBy: orderBy ? [orderBy] : undefined,
//             })
//           : []
//       },
//     })

//     t.field('Topic', {
//       type: 'Resource',
//       // @ts-expect-error types
//       resolve({ Topic }, _, ctx) {
//         return Topic
//           ? ctx.prisma.resource.findUnique({ where: { id: Topic } })
//           : null
//       },
//     })

//     t.field('Blog', {
//       type: 'Resource',
//       // @ts-expect-error types
//       resolve({ Blog }, _, ctx) {
//         return Blog
//           ? ctx.prisma.resource.findUnique({ where: { id: Blog } })
//           : null
//       },
//     })
//     t.field('Task', {
//       type: 'Task',
//       // @ts-expect-error types
//       resolve({ Task }, _, ctx) {
//         return Task ? ctx.prisma.task.findUnique({ where: { id: Task } }) : null
//       },
//     })
//     t.field('Image', {
//       type: 'File',
//       resolve({ id }, _, ctx) {
//         return id
//           ? ctx.prisma.file.findFirst({ where: { ImageResource: id } })
//           : null
//       },
//     })
//     t.field('CodeChallenge', {
//       type: 'CodeChallenge',
//       resolve({ id }, _, ctx) {
//         // TODO Check logic
//         return id
//           ? ctx.prisma.codeChallenge.findFirst({ where: { Topic: id } })
//           : null
//       },
//     })

//     t.list.nonNull.field('Tags', {
//       type: 'ResourceTag',
//       // args: {
//       // },
//       resolve({ id }, _args, ctx) {
//         return id
//           ? ctx.prisma.resourceTag.findMany({
//               where: {
//                 Resource: id,
//               },
//             })
//           : []
//       },
//     })
//   },
// })

// export const ResourceType = enumType({
//   name: 'ResourceType',
//   members: [
//     'Blog',
//     'Comment',
//     'PersonalBlog',
//     'Project',
//     'Resource',
//     'Service',
//     'Team',
//     'Topic',
//   ],
// })

// export const ResourceResponse = objectType({
//   name: 'ResourceResponse',
//   definition(t) {
//     t.nonNull.boolean('success')
//     t.nonNull.string('message')
//     t.nonNull.list.nonNull.field('errors', {
//       type: 'RequestError',
//     })
//     t.field('data', {
//       type: 'Resource',
//     })
//   },
// })

// export const ResourceExtendQuery = extendType({
//   type: 'Query',
//   definition(t) {
//     t.crud.resource({})
//     t.crud.resources({
//       filtering: true,
//       ordering: true,
//     })

//     t.nonNull.int('resourcesCount', {
//       args: {
//         where: 'ResourceWhereInput',
//       },
//       resolve(_, args, ctx) {
//         const where = args.where as Prisma.ResourceWhereInput

//         return ctx.prisma.resource.count({
//           where,
//         })
//       },
//     })
//   },
// })

// // export const ResourceExtendMutation = extendType({
// //   type: 'Mutation',
// //   definition(t) {
// //     t.nonNull.field('deleteResource', {
// //       type: 'Resource',
// //       description: 'Удаление ресурса',
// //       args: {
// //         where: nonNull('ResourceWhereUniqueInput'),
// //       },
// //       resolve: deleteResource,
// //     })
// //   },
// // })
