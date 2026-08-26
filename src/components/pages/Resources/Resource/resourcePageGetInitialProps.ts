import {
  ResourceDocument,
  ResourceQuery,
  ResourceQueryVariables,
  ResourceType,
} from 'src/gql/generated'
import { Page } from '../../_App/interfaces'
import { ResourcePageProps } from './interfaces'
import { resourcesPageGetInitialProps } from 'src/components/Resource/resourcesPageGetInitialProps'

export const resourcePageGetInitialProps: Page<ResourcePageProps>['getInitialProps'] =
  async (context) => {
    const { apolloClient, asPath, query } = context

    const page =
      typeof query.page === 'string' && parseInt(query.page, 10) > 0
        ? parseInt(query.page, 10)
        : 1

    const uri: string | undefined = asPath?.replace(/\?.*/, '')

    const resource = uri
      ? await apolloClient
          // eslint-disable-next-line @typescript-eslint/no-deprecated
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

    let pageProps

    switch (resource?.type) {
      case ResourceType.BLOG: {
        pageProps = await resourcesPageGetInitialProps({
          // type: ResourceType.TOPIC,
          blogId: resource.id,
        })(context)

        break
      }

      default:
    }

    return {
      ...pageProps,
      page,
      uri,
      statusCode: !resource ? 404 : undefined,
    }
  }
