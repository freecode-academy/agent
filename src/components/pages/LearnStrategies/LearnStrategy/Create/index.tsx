import { Page } from 'src/components/pages/_App/interfaces'
import { LearnStrategyForm } from '../Form'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

export const LearnStrategyCreatePage: Page = () => {
  const router = useRouter()

  const cancelHandler = useCallback(() => {
    router.back()
  }, [router])

  return (
    <>
      <SeoHeaders title="Create learn strategy" noindex nofollow />

      <LearnStrategyForm
        learnStrategy={undefined}
        cancelHandler={cancelHandler}
      />
    </>
  )
}
