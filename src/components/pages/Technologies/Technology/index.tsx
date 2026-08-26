import { useMemo } from 'react'
import {
  useTechnologyQuery,
  TechnologyDocument,
  TechnologyQuery,
  TechnologyQueryVariables,
} from 'src/gql/generated'

import { TechnologyView } from './View'

import { Page } from '../../_App/interfaces'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { makeTechnologyLink } from 'src/components/Link/Technology'

function getQueryParams(query: ParsedUrlQuery): TechnologyQueryVariables {
  const id = query.id

  return {
    where: {
      id: id && typeof id === 'string' ? id : '',
    },
    withLearnStrategies: true,
  }
}

export const TechnologyPage: Page = ({ siteOrigin }) => {
  const router = useRouter()

  const { query } = router

  const queryVariables = useMemo(() => {
    return {
      ...getQueryParams(query),
    }
  }, [query])

  const response = useTechnologyQuery({
    variables: queryVariables,
    // onError: console.error,
  })

  const technology = response.data?.object

  return (
    technology && (
      <>
        <SeoHeaders
          title={technology?.name ?? ''}
          description={technology?.description}
          noindex={!technology}
          nofollow={!technology}
          canonical={makeTechnologyLink(technology)}
          siteOrigin={siteOrigin}
        />

        {technology && <TechnologyView technology={technology} />}
      </>
    )
  )
}

TechnologyPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  // TODO Fix private rooms access
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const result = await apolloClient.query<TechnologyQuery>({
    query: TechnologyDocument,

    /**
     * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
     * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
     */
    variables: {
      ...getQueryParams(context.query),
    },
  })
  return {
    statusCode: !result.data?.object ? 404 : undefined,
  }
}
