import {
  GridTableItemStyled,
  GridTableStyled,
} from 'src/components/GridTable/styles'
import styled, { css } from 'styled-components'

export const TechnologyViewStyled = styled.section`
  .technology--used-by {
    margin-top: 30px;
  }
`

type TechnologyGridTableStyledProps = {
  showActions: boolean
  showCreateBy: boolean
  showTechnology: boolean
}

export const TechnologyGridTableStyled = styled(
  GridTableStyled,
)<TechnologyGridTableStyledProps>`
  @media screen and (min-width: ${({ theme }) => `${theme.breakpoints.sm}px`}) {
    > ${GridTableItemStyled} {
      display: grid;
      grid-template-columns:
        ${({ showActions }) =>
          showActions ? css`minmax(54px, min-content)` : null}
        ${({ showTechnology }) =>
          showTechnology ? css`minmax(80px, 1fr)` : null}
        ${({ showCreateBy }) => (showCreateBy ? css`minmax(80px, 1fr)` : null)}
        minmax(130px, 1fr) minmax(130px, 1fr) minmax(130px, 1fr)
        minmax(130px, 1fr)
        minmax(130px, 1fr);
    }
  }
`
