import {
  TaskDetailedFragment,
  // SortOrder,
  TaskFragment,
  // useTaskWorkLogsQuery,
} from 'src/gql/generated'
import { FormattedDate } from 'src/ui-kit/format/FormattedDate'
import {
  TaskCardStyled,
  TaskCardTitle,
  TaskCardStatus,
  TaskCardMeta,
  TaskCardDescription,
  TaskCardCardTitleStyled,
} from './styles'
import { TaskStatusBadge } from '../TaskStatusBadge'
import Link from 'next/link'
import { Markdown } from '../Markdown'
import { TaskWorkLogs } from './WorkLogs'
import { ProjectLink } from '../Link/Project'

type TaskCardProps = {
  task: TaskFragment | TaskDetailedFragment
  variant: 'list' | 'full'
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, variant }) => {
  // const workLogsResponse = useTaskWorkLogsQuery({
  //   variables: {
  //     where: {
  //       taskId: task.id,
  //     },
  //     orderBy: {
  //       createdAt: SortOrder.ASC,
  //     },
  //   },
  //   skip: !task.id || variant !== 'full',
  // })

  const Project = 'Project' in task ? task.Project : undefined

  return (
    <TaskCardStyled>
      <TaskCardTitle>
        {variant === 'list' ? (
          <Link href={`/tasks/${task.id}`}>{task.title}</Link>
        ) : (
          <TaskCardCardTitleStyled>
            {task.title}

            {Project && <ProjectLink object={Project} />}
          </TaskCardCardTitleStyled>
        )}
      </TaskCardTitle>

      <TaskCardStatus>
        {task.status && <TaskStatusBadge status={task.status} task={task} />}
      </TaskCardStatus>

      <TaskCardMeta>
        {task.createdAt && (
          <span className="date">
            <FormattedDate value={task.createdAt} format="dateShort" />
          </span>
        )}
      </TaskCardMeta>

      {task.description && (
        <TaskCardDescription $variant={variant}>
          {task.description}
        </TaskCardDescription>
      )}

      {variant === 'full' && (
        <>
          {task.content && <Markdown>{task.content}</Markdown>}

          <TaskWorkLogs task={task} />
        </>
      )}
    </TaskCardStyled>
  )
}
