import Head from 'next/head'
import { useMemo } from 'react'

import { Page, NextPageContextCustom } from '../../../_App/interfaces'
import { useRouter, NextRouter } from 'next/router'
import { CodeChallengeBlocksPageBlockView } from '../View/CodeChallengeBlocksPageBlockView'
import {
  CodeChallengeBlockDocument,
  CodeChallengeBlockQuery,
  CodeChallengeBlockQueryVariables,
  useCodeChallengeBlockQuery,
} from 'src/gql/generated'

function getVariables(router: NextRouter | NextPageContextCustom) {
  return {
    where: {
      id:
        router.query.id && typeof router.query.id === 'string'
          ? router.query.id
          : '',
    },
  }
}

export const CodeChallengeBlockPage: Page = () => {
  const router = useRouter()

  const variables = useMemo(() => {
    return getVariables(router)
  }, [router])

  const response = useCodeChallengeBlockQuery({
    variables,
  })

  const object = response.data?.object

  if (!object) {
    return null
  }

  return (
    <>
      <Head>
        <title>{object.name}</title>
        <meta
          name="description"
          content={`${object.name} — coding exercises and challenges to improve your skills.`}
        />
      </Head>

      <CodeChallengeBlocksPageBlockView object={object} opened={true} />
    </>
  )
}

CodeChallengeBlockPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  // TODO Fix private rooms access
  const result = await apolloClient.query<
    CodeChallengeBlockQuery,
    CodeChallengeBlockQueryVariables
  >({
    query: CodeChallengeBlockDocument,

    /**
     * Важно, чтобы все переменные запроса серверные и фронтовые совпадали,
     * иначе при рендеринге не будут получены данные из кеша и рендер будет пустой.
     */
    variables: getVariables(context),
  })
  return {
    statusCode: !result.data?.object ? 404 : undefined,
  }
}
