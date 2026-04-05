import {
  LearnStrategyStageNoNestingFragment,
  MeUserFragment,
  // TechnologyNoNestingFragment,
  LearnStrategyStageTechnologyFragment,
  LearnStrategyFragment,
} from 'src/gql/generated'

export type LearnStageTechnologyProps = {
  learnStrategyStage: LearnStrategyStageNoNestingFragment
  learnStrategy: LearnStrategyFragment
  // technology: TechnologyNoNestingFragment
  technology: LearnStrategyStageTechnologyFragment
  currentUser: MeUserFragment | null | undefined
  // Режим редактирования
  inEditMode: boolean
}
