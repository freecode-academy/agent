import { theme } from 'src/theme'
import styled from 'styled-components'

export const ShowButtonStyled = styled.button`
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
  font-size: 0;

  &:hover {
    background: ${theme.backgrounds.overlay};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`
