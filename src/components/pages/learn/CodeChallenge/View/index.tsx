import React from 'react'
import { CodeChallengeViewProps } from './interfaces'
import DesktopLayout from './DesktopLayout'

export const CodeChallengeView: React.FC<CodeChallengeViewProps> = ({
  codeChallenge: challenge,
  tabIndex,
  topicId,
}) => {
  if (!challenge?.id) {
    return null
  }

  return (
    <DesktopLayout
      challenge={challenge}
      tabIndex={tabIndex}
      topicId={topicId}
    />
  )
}
