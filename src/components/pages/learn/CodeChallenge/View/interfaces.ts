import { CodeChallengePageFragment } from 'src/gql/generated'
import { DesktopLayoutProps } from './DesktopLayout/interfaces'

export interface CodeChallengeViewProps {
  codeChallenge: CodeChallengePageFragment
  tabIndex: DesktopLayoutProps['tabIndex']
  topicId: DesktopLayoutProps['topicId']
}
