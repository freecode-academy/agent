import { builder } from '../../builder'
import { ProjectStatusEnum } from './types'

export const ProjectWhereInput = builder.inputType('ProjectWhereInput', {
  fields: (t) => ({
    status: t.field({ type: ProjectStatusEnum }),
    // rootId: t.id(),
    // parentId: t.id(),
    id: t.id(),
    pathname: t.string(),
  }),
})

export const ProjectWhereUniqueInput = builder.inputType(
  'ProjectWhereUniqueInput',
  {
    fields: (t) => ({
      id: t.id(),
    }),
  },
)

// export const ProjectCreateInput = builder.inputType('ProjectCreateInput', {
//   fields: (t) => ({
//     title: t.string({ required: false }),
//     description: t.string({ required: false }),
//     intro: t.string({ required: false }),
//     content: t.string({ required: true }),
//     status: t.field({ type: ProjectStatusEnum, required: false }),
//     parentId: t.id({
//       description: 'Reply',
//     }),
//   }),
// })

// export const ProjectUpdateDataInput = builder.inputType('ProjectUpdateDataInput', {
//   fields: (t) => ({
//     title: t.string({ required: false }),
//     description: t.string({ required: false }),
//     intro: t.string({ required: false }),
//     content: t.string({ required: false }),
//     status: t.field({ type: ProjectStatusEnum, required: false }),
//   }),
// })
