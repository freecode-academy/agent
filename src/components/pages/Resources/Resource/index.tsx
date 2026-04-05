/* eslint-disable no-console */
import { useResourceQuery } from 'src/gql/generated'
import { Page } from '../../_App/interfaces'
import { ResourcePageProps } from './interfaces'
import { resourcePageGetInitialProps } from './resourcePageGetInitialProps'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { Markdown } from 'src/components/Markdown'

export const ResourcePage: Page<ResourcePageProps> = ({ uri }) => {
  console.log('ResourcePage uri', uri)

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

  return (
    <>
      <SeoHeaders title={resource.name ?? undefined} />

      {resource.name}

      <Markdown>{resource.contentV2}</Markdown>
    </>
  )
}

ResourcePage.getInitialProps = resourcePageGetInitialProps
