import { useTasksWithCountQuery } from 'src/gql/generated'
import { Page } from '../_App/interfaces'
import { TasksPageProps } from './interfaces'
import { TasksView } from './View'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { getTasksWithCountQueryVariables } from './helpers'
import { tasksPageGetInitialProps } from './tasksPageGetInitialProps'

export const TasksPage: Page<TasksPageProps> = ({
  selectedStatus,
  page,
  projectId,
}) => {
  const variables = getTasksWithCountQueryVariables(
    selectedStatus,
    page,
    projectId,
  )

  const response = useTasksWithCountQuery({
    variables,
    pollInterval: 60000,
  })

  const tasks = response.data?.tasks || []

  return (
    <>
      <SeoHeaders title="Tasks" />
      <TasksView
        tasks={tasks}
        page={page}
        limit={response.variables.take ?? 0}
        count={response.data?.tasksCount ?? 0}
        showContent={page < 2}
      />
    </>
  )
}

TasksPage.getInitialProps = tasksPageGetInitialProps
