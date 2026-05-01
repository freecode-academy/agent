import { builder } from 'server/schema/builder'
import { SortOrder } from 'server/schema/types/common'
import { StringNullableFilter } from 'server/schema/types/inputs'

export const OfferOrderByInput = builder.inputType('OfferOrderByInput', {
  fields: (t) => ({
    createdAt: t.field({ type: SortOrder }),
  }),
})

export const OfferWhereInput = builder.inputType('OfferWhereInput', {
  fields: (t) => ({
    id: t.field({
      type: StringNullableFilter,
    }),
    title: t.field({
      type: StringNullableFilter,
    }),
    description: t.field({
      type: StringNullableFilter,
    }),
    intro: t.field({
      type: StringNullableFilter,
    }),
    content: t.field({
      type: StringNullableFilter,
    }),
    published: t.boolean(),
  }),
})

export const OfferWhereUniqueInput = builder.inputType(
  'OfferWhereUniqueInput',
  {
    fields: (t) => ({
      id: t.id(),
    }),
  },
)

export const OfferCreateInput = builder.inputType('OfferCreateInput', {
  fields: (t) => ({
    title: t.string({
      required: true,
    }),
    description: t.string(),
    intro: t.string(),
    content: t.string(),
    image: t.string(),
    published: t.boolean(),
  }),
})

export const OfferUpdateInput = builder.inputType('OfferUpdateInput', {
  fields: (t) => ({
    title: t.string({
      required: true,
    }),
    description: t.string(),
    intro: t.string(),
    content: t.string(),
    image: t.string(),
    published: t.boolean(),
  }),
})
