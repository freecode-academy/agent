import styled, { css } from 'styled-components'
import { minWidth } from 'src/theme/helpers/media-query'

export const UserTechnologiesCellStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  background: #fff;

  &:empty {
    display: none;
  }

  ${minWidth.sm(css`
    padding: 8px 16px;
    border-bottom: 1px solid #e5e7eb;

    &:empty {
      display: initial;
    }
  `)}
`

export const UserTechnologiesRowHeaderStyled = styled.div`
  display: none;

  ${minWidth.sm(`
    display: contents;
  `)}

  > ${UserTechnologiesCellStyled} {
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
    background: #f9fafb;
    border-bottom: 2px solid #e5e7eb;
  }
`

export const UserTechnologiesButtonsStyled = styled.div`
  display: flex;
  gap: 15px;
`

export const UserTechnologiesGridStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;

  ${minWidth.sm(css`
    display: grid;
    grid-template-columns: auto min-content min-content min-content min-content min-content;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
  `)}
`

export const UserTechnologiesStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
