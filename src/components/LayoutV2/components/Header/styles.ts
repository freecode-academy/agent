import styled from 'styled-components'
import { theme } from 'src/theme'

import { Nav, NavInner, NavLinks } from '../../styles'

export const BurgerCheckbox = styled.input`
  display: none;
`

export const BurgerLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: transparent;
  cursor: pointer;
  padding: 4px;

  @media (min-width: 880px) {
    display: none;
  }

  span {
    display: block;
    width: 100%;
    height: 2px;
    background: ${theme.ink};
    border-radius: 2px;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
  }
`

export const MobileMenu = styled.div`
  display: contents;
  padding: 0;

  @media (max-width: 879px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    order: 10;
    max-height: 0;
    overflow: hidden;
    background: ${theme.bg};
    transition:
      max-height 0.3s ease,
      padding 0.3s ease;

    ${NavLinks} {
      display: flex;
      flex-direction: column;
      gap: 16px;
      font-size: 16px;
    }
  }
`

export const HeaderStyled = styled(Nav)`
  @media (max-width: 879px) {
    ${NavInner} {
      flex-wrap: wrap;
    }

    #burger-toggle:checked ~ ${NavInner} ${MobileMenu} {
      max-height: 400px;
      padding: 12px;
    }
  }

  #burger-toggle:checked ~ ${NavInner} ${BurgerLabel} {
    span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }

  ${NavInner} {
    ${BurgerLabel} {
      margin-right: 12px;
    }
  }
`
