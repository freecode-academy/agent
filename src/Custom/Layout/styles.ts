import styled from 'styled-components'
import { HeaderCustomStyled } from './Header/styles'

export const LayoutCustomMainStyled = styled.main``

export const LayoutCustomStyled = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;

  ${HeaderCustomStyled} {
    position: sticky;
    top: 0;
  }
`
