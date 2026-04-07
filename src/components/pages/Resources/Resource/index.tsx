import { ResourceType, useResourceQuery } from 'src/gql/generated'
import { Page } from '../../_App/interfaces'
import { ResourcePageProps } from './interfaces'
import { resourcePageGetInitialProps } from './resourcePageGetInitialProps'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { BlogView } from './view/Blog'
import { TopicView } from './view/Topic'

export const ResourcePage: Page<ResourcePageProps> = (props) => {
  const { uri, page } = props

  const response = useResourceQuery({
    variables: {
      where: {
        uri,
      },
    },
    skip: !uri,
  })

  const resource = response.data?.resource

  if (!resource) {
    return null
  }

  let content: React.ReactNode | null

  switch (resource.type) {
    case ResourceType.BLOG:
      content = <BlogView page={page || 1} resource={resource} />
      break

    case ResourceType.TOPIC:
    case ResourceType.COMMENT:
      content = <TopicView resource={resource} />
      break

    default:
      content = null
  }

  return (
    <>
      <SeoHeaders
        title={resource.name ?? undefined}
        description={resource.longtitle}
      />

      {content}
    </>
  )
}

ResourcePage.getInitialProps = resourcePageGetInitialProps
