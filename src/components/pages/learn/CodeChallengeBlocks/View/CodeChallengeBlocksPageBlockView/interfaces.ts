import { CodeChallengeBlockFragment } from 'src/gql/generated'

export interface CodeChallengeBlocksPageBlockViewProps
  extends React.PropsWithChildren {
  object: CodeChallengeBlockFragment
  opened?: boolean
}
