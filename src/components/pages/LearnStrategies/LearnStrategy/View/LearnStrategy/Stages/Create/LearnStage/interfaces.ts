import {
  CreateLearnStrategyStageMutationVariables,
  Exact,
  LearnStrategyFragment,
  LearnStrategyStageCreateInput,
  // useCreateLearnStrategyStageMutation,
} from 'src/gql/generated'

export type CreateLearnStrategyStageLearnStrategyProps = {
  // mutation: ReturnType<typeof useCreateLearnStrategyStageMutation>
  variables: CreateLearnStrategyStageMutationVariables
  variablesSetter: React.Dispatch<
    React.SetStateAction<
      Exact<{
        data: LearnStrategyStageCreateInput
      }>
    >
  >
  submit: () => void
  inRequest: boolean
  learnStrategy: LearnStrategyFragment
}
