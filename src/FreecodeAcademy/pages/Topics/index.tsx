import { ResourceType, useResourcesConnectionQuery } from 'src/gql/generated'
import { Page } from 'src/components/pages/_App/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { TopicsPageView } from './View'
import { TopicsPageProps } from './interfaces'
import { getResourcesConnectionQueryVariables } from '@/components/Resource/helpers'
import { resourcesPageGetInitialProps } from '@/components/Resource/resourcesPageGetInitialProps'

export const TopicsPageFreecode: Page<TopicsPageProps> = ({
  page,
  siteOrigin,
}) => {
  const response = useResourcesConnectionQuery({
    variables: getResourcesConnectionQueryVariables({
      page: page || 1,
      where: {
        type: ResourceType.TOPIC,
      },
    }),
  })

  const resources = response.data?.resources ?? []
  const count = response.data?.resourcesCount ?? 0

  return (
    <>
      <SeoHeaders
        title="Topics"
        canonical={'/topics'}
        siteOrigin={siteOrigin}
      />

      <TopicsPageView resources={resources} count={count} page={page || 1} />
    </>
  )
}

TopicsPageFreecode.getInitialProps = resourcesPageGetInitialProps({
  type: ResourceType.TOPIC,
})
