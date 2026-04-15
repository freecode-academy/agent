import styled from 'styled-components'
import { theme } from 'src/theme'

export const EmailAddressStyled = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`

export const EmailAddressMaskedStyled = styled.span`
  color: ${theme.colors.foreground};
`

export const EmailAddressLinkStyled = styled.a`
  color: ${theme.colors.foreground};
  text-decoration: none;

  &:hover {
    color: ${theme.colors.primary};
  }
`
