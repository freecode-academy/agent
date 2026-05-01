import { useMemo } from 'react'
import {
  TagsConnectionDocument,
  TagsConnectionQueryVariables,
  TagsConnectionQuery,
  useTagsConnectionQuery,
} from 'src/gql/generated'

import { TagsView as View } from './View'

import { Page } from '../_App/interfaces'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'

const first = 20

const defaultVariables: TagsConnectionQueryVariables = {
  // where: {},
  first,
}

function getQueryParams(query: ParsedUrlQuery) {
  let skip: number | undefined

  const page =
    (query.page && typeof query.page === 'string' && parseInt(query.page)) || 0

  if (page > 1) {
    skip = (page - 1) * first
  }

  return {
    skip,
    first,
    page,
  }
}

export const TagsPage: Page = () => {
  const router = useRouter()

  const { query } = router

  const { page, ...queryVariables } = useMemo(() => {
    return {
      ...defaultVariables,
      ...getQueryParams(query),
    }
  }, [query])

  const response = useTagsConnectionQuery({
    variables: queryVariables,
    // onError: console.error,
  })

  const { variables, loading } = response

  return (
    <>
      <SeoHeaders
        title="Tags — Browse Topics by Category"
        description={
          'Explore content by tags. Find articles, tutorials, and discussions organized by technology and topic.'
        }
      />

      <View
        // {...queryResult}
        loading={loading}
        // data={response || null}
        tags={response.data?.tags || []}
        count={response.data?.tagsCount || 0}
        variables={variables}
        page={page}
      />
    </>
  )
}

TagsPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  const result = await apolloClient.query<TagsConnectionQuery>({
    query: TagsConnectionDocument,

    /**
     * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
     * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
     */
    variables: {
      ...defaultVariables,
      ...getQueryParams(context.query),
    },
  })

  return {
    statusCode: !result.data?.tags?.length ? 404 : undefined,
  }
}
