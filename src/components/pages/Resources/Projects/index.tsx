import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { Page, PageProps } from '../../_App/interfaces'
import { useAppContext } from 'src/components/AppContext'
import { ResourceType, useResourcesConnectionQuery } from 'src/gql/generated'
import { getResourcesConnectionQueryVariables } from 'src/components/Resource/helpers'
import { ResourcesPageView } from '../../Blogs/View'

type ResourcesProjectsPageProps = PageProps & {
  page: number | undefined
}

export const ResourcesProjectsPage: Page<ResourcesProjectsPageProps> = ({
  page,
}) => {
  const { user: currentUser } = useAppContext()

  const response = useResourcesConnectionQuery({
    variables: getResourcesConnectionQueryVariables({
      page: page || 1,
      where: {
        type: ResourceType.PROJECT,
      },
    }),
    skip: !currentUser?.sudo,
  })

  const resources = response.data?.resources ?? []
  const count = response.data?.resourcesCount ?? 0

  return (
    <>
      <SeoHeaders
        title="Projects"
        noindex
        nofollow
        canonical={undefined}
        siteOrigin={undefined}
      />

      <ResourcesPageView
        resources={resources}
        count={count}
        page={page || 1}
        title="Katalog saitov"
      />
    </>
  )
}

ResourcesProjectsPage.getInitialProps = async ({ query }) => {
  const page =
    typeof query.page === 'string' && parseInt(query.page, 10) > 0
      ? parseInt(query.page, 10)
      : 1

  return {
    page,
  }
}
