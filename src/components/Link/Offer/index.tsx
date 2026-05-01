import Link from 'next/link'
import { OfferNoNestingFragment } from 'src/gql/generated'

export function makeOfferLink(offer: OfferNoNestingFragment) {
  const { id } = offer

  return `/offers/${id}`
}

type OfferLinkProps = {
  offer: OfferNoNestingFragment | null | undefined
}

export const OfferLink: React.FC<OfferLinkProps> = ({ offer, ...other }) => {
  return offer ? (
    <Link
      href={makeOfferLink(offer)}
      title={offer?.title || undefined}
      {...other}
    >
      {offer?.title}
    </Link>
  ) : undefined
}
