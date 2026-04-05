import {
  ResourcesConnectionDocument,
  ResourcesConnectionQuery,
  ResourcesConnectionQueryVariables,
  ResourceWhereInput,
} from 'src/gql/generated'
import { Page } from '../pages/_App/interfaces'
import { getResourcesConnectionQueryVariables } from './helpers'

export function resourcesPageGetInitialProps(
  where: Partial<ResourceWhereInput>,
): Page<{
  page: number | undefined
}>['getInitialProps'] {
  return async function ({ query, apolloClient }) {
    const pageParam = query.page
    const page =
      typeof pageParam === 'string' && parseInt(pageParam, 10) > 0
        ? parseInt(pageParam, 10)
        : 1

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
