import { PrimaryBtn } from '@/styles'
import { useAppContext } from 'src/components/AppContext'
import { UserLink } from 'src/components/Link/User'
import { AuthorityStyled } from './styles'

type AuthorityProps = React.PropsWithChildren

export const Authority: React.FC<AuthorityProps> = ({ children, ...other }) => {
  const { user: currentUser, openLoginForm } = useAppContext()

  return (
    <AuthorityStyled {...other}>
      {currentUser ? (
        <UserLink user={currentUser} />
      ) : (
        <PrimaryBtn onClick={openLoginForm}>
          {children || 'Get Access'}
        </PrimaryBtn>
      )}
    </AuthorityStyled>
  )
}
