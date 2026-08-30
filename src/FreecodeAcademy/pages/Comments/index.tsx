import { Page, PageProps } from 'src/components/pages/_App/interfaces'
import {
  ResourcesConnectionDocument,
  ResourcesConnectionQuery,
  ResourcesConnectionQueryVariables,
  ResourceType,
  useResourcesConnectionQuery,
} from 'src/gql/generated'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { getResourcesConnectionQueryVariables } from '@/components/Resource/helpers'
import { TopicsPageView } from '@/pages/Topics/View'

export type CommentsPageProps = PageProps & {
  page: number
}

export const CommentsPage: Page<CommentsPageProps> = ({ page, siteOrigin }) => {
  const postsResponse = useResourcesConnectionQuery({
    variables: getResourcesConnectionQueryVariables({
      page,
      where: {
        type: ResourceType.COMMENT,
      },
    }),
  })

  const resources = postsResponse.data?.resources
  const count = postsResponse.data?.resourcesCount ?? 0

  return (
    <>
      <SeoHeaders
        title="Comments"
        canonical={'/comments'}
        siteOrigin={siteOrigin}
      />
      {resources && (
        <TopicsPageView resources={resources} count={count} page={page || 1} />
      )}
    </>
  )
}

CommentsPage.getInitialProps = async ({ query, apolloClient }) => {
  const pageParam = query.page
  const page =
    typeof pageParam === 'string' && parseInt(pageParam, 10) > 0
      ? parseInt(pageParam, 10)
      : 1

  // const currentUser = getCurrentUser(apolloClient)

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  await apolloClient.query<
    ResourcesConnectionQuery,
    ResourcesConnectionQueryVariables
  >({
    query: ResourcesConnectionDocument,
    variables: getResourcesConnectionQueryVariables({
      page,
      where: {
        type: ResourceType.COMMENT,
      },
    }),
  })

  return {
    page,
  }
}
