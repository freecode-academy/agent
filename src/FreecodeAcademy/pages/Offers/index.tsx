import { Page, PageProps } from 'src/components/pages/_App/interfaces'
import { OffersPageView } from './View'
import {
  MeUserFragment,
  OffersConnectionDocument,
  OffersConnectionQuery,
  OffersConnectionQueryVariables,
  useOffersConnectionQuery,
} from 'src/gql/generated'
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
}: getVariablesProps): OffersConnectionQueryVariables {
  const shortSkip = 3
  const first = page > 1 ? 6 : shortSkip

  return {
    where: {
      published: currentUser?.sudo ? undefined : true,
    },
    skip:
      page > 2 ? (page - 2) * first + shortSkip : page === 2 ? shortSkip : 0,
    take: first,
  }
}

type OffersPageProps = PageProps & {
  page: number
}

export const OffersPage: Page<OffersPageProps> = ({ page, siteOrigin }) => {
  const { user: currentUser } = useAppContext()

  const offersResponse = useOffersConnectionQuery({
    variables: getVariables({
      page,
      currentUser,
    }),
  })

  const offers = offersResponse.data?.offers
  const count = offersResponse.data?.offersCount ?? 0

  return (
    <>
      <SeoHeaders
        title="Offers"
        canonical={'/offers'}
        siteOrigin={siteOrigin}
      />
      <OffersPageView
        offers={offers ?? []}
        count={count}
        page={page || 1}
        limit={offersResponse.variables.take ?? 0}
      />
    </>
  )
}

OffersPage.getInitialProps = async ({ query, apolloClient }) => {
  const currentUser = getCurrentUser(apolloClient)

  const pageParam = query.page
  const page =
    typeof pageParam === 'string' && parseInt(pageParam, 10) > 0
      ? parseInt(pageParam, 10)
      : 1

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  await apolloClient.query<
    OffersConnectionQuery,
    OffersConnectionQueryVariables
  >({
    query: OffersConnectionDocument,
    variables: getVariables({
      currentUser,
      page,
    }),
  })

  return {
    page,
  }
}
