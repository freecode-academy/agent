import styled, { css } from 'styled-components'
import { minWidth } from 'src/theme/helpers'
import { ButtonStyled } from 'src/ui-kit/Button/styles'

export const CreateLearnStrategyStageListStyled = styled.div`
  column-gap: 10px;

  > * {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    break-inside: avoid;

    ${ButtonStyled} {
      width: 100%;
    }
  }

  ${minWidth.sm(css`
    column-count: 3;
  `)}

  ${minWidth.md(css`
    column-count: 4;
  `)}

  ${minWidth.lg(css`
    column-count: 6;
  `)}
`

export const CreateLearnStrategyStageStyled = styled.div``
