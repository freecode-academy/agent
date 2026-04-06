import { builder } from '../../builder'

export const LearnStrategyWhereInput = builder.inputType(
  'LearnStrategyWhereInput',
  {
    fields: (t) => ({
      level: t.int(),
      createdById: t.string(),
    }),
  },
)

export const LearnStrategyWhereUniqueInput = builder.inputType(
  'LearnStrategyWhereUniqueInput',
  {
    fields: (t) => ({
      id: t.id(),
    }),
  },
)

export const LearnStrategyCreateInput = builder.inputType(
  'LearnStrategyCreateInput',
  {
    fields: (t) => ({
      name: t.string({ required: true }),
      description: t.string({ required: false }),
      level: t.int({ required: true }),
    }),
  },
)

export const LearnStrategyUpdateInput = builder.inputType(
  'LearnStrategyUpdateInput',
  {
    fields: (t) => ({
      name: t.string({ required: false }),
      description: t.string({ required: false }),
      level: t.int({ required: false }),
    }),
  },
)
