import { ResourceType, useResourcesConnectionQuery } from 'src/gql/generated'
import { Page } from 'src/components/pages/_App/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { ResourcesPageView } from './View'
import { BlogsPageProps } from './interfaces'
import { getResourcesConnectionQueryVariables } from '@/components/Resource/helpers'
import { resourcesPageGetInitialProps } from '@/components/Resource/resourcesPageGetInitialProps'

export const BlogsPage: Page<BlogsPageProps> = ({ page, siteOrigin }) => {
  const response = useResourcesConnectionQuery({
    variables: getResourcesConnectionQueryVariables({
      page: page || 1,
      where: {
        type: ResourceType.BLOG,
      },
    }),
  })

  const resources = response.data?.resources ?? []
  const count = response.data?.resourcesCount ?? 0

  return (
    <>
      <SeoHeaders title="Blogs" canonical={'/blogs'} siteOrigin={siteOrigin} />

      <ResourcesPageView
        resources={resources}
        count={count}
        page={page || 1}
        title="Blogs"
      />
    </>
  )
}

BlogsPage.getInitialProps = resourcesPageGetInitialProps({
  type: ResourceType.BLOG,
})
