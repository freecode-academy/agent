import { Page } from 'src/components/pages/_App/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { OfferEditForm } from '../Form'

export const OfferCreatePage: Page = () => {
  return (
    <>
      <SeoHeaders
        title="Create offer"
        noindex
        nofollow
        canonical={undefined}
        siteOrigin={undefined}
      />

      <OfferEditForm offer={undefined} cancelHandler={undefined} />
    </>
  )
}
