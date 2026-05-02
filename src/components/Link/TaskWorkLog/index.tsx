import Link from 'next/link'
import { TaskWorkLogNoNestingFragment } from 'src/gql/generated'
import { FormattedDate } from 'src/ui-kit/format/FormattedDate'

export function makeTaskWorkLogLink(taskWorkLog: TaskWorkLogNoNestingFragment) {
  const { id } = taskWorkLog

  return `/worklogs/${id}`
}

type TaskWorkLogLinkProps = {
  taskWorkLog: TaskWorkLogNoNestingFragment | null | undefined
}

export const TaskWorkLogLink: React.FC<TaskWorkLogLinkProps> = ({
  taskWorkLog,
  ...other
}) => {
  return taskWorkLog ? (
    <Link href={makeTaskWorkLogLink(taskWorkLog)} {...other}>
      <FormattedDate value={taskWorkLog.createdAt} format="dateTimeMedium" />
    </Link>
  ) : undefined
}
