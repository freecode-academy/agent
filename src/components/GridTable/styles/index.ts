import styled from 'styled-components'
import { GridTableAttributesContainerStyled } from './GridTableAttributesContainerStyled'
import { GridTableAttributeStyled } from './GridTableAttributeStyled'
import { GridTableItemStyled } from './GridTableItemStyled'

export {
  GridTableAttributesContainerStyled,
  GridTableAttributeStyled,
  GridTableItemStyled,
}

export const GridTableStyled = styled.ol`
  margin: 0px;
  padding: 0px;

  > ${GridTableItemStyled} {
    list-style: none;

    &:first-child {
      background-color: blanchedalmond;
      border-top: 1px solid gray;
    }
  }

  @media screen and (max-width: ${({ theme }) =>
      `${theme.breakpoints.sm - 1}px`}) {
    display: grid;
    grid-template-columns: 1fr;

    > ${GridTableItemStyled} {
      border: 1px solid gray;
      border-radius: 2px;
      padding: 10px;
    }
  }

  @media screen and (min-width: ${({ theme }) => `${theme.breakpoints.sm}px`}) {
    > ${GridTableItemStyled} {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));

      &:first-child {
        ${GridTableAttributeStyled} {
          display: flex;
          align-items: center;
          justify-content: center;
          text-overflow: initial;
          overflow: auto;
          white-space: normal;
        }
      }

      > ${GridTableAttributeStyled} {
        &:first-child {
          border-left: 1px solid gray;
        }
      }
    }

    ${GridTableAttributeStyled} {
      border-right: 1px solid gray;
      border-bottom: 1px solid gray;
      padding: 2px;
    }
  }
`
