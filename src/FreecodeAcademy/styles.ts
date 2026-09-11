import { MarkdownStyled } from 'src/components/Markdown/styles'
import styled, { createGlobalStyle } from 'styled-components'

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`

export const Flex1 = styled.div`
  flex: 1;

  &:last-child:empty {
    display: none;
  }
`

export const FreecodeGlobalStyles = createGlobalStyle`
  body {

    ${MarkdownStyled} {
      
      h4, h5 , h6 {
        font-size: 18px;
      }

      h3 {
        font-size: 20px;
      }

      h2 { 
        font-size: 22px;
      }

      h1 {
        font-size: 24px;
      }

    }
  }
`
