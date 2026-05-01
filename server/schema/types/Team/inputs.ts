import { builder } from '../../builder'
import { SortOrder } from '../common'
import { TeamStatusEnum } from './types'

export const TeamOrderByInput = builder.inputType('TeamOrderByInput', {
  fields: (t) => ({
    createdAt: t.field({ type: SortOrder }),
    updatedAt: t.field({ type: SortOrder }),
    name: t.field({ type: SortOrder }),
  }),
})

export const TeamWhereInput = builder.inputType('TeamWhereInput', {
  fields: (t) => ({
    status: t.field({ type: TeamStatusEnum }),
  }),
})

export const TeamWhereUniqueInput = builder.inputType('TeamWhereUniqueInput', {
  fields: (t) => ({
    id: t.id(),
  }),
})

export const TeamCreateInput = builder.inputType('TeamCreateInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    address: t.string({ required: false }),
    website: t.string({ required: false }),
    content: t.string({ required: false }),
    description: t.string({ required: false }),
    intro: t.string({ required: false }),
    image: t.string({ required: false }),
    status: t.field({ type: TeamStatusEnum, required: true }),
  }),
})

export const TeamUpdateInput = builder.inputType('TeamUpdateInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    address: t.string({ required: false }),
    website: t.string({ required: false }),
    content: t.string({ required: false }),
    description: t.string({ required: false }),
    intro: t.string({ required: false }),
    image: t.string({ required: false }),
    status: t.field({ type: TeamStatusEnum, required: false }),
  }),
})
