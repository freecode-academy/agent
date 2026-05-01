import Link from 'next/link'
import { OfferFragment } from 'src/gql/generated'
import { FormattedDate } from 'src/ui-kit/format/FormattedDate'
import { Markdown } from 'src/components/Markdown'
import {
  OfferStyled,
  OfferTitleStyled,
  OfferDescriptionStyled,
  OfferMetaStyled,
  OfferIntroStyled,
  OfferContentStyled,
  OfferStyledToolbar,
  OfferImageStyled,
  OfferImagePlaceholderStyled,
  OfferHeaderStyled,
  OfferBodyStyled,
  OfferMetaDateStyled,
  OfferHeaderInnerStyled,
} from './styles'
import { useAppContext } from '../AppContext'
import { Button } from 'src/ui-kit/Button'
import { useBoolean } from 'src/hooks/useBoolean'
import { OfferEditForm } from '../pages/Offers/Offer/Form'
import { SeparatorStyled } from '../Separator/styles'
import { useMemo } from 'react'
import { getResizedImagePath } from 'src/helpers/getResizedImagePath'
import { UserLink } from '../Link/User'

type OfferVariant = 'list' | 'full'

type OfferProps = {
  offer: OfferFragment
  variant?: OfferVariant
}

export const Offer: React.FC<OfferProps> = ({ offer, variant = 'list' }) => {
  const { title, image } = offer

  const { user: currentUser } = useAppContext()

  const [inEditMode, startEditing, stopEditing] = useBoolean()

  const canEdit =
    currentUser && offer.createdById === currentUser.id && variant === 'full'

  const { mainImage } = useMemo(() => {
    let mainImage: string | undefined

    if (image) {
      if (!image.startsWith('http')) {
        mainImage = getResizedImagePath({
          path: image,
          size: 'middle',
        })
      }
    }

    return { mainImage }
  }, [image])

  const imageElement = (
    <OfferImageStyled $variant={variant}>
      {mainImage ? (
        <img src={mainImage} alt={title} />
      ) : (
        <OfferImagePlaceholderStyled>📦</OfferImagePlaceholderStyled>
      )}
    </OfferImageStyled>
  )

  const titleElement = (
    <OfferTitleStyled $variant={variant}>{title}</OfferTitleStyled>
  )

  const metaElement = offer.createdAt && (
    <OfferMetaStyled>
      <OfferMetaDateStyled>
        <FormattedDate value={offer.createdAt} format="dateMedium" />
      </OfferMetaDateStyled>

      {offer.CreatedBy && <UserLink user={offer.CreatedBy} />}
    </OfferMetaStyled>
  )

  if (variant === 'list') {
    return (
      <OfferStyled $variant={variant}>
        <Link href={`/offers/${offer.id}`}>{imageElement}</Link>

        <OfferHeaderStyled $variant={variant}>
          <OfferHeaderInnerStyled>
            <Link href={`/offers/${offer.id}`}>{titleElement}</Link>

            {offer.description && (
              <OfferDescriptionStyled>
                {offer.description}
              </OfferDescriptionStyled>
            )}

            {offer.intro && <OfferIntroStyled>{offer.intro}</OfferIntroStyled>}
          </OfferHeaderInnerStyled>

          {metaElement}
        </OfferHeaderStyled>
      </OfferStyled>
    )
  }

  return inEditMode ? (
    <OfferEditForm offer={offer} cancelHandler={stopEditing} />
  ) : (
    <OfferStyled $variant={variant}>
      {imageElement}

      <OfferHeaderStyled $variant={variant}>
        <OfferStyledToolbar>
          {titleElement}
          <SeparatorStyled />
          {canEdit && <Button onClick={startEditing}>Редактировать</Button>}
        </OfferStyledToolbar>

        {metaElement}
      </OfferHeaderStyled>

      <OfferBodyStyled $variant={variant}>
        <OfferContentStyled>
          <Markdown>{offer.content}</Markdown>
        </OfferContentStyled>
      </OfferBodyStyled>
    </OfferStyled>
  )
}
