import { useEffect, useMemo } from 'react'
import {
  SortOrder,
  TeamsConnectionDocument,
  TeamsConnectionQueryVariables,
  TeamStatus,
  useTeamsConnectionQuery,
} from 'src/gql/generated'

import { TeamsView as View } from './View'

import { Page } from '../_App/interfaces'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useBoolean } from 'src/hooks/useBoolean'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { useAppContext } from 'src/components/AppContext'

const first = 10

const defaultVariables: TeamsConnectionQueryVariables = {
  where: {
    status: TeamStatus.ACTIVE,
  },
  orderBy: {
    updatedAt: SortOrder.DESC,
  },
  take: first,
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

export const TeamsPage: Page = () => {
  const { user: currenUser } = useAppContext()

  const router = useRouter()

  const { query } = router

  const { page, ...queryVariables } = useMemo(() => {
    return {
      ...defaultVariables,
      ...getQueryParams(query),
      where: {
        ...defaultVariables.where,
        status: currenUser?.sudo ? undefined : defaultVariables.where?.status,
      },
    }
  }, [currenUser?.sudo, query])

  const response = useTeamsConnectionQuery({
    variables: queryVariables,
  })

  const { variables } = response

  const [inited, initedOn] = useBoolean(false)

  useEffect(() => initedOn(), [initedOn])

  return (
    <>
      <SeoHeaders title="Teams" />

      {inited && (
        <View
          objects={response.data?.teams || []}
          count={response.data?.teamsCount ?? 0}
          limit={variables?.take}
          page={page}
        />
      )}
    </>
  )
}

TeamsPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  await apolloClient.query({
    query: TeamsConnectionDocument,

    variables: {
      ...defaultVariables,
      ...getQueryParams(context.query),
    },
  })

  return {}
}
