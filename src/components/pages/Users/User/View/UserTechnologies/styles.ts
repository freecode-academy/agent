import styled, { css } from 'styled-components'
import { minWidth } from 'src/theme/helpers/media-query'

export const UserTechnologiesLabelStyled = styled.span`
  font-size: 12px;
  color: #6b7280;
  margin-right: 8px;

  ${minWidth.sm(`
    display: none;
  `)}
`

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

export const UserTechnologiesRowStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  > ${UserTechnologiesCellStyled}:last-child {
    flex-direction: row;
    gap: 8px;
    flex-wrap: wrap;
  }

  ${minWidth.sm(css`
    display: contents;
    padding: 0;
    margin-bottom: 0;
    box-shadow: none;
    border-radius: 0;

    &:hover > ${UserTechnologiesCellStyled} {
      background: #f9fafb;
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

export const UserTechnologiesStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;

  ${minWidth.sm(css`
    display: grid;
    grid-template-columns: auto 80px min-content min-content min-content;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
  `)}/* ${minWidth.md(`
    grid-template-columns: 2fr 80px 1.5fr auto;
  `)} */
`

export const UserTechnologiesLevelStyled = styled.span<{ $level: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-weight: 600;
  font-size: 14px;
  background: ${({ $level }) => {
    if ($level >= 8) {
      return '#dcfce7'
    }
    if ($level >= 5) {
      return '#dbeafe'
    }
    if ($level >= 3) {
      return '#fef3c7'
    }
    return '#f3f4f6'
  }};
  color: ${({ $level }) => {
    if ($level >= 8) {
      return '#166534'
    }
    if ($level >= 5) {
      return '#1e40af'
    }
    if ($level >= 3) {
      return '#92400e'
    }
    return '#6b7280'
  }};
`

export const UserTechnologiesDateRangeStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;

  > span {
    color: #9ca3af;
  }
`

export const UserTechnologiesTechNameStyled = styled.span`
  font-weight: 500;
  color: #111827;
  font-size: 15px;
`
