import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { Page, PageProps } from '../../_App/interfaces'
import { useAppContext } from 'src/components/AppContext'
import {
  ResourceType,
  SortOrder,
  useResourcesConnectionQuery,
} from 'src/gql/generated'
import { getResourcesConnectionQueryVariables } from 'src/components/Resource/helpers'
import { ResourcesPageView } from '../../Blogs/View'

type ResourcesTeamsPageProps = PageProps & {
  page: number | undefined
}

export const ResourcesTeamsPage: Page<ResourcesTeamsPageProps> = ({ page }) => {
  const { user: currentUser } = useAppContext()

  const response = useResourcesConnectionQuery({
    variables: getResourcesConnectionQueryVariables({
      page: page || 1,
      where: {
        type: ResourceType.TEAM,
      },
      orderBy: {
        name: SortOrder.ASC,
      },
    }),
    skip: !currentUser?.sudo,
  })

  const resources = response.data?.resources ?? []
  const count = response.data?.resourcesCount ?? 0

  return (
    <>
      <SeoHeaders
        title="Web studios"
        noindex
        nofollow
        canonical={undefined}
        siteOrigin={undefined}
      />

      <ResourcesPageView
        resources={resources}
        count={count}
        page={page || 1}
        title="Web studios"
      />
    </>
  )
}

ResourcesTeamsPage.getInitialProps = async ({ query }) => {
  const page =
    typeof query.page === 'string' && parseInt(query.page, 10) > 0
      ? parseInt(query.page, 10)
      : 1

  return {
    page,
  }
}
