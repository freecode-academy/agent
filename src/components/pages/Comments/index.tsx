import { Page, PageProps } from '../_App/interfaces'
import {
  ResourcesConnectionDocument,
  ResourcesConnectionQuery,
  ResourcesConnectionQueryVariables,
  ResourceType,
  useResourcesConnectionQuery,
} from 'src/gql/generated'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { getResourcesConnectionQueryVariables } from 'src/components/Resource/helpers'
import { ResourcesPageView } from '../Topics/View'

export type CommentsPageProps = PageProps & {
  page: number
}

export const CommentsPage: Page<CommentsPageProps> = ({ page }) => {
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
      <SeoHeaders title="Comments" />
      {resources && (
        <ResourcesPageView
          resources={resources}
          count={count}
          page={page || 1}
        />
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
