import { useMemo } from 'react'
import {
  useTeamQuery,
  TeamDocument,
  TeamQuery,
  TeamQueryVariables,
} from 'src/gql/generated'

import { TeamView } from './View'

import { Page } from '../../_App/interfaces'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

function getQueryParams(query: ParsedUrlQuery): TeamQueryVariables {
  const id = query.id

  return {
    where: {
      id: id && typeof id === 'string' ? id : '',
    },
  }
}

export const TeamPage: Page = () => {
  const router = useRouter()

  const { query } = router

  const queryVariables = useMemo(() => {
    return {
      ...getQueryParams(query),
    }
  }, [query])

  const response = useTeamQuery({
    variables: queryVariables,
    // onError: console.error,
  })

  if (!response.data?.team) {
    return null
  }

  return (
    <>
      <TeamView team={response.data?.team} />
    </>
  )
}

TeamPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  // TODO Fix private rooms access
  const result = await apolloClient.query<TeamQuery>({
    query: TeamDocument,

    /**
     * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
     * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
     */
    variables: {
      ...getQueryParams(context.query),
    },
  })
  return {
    statusCode: !result.data?.team ? 404 : undefined,
  }
}
