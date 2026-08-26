import { useTaskQuery } from 'src/gql/generated'
import { Page } from '../../_App/interfaces'
import { TaskPageProps } from './interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { taskPageGetInitialProps } from './taskPageGetInitialProps'
import { TaskPageView } from './View'
import { createTaskLink } from 'src/components/Link/Task'

export const TaskPage: Page<TaskPageProps> = ({ taskId, siteOrigin }) => {
  const response = useTaskQuery({
    variables: {
      where: {
        id: taskId,
      },
    },
    skip: !taskId,
  })

  const task = response.data?.response

  return (
    task && (
      <>
        <SeoHeaders
          title={task.title || 'Task'}
          canonical={createTaskLink(task)}
          siteOrigin={siteOrigin}
        />
        {task && <TaskPageView task={task} />}
      </>
    )
  )
}

TaskPage.getInitialProps = taskPageGetInitialProps
