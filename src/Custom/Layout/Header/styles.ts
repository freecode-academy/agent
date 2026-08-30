import { minWidth } from 'src/theme/helpers'
import styled, { css } from 'styled-components'

export const HeaderCustomNavStyled = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const HeaderCustomStyled = styled.div`
  align-items: center;
  gap: 10px;
  padding: 10px 0;

  display: grid;
  grid-template-rows: auto;

  ${minWidth.sm(css`
    grid-template-columns: auto min-content;
  `)}
`
