import Link from 'next/link'
import { TaskNoNestingFragment } from 'src/gql/generated'

export function makeTaskLink(task: TaskNoNestingFragment) {
  const { id } = task

  return `/tasks/${id}`
}

type TaskLinkProps = {
  task: TaskNoNestingFragment | null | undefined
}

export const TaskLink: React.FC<TaskLinkProps> = ({ task, ...other }) => {
  return task ? (
    <Link href={makeTaskLink(task)} title={task?.title || undefined} {...other}>
      {task?.title}
    </Link>
  ) : undefined
}
