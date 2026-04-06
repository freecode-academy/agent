import { Page } from 'src/components/pages/_App/interfaces'
import { TeamForm } from '../Form'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

export const TeamCreatePage: Page = () => {
  const router = useRouter()

  const cancelHandler = useCallback(() => {
    router.back()
  }, [router])

  return (
    <>
      <SeoHeaders title="Create team" noindex nofollow />

      <TeamForm team={undefined} cancelHandler={cancelHandler} />
    </>
  )
}
