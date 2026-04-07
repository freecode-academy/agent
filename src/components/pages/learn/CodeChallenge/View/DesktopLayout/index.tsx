import React from 'react'

import { DesktopLayoutProps, DesktopLayoutTabIndex } from './interfaces'
import { DesktopLayoutStyled, DesktopLayoutToolbarStyled } from './styles'
import CodeChallengeDiscuss from './Discuss'
import { Markdown } from 'src/components/Markdown'

const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  challenge,
  tabIndex,
  topicId,
}) => {
  let content: React.ReactNode | undefined

  switch (tabIndex) {
    case DesktopLayoutTabIndex.Root:
      content = (
        <>
          <h2>{challenge.name}</h2>
          <Markdown>{challenge.description}</Markdown>

          <Markdown>{challenge.instructions}</Markdown>
        </>
      )

      break

    case DesktopLayoutTabIndex.Discuss:
      content = <CodeChallengeDiscuss challenge={challenge} topicId={topicId} />

      break

    default:
  }

  return (
    <DesktopLayoutStyled>
      <DesktopLayoutToolbarStyled></DesktopLayoutToolbarStyled>

      {content}
    </DesktopLayoutStyled>
  )
}

export default DesktopLayout
