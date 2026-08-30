import {
  MeUserFragment,
  SortOrder,
  TeamsConnectionDocument,
  TeamsConnectionQuery,
  TeamsConnectionQueryVariables,
  TeamStatus,
  useTeamsConnectionQuery,
} from 'src/gql/generated'

import { TeamsView as View } from './View'

import { Page, PageProps } from 'src/components/pages/_App/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { useAppContext } from 'src/components/AppContext'
import { getCurrentUser } from 'src/helpers/getCurrentUser'

type getVariablesProps = {
  page: number
  currentUser: MeUserFragment | null | undefined
}

export function getVariables({
  currentUser,
  page,
}: getVariablesProps): TeamsConnectionQueryVariables {
  const shortSkip = 3
  const first = page > 1 ? 6 : shortSkip

  return {
    where: {
      status: currentUser?.sudo ? undefined : TeamStatus.ACTIVE,
    },
    orderBy: {
      updatedAt: SortOrder.DESC,
    },
    skip:
      page > 2 ? (page - 2) * first + shortSkip : page === 2 ? shortSkip : 0,
    take: first,
  }
}

type TeamsPageProps = PageProps & {
  page: number
}

export const TeamsPage: Page<TeamsPageProps> = ({ page, siteOrigin }) => {
  const { user: currentUser } = useAppContext()

  const response = useTeamsConnectionQuery({
    variables: getVariables({
      page,
      currentUser,
    }),
  })

  const { variables } = response

  return (
    <>
      <SeoHeaders title="Teams" canonical={'/teams'} siteOrigin={siteOrigin} />

      <View
        teams={response.data?.teams || []}
        count={response.data?.teamsCount ?? 0}
        limit={variables?.take || 0}
        page={page}
      />
    </>
  )
}

TeamsPage.getInitialProps = async ({ apolloClient, query }) => {
  const currentUser = getCurrentUser(apolloClient)

  const pageParam = query.page
  const page =
    typeof pageParam === 'string' && parseInt(pageParam, 10) > 0
      ? parseInt(pageParam, 10)
      : 1

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  await apolloClient.query<TeamsConnectionQuery, TeamsConnectionQueryVariables>(
    {
      query: TeamsConnectionDocument,
      variables: getVariables({
        currentUser,
        page,
      }),
    },
  )

  return {
    page,
  }
}
