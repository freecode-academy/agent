import { TaskStatusEnum } from 'src/gql/generated'
import { TaskStatusBadgeStyled } from './styles'
import { StyledTarget } from 'styled-components/dist/types'

type TaskStatusBadgeProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  status: TaskStatusEnum
  active?: boolean
  as?: StyledTarget<'web'>
}

const statusLabels: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.NEW]: 'New',
  [TaskStatusEnum.PROGRESS]: 'In Progress',
  [TaskStatusEnum.DONE]: 'Done',
  [TaskStatusEnum.REJECTED]: 'Rejected',
  [TaskStatusEnum.ACCEPTED]: 'Accepted',
  [TaskStatusEnum.APPROVED]: 'Approved',
  [TaskStatusEnum.COMPLETED]: 'Completed',
  [TaskStatusEnum.DISCUSS]: 'Discuss',
  [TaskStatusEnum.PAUSED]: 'Paused',
  [TaskStatusEnum.REVISIONSREQUIRED]: 'Revisions required',
}

export const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({
  status,
  active,
  ...other
}) => {
  return (
    <TaskStatusBadgeStyled $status={status} $active={active} {...other}>
      {statusLabels[status] || status}
    </TaskStatusBadgeStyled>
  )
}
