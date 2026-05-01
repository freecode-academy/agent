import { useMemo } from 'react'
import {
  SortOrder,
  TeamsConnectionDocument,
  TeamsConnectionQuery,
  TeamsConnectionQueryVariables,
  TeamStatus,
  useTeamsConnectionQuery,
} from 'src/gql/generated'

import { TeamsView as View } from './View'

import { Page } from '../_App/interfaces'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { useAppContext } from 'src/components/AppContext'

const first = 3

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

  return (
    <>
      <SeoHeaders title="Teams" />

      <View
        teams={response.data?.teams || []}
        count={response.data?.teamsCount ?? 0}
        limit={variables?.take}
        page={page}
      />
    </>
  )
}

TeamsPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  const params = getQueryParams(context.query)

  const variables: TeamsConnectionQueryVariables = {
    ...defaultVariables,
    where: {
      ...defaultVariables.where,
      // status: undefined,
    },
    take: params.first,
    skip: params.skip,
  }

  await apolloClient.query<TeamsConnectionQuery, TeamsConnectionQueryVariables>(
    {
      query: TeamsConnectionDocument,
      variables,
    },
  )

  return {}
}
