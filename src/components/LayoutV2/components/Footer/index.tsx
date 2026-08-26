import styled from 'styled-components'
import { theme } from 'src/theme'

import { Container, Logo } from '../../styles'
import Link from 'next/link'

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
  return (
    <FooterStyled>
      <FootInner>
        <Logo href="/">Freecode Academy</Logo>
        <div>
          © {new Date().getFullYear()} Freecode Academy Network. All rights
          shared. {' · '}
          <Link
            href="https://fi1osof.ru"
            target="_blank"
            rel="noopener noreferrer"
          >
            By 𝕱
          </Link>
        </div>
      </FootInner>
    </FooterStyled>
  )
}
