import { builder } from 'server/schema/builder'
import { ProjectStatusEnum, ProjectTypeEnum } from './types'

import './resolvers/project'
import './resolvers/projects'
import './resolvers/projectsCount'

builder.prismaObject('Project', {
  fields: (t) => ({
    id: t.exposeID('id', {
      nullable: false,
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime', nullable: false }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime', nullable: false }),
    name: t.exposeString('name', { nullable: false }),
    domain: t.exposeString('domain'),
    url: t.exposeString('url'),
    description: t.exposeString('description', { nullable: true }),
    content: t.exposeString('contentText', { nullable: true }),
    // public: t.exposeBoolean('public'),

    createdById: t.exposeString('CreatedBy'),
    CreatedBy: t.relation('User_ProjectToUser'),

    type: t.field({
      type: ProjectTypeEnum,
      resolve: ({ type }) => type,
    }),

    status: t.field({
      type: ProjectStatusEnum,
      resolve: ({ status }) => status,
    }),

    resourceId: t.exposeID('Resource'),
    Resource: t.relation('Resource_Project_ResourceToResource'),
  }),
})

//     t.field('ProjectResource', {
//       type: 'Resource',

//       resolve({ Resource }, _, ctx) {
//         return Resource
//           ? ctx.prisma.resource.findUnique({ where: { id: Resource } })
//           : null
//       },
//     })

// import { Prisma } from '@prisma/client'
// import {
//   enumType,
//   extendType,
//   inputObjectType,
//   nonNull,
//   objectType,
// } from 'nexus'

// import { createProjectProcessor } from './resolvers/createProjectProcessor'
// import { updateProjectProcessor } from './resolvers/updateProjectProcessor'

// export const Project = objectType({
//   name: 'Project',
//   definition(t) {
//     t.nonNull.id('id')
//     t.nonNull.date('createdAt')
//     t.nonNull.date('updatedAt')
//     t.nonNull.string('name')
//     t.string('domain')
//     t.string('description')
//     t.string('url')
//     t.field('content', {
//       type: 'JSON',
//     })
//     t.string('contentText')

//     t.int('sequence')

//     t.field('type', {
//       type: 'ProjectType',
//     })
//     t.field('status', {
//       type: 'ProjectStatus',
//     })
//     t.boolean('public')
//     t.int('oldID')

//     t.id('CreatedBy')
//     t.field('CreatedByUser', {
//       type: 'User',

//       resolve({ CreatedBy }, _, ctx) {
//         return CreatedBy
//           ? ctx.prisma.user.findUnique({ where: { id: CreatedBy } })
//           : null
//       },
//     })
//     t.id('Resource')
//     t.field('ProjectResource', {
//       type: 'Resource',

//       resolve({ Resource }, _, ctx) {
//         return Resource
//           ? ctx.prisma.resource.findUnique({ where: { id: Resource } })
//           : null
//       },
//     })

//     // TODO Restore logic
//     t.list.nonNull.field('Members', {
//       type: 'ProjectMember',
//     })

//     // // TODO Restore logic
//     // t.list.nonNull.field('ProjectTasks', {
//     //   type: 'ProjectTask',
//     //   args: {
//     //     orderBy: 'ProjectTaskOrderByWithRelationInput',
//     //   },
//     //   resolve({ id }, args, ctx) {
//     //     const orderBy = args.orderBy as
//     //       | Prisma.ProjectTaskOrderByWithRelationInput
//     //       | undefined

//     //     return ctx.prisma.projectTask.findMany({
//     //       orderBy,
//     //       where: {
//     //         Project: id,
//     //       },
//     //     })
//     //   },
//     // })
//   },
// })

// export const ProjectExtendQuery = extendType({
//   type: 'Query',
//   definition(t) {
//     t.crud.project({})
//     t.crud.projects({
//       filtering: true,
//       ordering: true,
//     })

//     t.nonNull.int('projectsCount', {
//       args: {
//         where: 'ProjectWhereInput',
//       },
//       resolve(_, args, ctx) {
//         const where = args.where as Prisma.ProjectWhereInput

//         return ctx.prisma.project.count({
//           where,
//         })
//       },
//     })
//   },
// })

// export const ProjectExtendMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('createProjectProcessor', {
//       type: 'ProjectResponse',
//       args: {
//         data: nonNull('ProjectCreateInput'),
//       },
//       resolve: createProjectProcessor,
//     })
//     t.nonNull.field('updateProjectProcessor', {
//       type: 'ProjectResponse',
//       args: {
//         data: nonNull('ProjectUpdateInput'),
//         where: nonNull('ProjectWhereUniqueInput'),
//       },
//       resolve: updateProjectProcessor,
//     })
//   },
// })

// export const ProjectType = enumType({
//   name: 'ProjectType',
//   members: ['Education'],
// })

// export const ProjectStatus = enumType({
//   name: 'ProjectStatus',
//   members: [
//     'New',
//     'Accepted',
//     'Rejected',
//     'Processing',
//     'Completed',
//     'Reopened',
//   ],
// })

// export const ProjectResponse = objectType({
//   name: 'ProjectResponse',
//   definition(t) {
//     t.nonNull.boolean('success')
//     t.nonNull.string('message')
//     t.nonNull.list.nonNull.field('errors', {
//       type: 'RequestError',
//     })
//     t.field('data', {
//       type: 'Project',
//     })
//   },
// })

// export const ProjectCreateInput = inputObjectType({
//   name: 'ProjectCreateInput',
//   definition(t) {
//     t.nonNull.string('name')
//     t.string('url')
//   },
// })

// export const ProjectUpdateInput = inputObjectType({
//   name: 'ProjectUpdateInput',
//   definition(t) {
//     t.string('name')
//     t.string('description')
//     t.string('url')
//     t.field('status', {
//       type: 'ProjectStatus',
//     })
//     t.field('content', {
//       type: 'JSON',
//     })
//     t.string('contentText')
//   },
// })
