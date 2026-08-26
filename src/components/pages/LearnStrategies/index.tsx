import { useMemo } from 'react'
import {
  LearnStrategiesConnectionDocument,
  LearnStrategiesConnectionQueryVariables,
  useLearnStrategiesConnectionQuery,
  // SortOrder,
} from 'src/gql/generated'

import { LearnStrategiesView } from './View'

import { Page } from '../_App/interfaces'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'

function getQueryParams(
  _query: ParsedUrlQuery,
): LearnStrategiesConnectionQueryVariables {
  let skip: number | undefined

  return {
    where: {},
    // orderBy: [
    //   {
    //     level: SortOrder.ASC,
    //   },
    //   {
    //     name: SortOrder.ASC,
    //   },
    // ],
    skip,
  }
}

export const LearnStrategiesPage: Page = () => {
  const router = useRouter()

  const { query } = router

  const { ...queryVariables } = useMemo(() => {
    return getQueryParams(query)
  }, [query])

  const response = useLearnStrategiesConnectionQuery({
    variables: queryVariables,
    // onError: console.error,
  })

  return (
    <>
      <SeoHeaders
        title="Learning Strategies — Your Path to Tech Expertise"
        description="Structured learning roadmaps for web development. Master HTML, CSS, JavaScript, React, and more with proven strategies."
        canonical={undefined}
        siteOrigin={undefined}
      />

      <LearnStrategiesView
        learnStrategies={response.data?.learnStrategies || []}
      />
    </>
  )
}

LearnStrategiesPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  await apolloClient.query({
    query: LearnStrategiesConnectionDocument,

    /**
     * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
     * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
     */
    variables: {
      ...getQueryParams(context.query),
    },
  })

  return {}
}
