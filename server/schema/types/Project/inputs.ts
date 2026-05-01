import { builder } from '../../builder'
import { StringNullableFilter } from '../inputs'
import { ProjectStatusEnum } from './types'

export const ProjectWhereInput = builder.inputType('ProjectWhereInput', {
  fields: (t) => ({
    id: t.field({
      type: StringNullableFilter,
    }),
    pathname: t.string(),
    status: t.field({ type: ProjectStatusEnum }),
    createdById: t.field({
      type: StringNullableFilter,
    }),
  }),
})

// parentId: t.field({
//   type: StringNullableFilter,
// }),
// assigneeId: t.field({
//   type: StringNullableFilter,
// }),
// status: t.field({ type: TaskStatusEnum }),
// projectId: t.field({
//   type: StringNullableFilter,
// }),
// incompletedOnly: t.boolean({ defaultValue: true }),

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
