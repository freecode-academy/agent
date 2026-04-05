import { LearnStrategyFragment, MeUserFragment } from 'src/gql/generated'

export type LearnStrategiesViewMembersProps = {
  learnStrategy: LearnStrategyFragment
  currentUser: MeUserFragment
}
