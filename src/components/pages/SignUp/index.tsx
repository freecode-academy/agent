import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { SignUpForm } from 'src/components/Auth/SignUpForm'
import { SignUpPageStyled } from './styles'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { useAuthedRedirect } from 'src/components/Auth/hooks/useAuthedRedirect'
import { Page } from '../_App/interfaces'

export const SignUpPage: Page = ({ siteOrigin }) => {
  useAuthedRedirect()

  const router = useRouter()

  const handleSuccess = useCallback(() => {
    router.push('/')
  }, [router])

  return (
    <SignUpPageStyled>
      <SeoHeaders
        title={'Sign up'}
        canonical={'/signup'}
        siteOrigin={siteOrigin}
        noindex
        nofollow
      />

      <h1>Sign Up</h1>
      <SignUpForm onSuccessHandler={handleSuccess} />
    </SignUpPageStyled>
  )
}
