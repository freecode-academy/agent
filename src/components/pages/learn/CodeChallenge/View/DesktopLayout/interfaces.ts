import { CodeChallengeFragment } from 'src/gql/generated'
import { CodeChallengeDiscussProps } from './Discuss/interfacse'

export enum DesktopLayoutTabIndex {
  Root = '',
  Discuss = 'discuss',
}

export interface DesktopLayoutProps {
  challenge: CodeChallengeFragment
  tabIndex: DesktopLayoutTabIndex
  topicId: CodeChallengeDiscussProps['topicId']
}
