import { TaskNoNestingFragment, TaskStatusEnum } from 'src/gql/generated'
import { TaskStatusBadgeStyled } from './styles'
import { useBoolean } from 'src/hooks/useBoolean'
import { TaskStatusUpdater } from './StatusUpdater'
import { useAppContext } from '../AppContext'

type TaskStatusBadgeProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  status: TaskStatusEnum
  task: TaskNoNestingFragment | undefined
  active?: boolean
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
  task,
  active,
  ...other
}) => {
  const { user: currentUser } = useAppContext()

  const [inEditMode, , , toggle] = useBoolean()

  const editable = !!task?.id && !!currentUser

  return (
    <>
      <TaskStatusBadgeStyled
        $status={status}
        $active={active}
        onClick={toggle}
        disabled={!editable}
        {...other}
      >
        {statusLabels[status] || status}
      </TaskStatusBadgeStyled>

      {task && inEditMode && <TaskStatusUpdater task={task} />}
    </>
  )
}
