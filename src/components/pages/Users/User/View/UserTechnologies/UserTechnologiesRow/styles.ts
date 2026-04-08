import { minWidth } from 'src/theme/helpers'
import styled from 'styled-components'
import { css } from 'styled-components'
import { UserTechnologiesCellStyled } from '../styles'
import { SelectStyled } from 'src/ui-kit/controls/Select/styles'

export const UserTechnologiesLabelStyled = styled.span`
  font-size: 12px;
  color: #6b7280;
  margin-right: 8px;

  ${minWidth.sm(`
    display: none;
  `)}
`

export const UserTechnologiesTechNameStyled = styled.span`
  font-weight: 500;
  color: #111827;
  font-size: 15px;
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

  ${SelectStyled} {
    min-width: 120px;
  }
`
