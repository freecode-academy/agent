import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { SignInForm } from 'src/components/Auth/SignInForm'
import { SignInPageStyled } from './styles'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { useAuthedRedirect } from 'src/components/Auth/hooks/useAuthedRedirect'
import { Page } from '../_App/interfaces'

export const SignInPage: Page = ({ siteOrigin }) => {
  useAuthedRedirect()

  const router = useRouter()

  const handleSuccess = useCallback(() => {
    router.push('/')
  }, [router])

  return (
    <SignInPageStyled>
      <SeoHeaders
        title={'Sign in'}
        canonical={'/signin'}
        siteOrigin={siteOrigin}
        noindex
        nofollow
      />

      <h1>Sign In</h1>
      <SignInForm onSuccessHandler={handleSuccess} />
    </SignInPageStyled>
  )
}
