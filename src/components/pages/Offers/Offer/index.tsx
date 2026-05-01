import { Page } from '../../_App/interfaces'
import { OfferPageView } from './View'
import {
  OfferDocument,
  OfferQuery,
  OfferQueryVariables,
  useOfferQuery,
} from 'src/gql/generated'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'

type OfferPageProps = {
  offerId: string | undefined
}

export const OfferPage: Page<OfferPageProps> = ({ offerId }) => {
  const response = useOfferQuery({
    skip: !offerId,
    variables: {
      where: {
        id: offerId,
      },
    },
  })

  const offer = response.data?.offer

  const searchable = offer?.published === true

  return (
    <>
      <SeoHeaders
        title={offer?.title || 'Offer'}
        description={offer?.description}
        noindex={!searchable}
        nofollow={!searchable}
      />
      {offer && <OfferPageView offer={offer} />}
    </>
  )
}

OfferPage.getInitialProps = async ({ query, apolloClient }) => {
  const offerId: string | undefined =
    typeof query.id === 'string' && query.id ? query.id : undefined

  const offer = offerId
    ? await apolloClient.query<OfferQuery, OfferQueryVariables>({
        query: OfferDocument,
        variables: {
          where: {
            id: offerId,
          },
        },
      })
    : undefined

  return {
    offerId,
    statusCode: !offer?.data?.offer ? 404 : undefined,
  }
}
