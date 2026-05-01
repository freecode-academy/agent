import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { SignUpForm } from 'src/components/Auth/SignUpForm'
import { SignUpPageStyled } from './styles'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'

export const SignUpPage: React.FC = () => {
  const router = useRouter()

  const handleSuccess = useCallback(() => {
    router.push('/')
  }, [router])

  return (
    <SignUpPageStyled>
      <SeoHeaders title={'Sign up'} />

      <h1>Sign Up</h1>
      <SignUpForm onSuccessHandler={handleSuccess} />
    </SignUpPageStyled>
  )
}
