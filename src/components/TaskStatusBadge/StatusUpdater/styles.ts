import styled from 'styled-components'
import { TaskStatusBadgeStyled } from '../styles'

export const TaskStatusUpdaterStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 8px 0;

  ${TaskStatusBadgeStyled} {
    font-size: 0.5rem;
  }
`
