import styled, { css } from 'styled-components'
import { minWidth } from 'src/theme/helpers'
import { ButtonStyled } from 'src/ui-kit/Button/styles'

export const CreateLearnStrategyStageStyled = styled.div`
  .list {
    display: grid;
    grid-gap: 10px;

    > * {
      display: flex;
      align-items: center;

      ${ButtonStyled} {
        width: 100%;
      }
    }

    ${minWidth.sm(css`
      grid-template-columns: repeat(3, 1fr);
    `)}

    ${minWidth.md(css`
      grid-template-columns: repeat(4, 1fr);
    `)}
    
    ${minWidth.lg(css`
      grid-template-columns: repeat(6, 1fr);
    `)}
  }
`
