import { builder } from '../../builder'

export const LearnStrategyStageWhereInput = builder.inputType(
  'LearnStrategyStageWhereInput',
  {
    fields: (t) => ({
      learnStrategyId: t.string(),
    }),
  },
)

export const LearnStrategyStageWhereUniqueInput = builder.inputType(
  'LearnStrategyStageWhereUniqueInput',
  {
    fields: (t) => ({
      id: t.id(),
    }),
  },
)

export const LearnStrategyStageCreateInput = builder.inputType(
  'LearnStrategyStageCreateInput',
  {
    fields: (t) => ({
      LearnStrategy: t.field({
        type: builder.inputType('LearnStrategyConnectInput', {
          fields: (t) => ({
            id: t.id({ required: true }),
          }),
        }),
        required: true,
      }),
      LearnStrategyTarget: t.field({
        type: builder.inputType('LearnStrategyTargetConnectInput', {
          fields: (t) => ({
            id: t.id({ required: true }),
          }),
        }),
      }),
      TechnologyTarget: t.field({
        type: builder.inputType('TechnologyTargetConnectInput', {
          fields: (t) => ({
            id: t.id({ required: true }),
            level: t.int({ required: true }),
          }),
        }),
      }),
    }),
  },
)
