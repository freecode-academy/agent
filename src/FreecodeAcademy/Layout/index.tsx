import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ChatWidget } from 'src/components/Chat/ChatWidget'

export const LayoutFreecode: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <Header />

      {children}

      <Footer />

      <ChatWidget />
    </>
  )
}
