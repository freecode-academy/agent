import { LearnStrategyFragment, MeUserFragment } from 'src/gql/generated'

export type LearnStrategyViewStagesProps = {
  learnStrategy: LearnStrategyFragment
  loadedIDsWithCurrent: string[]
  currentUser: MeUserFragment | null | undefined
  inEditMode: boolean
}
