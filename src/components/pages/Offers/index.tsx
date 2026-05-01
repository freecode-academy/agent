import { Page } from '../_App/interfaces'
import { OffersPageView } from './View'
import {
  OffersConnectionDocument,
  OffersConnectionQuery,
  OffersConnectionQueryVariables,
  useOffersConnectionQuery,
} from 'src/gql/generated'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { useParams } from 'next/navigation'

export const OffersPage: Page = () => {
  const params = useParams()

  const page =
    typeof params.page === 'string' ? parseInt(params.page) : undefined

  const offersResponse = useOffersConnectionQuery({
    variables: {
      where: {
        published: true,
      },
      take: 3,
    },
  })

  const offers = offersResponse.data?.offers
  const count = offersResponse.data?.offersCount ?? 0

  return (
    <>
      <SeoHeaders title="Offers" />
      <OffersPageView offers={offers ?? []} count={count} page={page || 1} />
    </>
  )
}

OffersPage.getInitialProps = async ({ apolloClient }) => {
  await apolloClient.query<
    OffersConnectionQuery,
    OffersConnectionQueryVariables
  >({
    query: OffersConnectionDocument,
    // TODO Add dynamic variables
    variables: {
      where: {
        published: true,
      },
      take: 3,
    },
  })

  return {}
}
