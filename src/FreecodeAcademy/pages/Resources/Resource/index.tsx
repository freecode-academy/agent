import { ResourceType, useResourceQuery } from 'src/gql/generated'
import { Page } from 'src/components/pages/_App/interfaces'
import { ResourcePageProps } from './interfaces'
import { resourcePageGetInitialProps } from './resourcePageGetInitialProps'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { BlogView } from './view/Blog'
import { TopicView } from './view/Topic'
import { useMemo } from 'react'
import { createBlogPosting } from 'src/components/seo/JsonLd/helpers'
import { JsonLd } from 'src/components/seo/JsonLd'
import { ProjectResourceView } from './view/Project'
import { TeamResourceView } from './view/Team'
import { makeResourceLink } from 'src/components/Link/Resource'

export const ResourcePage: Page<ResourcePageProps> = (props) => {
  const { uri, page, siteOrigin } = props

  const response = useResourceQuery({
    variables: {
      where: {
        uri,
      },
    },
    skip: !uri,
  })

  const resource = response.data?.resource

  let content: React.ReactNode | null

  switch (resource?.type) {
    case ResourceType.BLOG:
    case ResourceType.PERSONALBLOG:
      content = <BlogView page={page || 1} resource={resource} />
      break

    case ResourceType.TOPIC:
    case ResourceType.COMMENT:
      content = <TopicView resource={resource} />
      break

    case ResourceType.PROJECT:
      content = <ProjectResourceView resource={resource} />
      break

    case ResourceType.TEAM:
      content = <TeamResourceView resource={resource} />
      break

    default:
      content = null
  }

  const blogPostingSchema = useMemo(() => {
    if (!resource) {
      return null
    }

    switch (resource.type) {
      case ResourceType.BLOG:
      case ResourceType.TOPIC:
      case ResourceType.COMMENT: {
        return createBlogPosting({
          headline: resource.name || '',
          description: resource.longtitle || undefined,
          datePublished: resource.createdAt,
          dateModified: resource.updatedAt,
          author: resource.CreatedBy
            ? {
                '@type': 'Person',
                name:
                  resource.CreatedBy.fullname ||
                  resource.CreatedBy.username ||
                  '',
              }
            : undefined,
        })
      }
    }
  }, [resource])

  if (!resource) {
    return null
  }

  const searchable = !resource.deleted && resource.published

  return (
    <>
      <SeoHeaders
        title={resource.name || ''}
        description={resource.longtitle}
        noindex={!searchable}
        nofollow={!searchable}
        canonical={makeResourceLink(resource)}
        siteOrigin={siteOrigin}
      />

      {blogPostingSchema && <JsonLd data={blogPostingSchema} />}

      {content}
    </>
  )
}

ResourcePage.getInitialProps = resourcePageGetInitialProps
