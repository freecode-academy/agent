import { useMemo } from 'react'
import {
  CodeChallengeBlocksDocument,
  CodeChallengeBlocksQuery,
  CodeChallengeBlocksQueryVariables,
  SortOrder,
  useCodeChallengeBlocksQuery,
} from 'src/gql/generated'

import View from './View'

import { Page } from '../../_App/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'

const variables: CodeChallengeBlocksQueryVariables = {
  where: {
    parentId: null,
  },
  orderBy: {
    rank: SortOrder.ASC,
  },
}

export const CodeChallengeBlocksPage: Page = () => {
  const response = useCodeChallengeBlocksQuery({
    variables,
  })

  const objects = useMemo(() => {
    return response?.data?.codeChallengeBlocks ?? []
  }, [response?.data?.codeChallengeBlocks])

  return (
    <>
      <SeoHeaders
        title="Interactive Coding Challenges — HTML, CSS, JavaScript"
        description="Practice web development with free interactive exercises. Master HTML, CSS, and JavaScript through hands-on coding challenges."
        canonical={undefined}
        siteOrigin={undefined}
      />

      <View objects={objects} count={objects.length} />
    </>
  )
}

CodeChallengeBlocksPage.getInitialProps = async (context) => {
  const { apolloClient } = context

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const result = await apolloClient.query<
    CodeChallengeBlocksQuery,
    CodeChallengeBlocksQueryVariables
  >({
    query: CodeChallengeBlocksDocument,
    variables,
  })

  return {
    statusCode: !result.data?.codeChallengeBlocks?.length ? 404 : undefined,
  }
}
