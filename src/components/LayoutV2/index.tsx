import { ChatWidget } from '../Chat/ChatWidget'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

export const LayoutV2: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />

      {children}

      <Footer />

      <ChatWidget />
    </>
  )
}
