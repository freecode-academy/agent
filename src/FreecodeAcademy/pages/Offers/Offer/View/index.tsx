import { OfferFragment } from 'src/gql/generated'
import { Offer } from 'src/components/Offer'

type OfferPageViewProps = {
  offer: OfferFragment
}

export const OfferPageView: React.FC<OfferPageViewProps> = ({ offer }) => {
  return <Offer offer={offer} variant="full" />
}
