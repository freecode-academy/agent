import { useAppContext } from 'src/components/AppContext'
import { TaskFragment } from 'src/gql/generated'
import { TaskWorlLogs } from './WorkLogs'
import { TaskPageViewStyled } from './styles'
import { TaskCard } from '@/components/TaskCard'

type TaskPageViewProps = {
  task: TaskFragment
}

export const TaskPageView: React.FC<TaskPageViewProps> = ({ task }) => {
  const { user: currentUser } = useAppContext()

  return (
    <TaskPageViewStyled>
      <TaskCard task={task} variant="full" />

      <TaskWorlLogs task={task} currentUser={currentUser} />
    </TaskPageViewStyled>
  )
}
