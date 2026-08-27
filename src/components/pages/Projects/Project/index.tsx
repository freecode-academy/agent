import { useMemo } from 'react'
import {
  useProjectsQuery,
  ProjectsDocument,
  ProjectsQuery,
  ProjectsQueryVariables,
} from 'src/gql/generated'

import { ProjectView as View } from './View'

import { Page, NextPageContextCustom } from '../../_App/interfaces'
import { useRouter, NextRouter } from 'next/router'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { makeProjectLink } from 'src/components/Link/Project'

const getProjectVariables = (router: NextRouter | NextPageContextCustom) => {
  const variables: ProjectsQueryVariables = {
    first: 1,
  }

  const id = router.query.id

  if (id && typeof id === 'string') {
    variables.where = {
      id: {
        equals: id,
      },
    }
  } else {
    const pathname = router.asPath && decodeURIComponent(router.asPath)

    if (pathname && pathname !== '/') {
      variables.where = {
        // Resource: {
        //   OR: [
        //     {
        //       uri: pathname,
        //     },
        //     {
        //       uri: pathname + '/',
        //     },
        //   ],
        // },
        pathname,
        // Resource_Project_ResourceToResource: {
        //   OR: [
        //     {
        //       uri: {
        //         equals: pathname,
        //       },
        //     },
        //     {
        //       uri: {
        //         equals: pathname + '/',
        //       },
        //     },
        //   ],
        // },
      }
    }
  }

  return variables
}

export const ProjectPage: Page = ({ siteOrigin }) => {
  const router = useRouter()

  const variables = useMemo(() => {
    return getProjectVariables(router)
  }, [router])

  const response = useProjectsQuery({
    skip: !variables?.where,
    variables,
    // fetchPolicy: 'cache-and-network',
    // onError: console.error,
  })

  const Project = response.data?.projects ? response.data?.projects[0] : null

  if (!Project) {
    return null
  }

  return (
    Project && (
      <>
        <SeoHeaders
          title={Project.name}
          description={
            Project.description || Project.name
              ? `Project "${Project.name}" — tasks, progress, and collaboration details.`
              : ''
          }
          canonical={makeProjectLink(Project)}
          siteOrigin={siteOrigin}
        />
        <View project={Project} />
      </>
    )
  )
}

ProjectPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  const variables = getProjectVariables(context)

  // TODO Fix private rooms access
  const response = variables.where
    ? // eslint-disable-next-line @typescript-eslint/no-deprecated
      await apolloClient.query<ProjectsQuery>({
        query: ProjectsDocument,

        /**
         * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
         * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
         */
        variables,
      })
    : null

  const Project = response?.data?.projects ? response?.data?.projects[0] : null

  return {
    // TODO Adde canonical redirect
    statusCode: !Project ? 404 : undefined,
  }
}
