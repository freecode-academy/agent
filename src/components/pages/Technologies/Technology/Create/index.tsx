import { Page } from 'src/components/pages/_App/interfaces'
import { TechnologyForm } from '../Form'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

export const TechnologyCreatePage: Page = () => {
  const router = useRouter()

  const cancelHandler = useCallback(() => {
    router.back()
  }, [router])

  return (
    <>
      <SeoHeaders title="Create technology" noindex nofollow />

      <TechnologyForm technology={undefined} cancelHandler={cancelHandler} />
    </>
  )
}
