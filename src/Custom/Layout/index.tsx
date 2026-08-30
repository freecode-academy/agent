import { ChatWidget } from 'src/components/Chat/ChatWidget'
import { HeaderCustom } from './Header'
import { LayoutCustomMainStyled, LayoutCustomStyled } from './styles'

export const LayoutCustom: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <LayoutCustomStyled>
      <HeaderCustom />

      <LayoutCustomMainStyled>{children}</LayoutCustomMainStyled>

      <ChatWidget />
    </LayoutCustomStyled>
  )
}
