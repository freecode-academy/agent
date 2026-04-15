import styled from 'styled-components'
import { theme } from 'src/theme'

export const PhoneNumberMaskedStyled = styled.span`
  font-weight: 700;
`

export const PhoneNumberLinkStyled = styled.a`
  font-weight: 700;
`

export const PhoneNumberRevealButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: ${theme.colors.primary};
  color: #fff;
  cursor: pointer;
  flex-shrink: 0;
  transition: background ${theme.transitions.fast};
  flex-wrap: nowrap;
  font-size: 0;

  &.icon-variant {
    display: block;
    width: 40px;
    height: 44px;
    background: transparent;
    margin: 0 5px 0 0;
    padding: 0;

    svg {
      width: 40px;
      height: 40px;
      display: block;
    }
  }

  svg {
    width: 40px;
    height: 40px;
  }

  &:hover {
    background: ${theme.colors.foreground};
  }

  &:hover svg circle {
    fill: ${theme.colors.primary};
  }

  &.icon-variant:hover {
    background: transparent;
  }
`

export const PhoneNumberStyled = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
`
