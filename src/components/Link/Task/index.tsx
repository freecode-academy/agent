import Link from 'next/link'
import { TaskNoNestingFragment } from 'src/gql/generated'

export function createTaskLink(
  object: Pick<TaskNoNestingFragment, 'id'>,
): string {
  const { id } = object

  return `/tasks/${id}`
}

type TaskLinkProps = {
  task: TaskNoNestingFragment | null | undefined
}

export const TaskLink: React.FC<TaskLinkProps> = ({ task, ...other }) => {
  return task ? (
    <Link
      href={createTaskLink(task)}
      title={task?.title || undefined}
      {...other}
    >
      {task?.title}
    </Link>
  ) : undefined
}
