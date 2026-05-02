import styled, { css } from 'styled-components'
import { TaskStatusEnum } from 'src/gql/generated'

const statusColors: Record<TaskStatusEnum, { bg: string; text: string }> = {
  [TaskStatusEnum.NEW]: { bg: '#e3f2fd', text: '#1976d2' },
  [TaskStatusEnum.PROGRESS]: { bg: '#fff3e0', text: '#f57c00' },
  [TaskStatusEnum.DONE]: { bg: '#e8f5e9', text: '#388e3c' },
  [TaskStatusEnum.REJECTED]: { bg: '#ffebee', text: '#d32f2f' },
  [TaskStatusEnum.ACCEPTED]: { bg: '#e8f5e9', text: '#2e7d32' },
  [TaskStatusEnum.APPROVED]: { bg: '#e3f2fd', text: '#1565c0' },
  [TaskStatusEnum.COMPLETED]: { bg: '#e8f5e9', text: '#43a047' },
  [TaskStatusEnum.DISCUSS]: { bg: '#fff3e0', text: '#ef6c00' },
  [TaskStatusEnum.PAUSED]: { bg: '#f3e5f5', text: '#7b1fa2' },
  [TaskStatusEnum.REVISIONSREQUIRED]: { bg: '#ffebee', text: '#c62828' },
}

export const TaskStatusBadgeStyled = styled.button<{
  $status: TaskStatusEnum
  $active?: boolean
}>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  /* cursor: pointer; */
  transition: opacity 0.2s;
  border: none;

  ${({ $status }) => {
    const colors = statusColors[$status] || { bg: '#f5f5f5', text: '#666' }
    return css`
      background: ${colors.bg};
      color: ${colors.text};
    `
  }}
  ${({ $active }) =>
    $active === false &&
    css`
      opacity: 0.5;
    `};
`
