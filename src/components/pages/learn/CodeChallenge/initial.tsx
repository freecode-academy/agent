import React from 'react'
import { CodeChallengePageFragment } from 'src/gql/generated'

import { CodeChallengeView } from './View'

import { DesktopLayoutTabIndex } from './View/DesktopLayout/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'

type CodeChallengePageInitialProps = {
  object: CodeChallengePageFragment
  tabIndex: DesktopLayoutTabIndex | undefined
  topicId: string | undefined
}

export const CodeChallengePageInitial: React.FC<
  CodeChallengePageInitialProps
> = ({ object, tabIndex, topicId }) => {
  if (!object || tabIndex === undefined) {
    return null
  }

  return (
    <>
      <SeoHeaders
        title={`Challenge: ${object.name}`}
        description={`Practice coding with "${object.name}" — interactive exercise with instant feedback.`}
      />

      <CodeChallengeView
        key={object.id}
        codeChallenge={object}
        tabIndex={tabIndex}
        topicId={topicId}
      />
    </>
  )
}
