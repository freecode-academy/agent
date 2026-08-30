import { Page } from 'src/components/pages/_App/interfaces'
import { JsonLd } from 'src/components/seo/JsonLd'
import { createWebSite } from 'src/components/seo/JsonLd/helpers'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { useLexicon } from 'src/Custom/Lexicon'
import { mainpageLexicon } from './lexicon'
import { MainPageDataDocument, useMainPageDataQuery } from 'src/gql/generated'
import { ConceptView } from 'src/components/pages/Concepts/Concept/View'
import { useAppContext } from 'src/components/AppContext'

export const MainPageCustom: Page = ({ siteOrigin }) => {
  const { t } = useLexicon(mainpageLexicon)

  const { user } = useAppContext()

  const response = useMainPageDataQuery()

  const concept = response.data?.concept

  const title = concept?.name || t('seo.title')
  const description = concept?.description ?? t('seo.description')

  return (
    <>
      <SeoHeaders
        title={title}
        description={description}
        canonical={'/'}
        siteOrigin={siteOrigin}
      />
      {siteOrigin && (
        <JsonLd
          data={createWebSite({
            name: t('seo.title'),
            url: siteOrigin,
          })}
        />
      )}

      {concept && <ConceptView concept={concept} currentUser={user} />}
    </>
  )
}

MainPageCustom.getInitialProps = async ({ apolloClient }) => {
  await apolloClient.query({
    query: MainPageDataDocument,
  })

  return {}
}
