import { minWidth } from 'src/theme/helpers'
import styled, { css } from 'styled-components'

export const ResourceFullViewContentsStyled = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  gap: 30px;

  ${minWidth.md(css`
    grid-template-columns: 1fr 1fr;
  `)}
`

export const ResourceFullViewStyled = styled.div`
  display: contents;
`
