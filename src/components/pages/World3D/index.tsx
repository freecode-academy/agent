import { World3DScene } from 'src/components/world3d/World3DScene'
import { Page } from '../_App/interfaces'
import { World3DScenePageGlobalStyles } from './styles'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'

export const World3DScenePage: Page = () => {
  return (
    <>
      <SeoHeaders
        title="3D World"
        noindex
        nofollow
        canonical={undefined}
        siteOrigin={undefined}
      />
      <World3DScenePageGlobalStyles />
      <World3DScene />
    </>
  )
}
