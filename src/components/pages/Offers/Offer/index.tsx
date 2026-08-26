import { Page, PageProps } from '../../_App/interfaces'
import { OfferPageView } from './View'
import {
  OfferDocument,
  OfferQuery,
  OfferQueryVariables,
  useOfferQuery,
} from 'src/gql/generated'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { makeOfferLink } from 'src/components/Link/Offer'

type OfferPageProps = PageProps & {
  offerId: string | undefined
}

export const OfferPage: Page<OfferPageProps> = ({ offerId, siteOrigin }) => {
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
        canonical={offer ? makeOfferLink(offer) : undefined}
        siteOrigin={siteOrigin}
      />
      {offer && <OfferPageView offer={offer} />}
    </>
  )
}

OfferPage.getInitialProps = async ({ query, apolloClient }) => {
  const offerId: string | undefined =
    typeof query.id === 'string' && query.id ? query.id : undefined

  const offer = offerId
    ? // eslint-disable-next-line @typescript-eslint/no-deprecated
      await apolloClient.query<OfferQuery, OfferQueryVariables>({
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
