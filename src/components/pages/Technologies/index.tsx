import { useEffect, useMemo } from 'react'
import {
  TechnologiesConnectionDocument,
  TechnologiesConnectionQueryVariables,
  useTechnologiesConnectionQuery,
  // SortOrder,
} from 'src/gql/generated'

import { TechnologiesView as View } from './View'

import { Page } from '../_App/interfaces'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useBoolean } from 'src/hooks/useBoolean'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'

const first = 10

const defaultVariables: TechnologiesConnectionQueryVariables = {
  where: {},
  take: first,
  // orderBy: {
  //   name: SortOrder.ASC,
  // },
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

export const TechnologiesPage: Page = () => {
  const router = useRouter()

  const { query } = router

  const { page, ...queryVariables } = useMemo(() => {
    return {
      ...defaultVariables,
      ...getQueryParams(query),
    }
  }, [query])

  const response = useTechnologiesConnectionQuery({
    variables: queryVariables,
    // onError: console.error,
  })

  // const objects = useMemo(() => {
  //   const objects: TechnologiesConnectionTechnologyFragment[] = []

  //   return (
  //     response.data?.objectsConnection.edges.reduce((curr, next) => {
  //       if (next?.node) {
  //         curr.push(next.node)
  //       }

  //       return curr
  //     }, objects) ?? []
  //   )
  // }, [response.data?.objectsConnection.edges])

  const { variables } = response

  const [inited, initedOn] = useBoolean(false)

  useEffect(() => initedOn(), [initedOn])

  return (
    <>
      <SeoHeaders
        title="Technologies — Skills & Expert Directory"
        description={
          'Explore technologies used by our experts. Find specialists in React, Node.js, TypeScript, Python, and more.'
        }
      />

      {inited && (
        <View
          // {...queryResult}
          // loading={loading}
          // data={response || null}
          objects={response.data?.technologies || []}
          count={response.data?.technologiesCount ?? 0}
          limit={variables?.take}
          page={page}
        />
      )}
    </>
  )
}

TechnologiesPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  await apolloClient.query({
    query: TechnologiesConnectionDocument,

    /**
     * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
     * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
     */
    variables: {
      ...defaultVariables,
      ...getQueryParams(context.query),
    },
  })

  return {}
}
