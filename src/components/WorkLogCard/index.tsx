import React from 'react'
import {
  TaskWorkLogDetailedFragment,
  TaskWorkLogFragment,
} from 'src/gql/generated'
import { FormattedDate } from 'src/ui-kit/format/FormattedDate'
import { WorkLogCardStyled, WorkLogCardMeta } from './styles'
import { Markdown } from '../Markdown'
import { TaskWorkLogLink } from '../Link/TaskWorkLog'
import { UserLink } from '../Link/User'
import { TaskLink } from '../Link/Task'

type WorkLogCardProps = {
  workLog: TaskWorkLogFragment | TaskWorkLogDetailedFragment
  variant?: 'list' | 'full'
}

export const WorkLogCard: React.FC<WorkLogCardProps> = ({
  workLog,
  variant = 'list',
}) => {
  const { CreatedBy } = workLog

  return (
    <WorkLogCardStyled>
      <WorkLogCardMeta>
        <div>{CreatedBy && <UserLink user={CreatedBy} />}</div>

        {variant === 'list' && workLog.id ? (
          <TaskWorkLogLink taskWorkLog={workLog} />
        ) : (
          <FormattedDate value={workLog.createdAt} format="dateTimeMedium" />
        )}
      </WorkLogCardMeta>

      {workLog.content && <Markdown>{workLog.content}</Markdown>}

      {'Task' in workLog && workLog.Task && (
        <div>
          Task: <TaskLink task={workLog.Task} />
        </div>
      )}
    </WorkLogCardStyled>
  )
}
