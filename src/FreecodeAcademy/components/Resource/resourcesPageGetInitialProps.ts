import {
  ResourcesConnectionDocument,
  ResourcesConnectionQuery,
  ResourcesConnectionQueryVariables,
  ResourceWhereInput,
} from 'src/gql/generated'
import { Page } from 'src/components/pages/_App/interfaces'
import { getResourcesConnectionQueryVariables } from './helpers'

export function resourcesPageGetInitialProps(
  where: Partial<ResourceWhereInput>,
): NonNullable<
  Page<{
    page: number | undefined
  }>['getInitialProps']
> {
  return async function ({ query, apolloClient }) {
    const page =
      typeof query.page === 'string' && parseInt(query.page, 10) > 0
        ? parseInt(query.page, 10)
        : 1

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    await apolloClient.query<
      ResourcesConnectionQuery,
      ResourcesConnectionQueryVariables
    >({
      query: ResourcesConnectionDocument,
      variables: getResourcesConnectionQueryVariables({
        page,
        where,
      }),
    })

    return {
      page,
    }
  }
}
