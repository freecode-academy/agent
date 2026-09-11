import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ChatWidget } from 'src/components/Chat/ChatWidget'
import { LayoutFreecodeStyled } from './styles'
import { FreecodeGlobalStyles } from '@/styles'

export const LayoutFreecode: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <FreecodeGlobalStyles />
      <LayoutFreecodeStyled>
        <Header />

        {children}

        <Footer />

        <ChatWidget />
      </LayoutFreecodeStyled>
    </>
  )
}
