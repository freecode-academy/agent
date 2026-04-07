import { CodeChallengeFragment, Scalars } from 'src/gql/generated'

export type CodeChallengeDiscussProps = {
  challenge: CodeChallengeFragment
  topicId: Scalars['ID']['input'] | undefined
}
