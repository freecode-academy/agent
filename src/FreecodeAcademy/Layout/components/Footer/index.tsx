import styled from 'styled-components'
import { theme } from 'src/theme'

import { Container, Logo } from '../../styles'
import Link from 'next/link'
import { useLexicon } from 'src/Custom/Lexicon'
import { footerLexicon } from './lexicon'

/* FOOTER */
const FooterStyled = styled.footer`
  border-top: 1px solid ${theme.line};
  padding: 40px 0;
  color: ${theme.muted};
  font-size: 14px;
`
const FootInner = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`

export const Footer: React.FC = () => {
  const { t } = useLexicon(footerLexicon)

  return (
    <FooterStyled>
      <FootInner>
        <Logo href="/">{t('footer.logo')}</Logo>
        <div>
          © {t('footer.copyright', { year: new Date().getFullYear() })} {' · '}
          <Link href="https://fi1osof.ru" target="_blank">
            {t('footer.author')}
          </Link>
        </div>
      </FootInner>
    </FooterStyled>
  )
}
