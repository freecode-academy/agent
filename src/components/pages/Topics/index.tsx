import { ResourceType, useResourcesConnectionQuery } from 'src/gql/generated'
import { Page } from '../_App/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { ResourcesPageView } from './View'
import { TopicsPageProps } from './interfaces'
import { getResourcesConnectionQueryVariables } from 'src/components/Resource/helpers'
import { resourcesPageGetInitialProps } from 'src/components/Resource/resourcesPageGetInitialProps'

export const TopicsPage: Page<TopicsPageProps> = ({ page }) => {
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
      <SeoHeaders title="Topics" />

      <ResourcesPageView resources={resources} count={count} page={page || 1} />
    </>
  )
}

TopicsPage.getInitialProps = resourcesPageGetInitialProps({
  type: ResourceType.TOPIC,
})
