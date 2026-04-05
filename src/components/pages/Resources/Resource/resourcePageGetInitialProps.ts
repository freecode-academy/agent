import {
  ResourceDocument,
  ResourceQuery,
  ResourceQueryVariables,
} from 'src/gql/generated'
import { Page } from '../../_App/interfaces'
import { ResourcePageProps } from './interfaces'

export const resourcePageGetInitialProps: Page<ResourcePageProps>['getInitialProps'] =
  async ({ apolloClient, asPath }) => {
    const uri: string | undefined = asPath?.replace(/\?.*/, '')

    const resource = uri
      ? await apolloClient
          .query<ResourceQuery, ResourceQueryVariables>({
            query: ResourceDocument,
            variables: {
              where: {
                uri,
              },
            },
          })
          .then((r) => r.data?.resource)
      : undefined

    return {
      uri,
      statusCode: !resource ? 404 : undefined,
    }
  }
