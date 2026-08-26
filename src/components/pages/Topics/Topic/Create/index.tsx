import { Page } from 'src/components/pages/_App/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { ResourceEditForm } from '../Form'

export const ResourceCreatePage: Page = () => {
  return (
    <>
      <SeoHeaders
        title="Create resource"
        noindex
        nofollow
        canonical={undefined}
        siteOrigin={undefined}
      />

      <ResourceEditForm
        resource={undefined}
        cancelHandler={undefined}
        parentId={undefined}
      />
    </>
  )
}
