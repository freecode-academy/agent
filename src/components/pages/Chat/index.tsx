import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { Page } from '../_App/interfaces'
import { ChatContent } from 'src/components/Chat/ChatWidget/ChatContent'

export const ChatPage: Page = () => {
  return (
    <>
      <SeoHeaders title="AI Chat" noindex nofollow />

      <ChatContent />
    </>
  )
}
