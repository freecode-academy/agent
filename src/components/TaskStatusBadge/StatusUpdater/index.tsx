import {
  TaskNoNestingFragment,
  TaskStatusEnum,
  useUpdateTaskMutation,
} from 'src/gql/generated'
import { TaskStatusBadge } from '..'
import { TaskStatusUpdaterStyled } from './styles'
import { useCallback } from 'react'
import { useSnackbar } from 'src/ui-kit/Snackbar'

type TaskStatusUpdaterProps = {
  task: TaskNoNestingFragment
}

export const TaskStatusUpdater: React.FC<TaskStatusUpdaterProps> = ({
  task,
}) => {
  const [updateMutation, { loading }] = useUpdateTaskMutation()

  const { addMessage } = useSnackbar() || {}

  const onClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      const value = event.currentTarget.value

      try {
        await updateMutation({
          variables: {
            where: {
              id: task.id,
            },
            data: {
              status: value as TaskStatusEnum,
            },
          },
        })
      } catch (error) {
        addMessage?.((error as Error)?.message || 'Unknow Error', {
          variant: 'error',
        })
      }
    },
    [addMessage, task.id, updateMutation],
  )

  return (
    <TaskStatusUpdaterStyled>
      {Object.values(TaskStatusEnum).map((n) => {
        return (
          <TaskStatusBadge
            key={n}
            status={n}
            task={undefined}
            active={task.status === n}
            disabled={loading}
            onClick={onClick}
            value={n}
          />
        )
      })}
    </TaskStatusUpdaterStyled>
  )
}
