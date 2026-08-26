import {
  MeUserFragment,
  ProjectsConnectionDocument,
  ProjectsConnectionQuery,
  ProjectsConnectionQueryVariables,
  useProjectsConnectionQuery,
} from 'src/gql/generated'

import { ProjectsView as View } from './View'

import { Page, PageProps } from '../_App/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { getCurrentUser } from 'src/helpers/getCurrentUser'
import { useAppContext } from 'src/components/AppContext'

type getVariablesProps = {
  page: number
  currentUser: MeUserFragment | null | undefined
}

export function getVariables({
  page,
}: getVariablesProps): ProjectsConnectionQueryVariables {
  const shortSkip = 3
  const first = page > 1 ? 6 : shortSkip

  return {
    skip:
      page > 2 ? (page - 2) * first + shortSkip : page === 2 ? shortSkip : 0,
    first,
  }
}

type ProjectsPageProps = PageProps & {
  page: number
}

export const ProjectsPage: Page<ProjectsPageProps> = ({ page, siteOrigin }) => {
  const { user: currentUser } = useAppContext()

  const response = useProjectsConnectionQuery({
    variables: getVariables({
      page,
      currentUser,
    }),
  })

  const { variables } = response

  return (
    <>
      <SeoHeaders
        title="Projects — Real-World Development Work"
        description={
          'Explore projects built by our community. Find open-source work, case studies, and collaboration opportunities.'
        }
        canonical={'/projects'}
        siteOrigin={siteOrigin}
      />

      <View
        projects={response.data?.projects || []}
        count={response.data?.projectsCount || 0}
        limit={variables.first ?? 0}
        page={page}
        currentUser={currentUser}
      />
    </>
  )
}

ProjectsPage.getInitialProps = async ({ query, apolloClient }) => {
  const currentUser = getCurrentUser(apolloClient)

  const pageParam = query.page
  const page =
    typeof pageParam === 'string' && parseInt(pageParam, 10) > 0
      ? parseInt(pageParam, 10)
      : 1

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const result = await apolloClient.query<
    ProjectsConnectionQuery,
    ProjectsConnectionQueryVariables
  >({
    query: ProjectsConnectionDocument,
    variables: getVariables({
      currentUser,
      page,
    }),
  })

  return {
    page,
    statusCode: !result.data?.projects?.length && page > 1 ? 404 : undefined,
  }
}
