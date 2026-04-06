import styled from 'styled-components'

export const UserTechnologyStatusStyled = styled.span<{
  $color: string
  $bgColor: string
}>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ $color }) => $color};
  background-color: ${({ $bgColor }) => $bgColor};
`
