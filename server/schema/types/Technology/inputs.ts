import { builder } from '../../builder'

export const TechnologyWhereInput = builder.inputType('TechnologyWhereInput', {
  fields: (t) => ({
    CreatedBy: t.string(),
  }),
})

export const TechnologyWhereUniqueInput = builder.inputType(
  'TechnologyWhereUniqueInput',
  {
    fields: (t) => ({
      id: t.id(),
    }),
  },
)

export const TechnologyCreateInput = builder.inputType(
  'TechnologyCreateInput',
  {
    fields: (t) => ({
      name: t.string({ required: true }),
      description: t.string({ required: false }),
      site_url: t.string({ required: false }),
      content: t.string({ required: false }),
      level1hours: t.int({ required: false }),
      level2hours: t.int({ required: false }),
      level3hours: t.int({ required: false }),
      level4hours: t.int({ required: false }),
      level5hours: t.int({ required: false }),
    }),
  },
)

export const TechnologyUpdateDataInput = builder.inputType(
  'TechnologyUpdateDataInput',
  {
    fields: (t) => ({
      name: t.string({ required: false }),
      description: t.string({ required: false }),
      site_url: t.string({ required: false }),
      content: t.string({ required: false }),
      level1hours: t.int({ required: false }),
      level2hours: t.int({ required: false }),
      level3hours: t.int({ required: false }),
      level4hours: t.int({ required: false }),
      level5hours: t.int({ required: false }),
    }),
  },
)
