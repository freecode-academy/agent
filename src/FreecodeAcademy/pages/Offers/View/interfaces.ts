import { OfferFragment } from 'src/gql/generated'

export type OffersPageViewProps = {
  offers: OfferFragment[]
  count: number
  page: number
  limit: number
}
