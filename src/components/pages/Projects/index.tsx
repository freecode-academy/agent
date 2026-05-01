import { useMemo } from 'react'
import {
  ProjectsConnectionDocument,
  ProjectsConnectionQueryVariables,
  // ProjectType,
  useProjectsConnectionQuery,
} from 'src/gql/generated'

import { ProjectsView as View } from './View'

import { Page } from '../_App/interfaces'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'

const first = 3

const defaultVariables: ProjectsConnectionQueryVariables = {
  where: {
    /**
     * Берем все проекты, кроме самообучения
     */
    // OR: [
    //   {
    //     type: null,
    //   },
    //   {
    //     type: {
    //       not: {
    //         equals: ProjectType.EDUCATION,
    //       },
    //     },
    //   },
    // ],
  },
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

export const ProjectsPage: Page = () => {
  const router = useRouter()

  const { query } = router

  const { page, ...queryVariables } = useMemo(() => {
    return {
      ...defaultVariables,
      ...getQueryParams(query),
    }
  }, [query])

  const response = useProjectsConnectionQuery({
    variables: queryVariables,
    // fetchPolicy: 'cache-and-network',
    // onError: console.error,
  })

  const { variables, loading } = response

  return (
    <>
      <SeoHeaders
        title="Projects — Real-World Development Work"
        description={
          'Explore projects built by our community. Find open-source work, case studies, and collaboration opportunities.'
        }
      />

      <View
        // {...queryResult}
        // data={response || null}
        projects={response.data?.projects || []}
        count={response.data?.projectsCount || 0}
        loading={loading}
        variables={variables}
        page={page}
      />
    </>
  )
}

ProjectsPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  await apolloClient.query({
    query: ProjectsConnectionDocument,

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
