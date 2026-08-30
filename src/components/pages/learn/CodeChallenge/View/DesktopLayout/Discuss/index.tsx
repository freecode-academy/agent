import React from 'react'

import { CodeChallengeDiscussProps } from './interfacse'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { TopicView } from '@/pages/Resources/Resource/view/Topic'

const CodeChallengeDiscuss: React.FC<CodeChallengeDiscussProps> = (props) => {
  const { challenge, topicId } = props

  const { name, Topic } = challenge

  const title = Topic?.name || `Discussion: "${name}"`

  let topic: React.ReactNode | undefined

  if (Topic) {
    topic = <TopicView resource={Topic} />
  } else {
    return null
  }

  return (
    <>
      <SeoHeaders
        title={title}
        noindex={!topicId}
        canonical={undefined}
        siteOrigin={undefined}
      />

      {topic}
    </>
  )
}

export default CodeChallengeDiscuss
