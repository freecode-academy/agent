import { PrimaryBtn } from '@/styles'
import { TaskWorkLogEditForm } from 'src/components/pages/WorkLogs/WorkLog/Form'
import { WorkLogCard } from 'src/components/WorkLogCard'
import { TaskDetailedFragment } from 'src/gql/generated'
import { useBoolean } from 'src/hooks/useBoolean'
import { TaskWorkLogsStyled } from './styles'
import { useCallback } from 'react'
import { useApolloClient } from '@apollo/client/react'

type TaskWorkLogsProps = {
  task: TaskDetailedFragment
}

export const TaskWorkLogs: React.FC<TaskWorkLogsProps> = ({ task }) => {
  const [inEditMode, , stopEdit, toggle] = useBoolean()

  const client = useApolloClient()

  const onSuccess = useCallback(() => {
    client.resetStore().catch(console.error)
  }, [client])

  return (
    <TaskWorkLogsStyled>
      {task.WorkLogs?.map((n) => (
        <WorkLogCard key={n.id} workLog={n} variant="list" />
      ))}

      {inEditMode ? (
        <TaskWorkLogEditForm
          taskId={task.id}
          taskWorkLog={undefined}
          cancelHandler={stopEdit}
          onSuccess={onSuccess}
        />
      ) : (
        <div>
          <PrimaryBtn onClick={toggle} rel="noindex nofollow">
            Add WorkLog
          </PrimaryBtn>
        </div>
      )}
    </TaskWorkLogsStyled>
  )
}
