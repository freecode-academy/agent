import { builder } from '../../builder'
import { ResourceTypeEnum } from './types'

export const ResourceWhereInput = builder.inputType('ResourceWhereInput', {
  fields: (t) => ({
    type: t.field({ type: ResourceTypeEnum }),
    blogId: t.string(),
  }),
})

export const ResourceWhereUniqueInput = builder.inputType(
  'ResourceWhereUniqueInput',
  {
    fields: (t) => ({
      id: t.id(),
      uri: t.string(),
    }),
  },
)

export const ResourceCreateInput = builder.inputType('ResourceCreateInput', {
  fields: (t) => ({
    title: t.string({ required: false }),
    description: t.string({ required: false }),
    intro: t.string({ required: false }),
    content: t.string({ required: true }),
    type: t.field({ type: ResourceTypeEnum, required: false }),
    parentId: t.id({
      description: 'Reply',
    }),
  }),
})

export const ResourceUpdateDataInput = builder.inputType(
  'ResourceUpdateDataInput',
  {
    fields: (t) => ({
      title: t.string({ required: false }),
      description: t.string({ required: false }),
      intro: t.string({ required: false }),
      content: t.string({ required: false }),
      type: t.field({ type: ResourceTypeEnum, required: false }),
    }),
  },
)
