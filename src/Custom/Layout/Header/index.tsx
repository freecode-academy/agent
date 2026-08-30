import { LocaleSwitcher } from 'src/Custom/components/LocaleSwitcher'
import { HeaderCustomNavStyled, HeaderCustomStyled } from './styles'
import Link from 'next/link'
import { useLexicon } from 'src/Custom/Lexicon'
import { headerLexicon } from './lexicon'

export const HeaderCustom: React.FC = () => {
  const { t } = useLexicon(headerLexicon)

  return (
    <HeaderCustomStyled>
      <HeaderCustomNavStyled>
        <Link href={'/'}>{t('layout.header.nav.home')}</Link>
        <Link href={'/concepts'}>{t('layout.header.nav.concepts')}</Link>
      </HeaderCustomNavStyled>

      <LocaleSwitcher />
    </HeaderCustomStyled>
  )
}
