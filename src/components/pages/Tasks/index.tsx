import { useTasksWithCountQuery } from 'src/gql/generated'
import { Page } from '../_App/interfaces'
import { TasksPageProps, tasksPageSize } from './interfaces'
import { TasksView } from './View'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { getTasksWithCountQueryVariables } from './helpers'
import { tasksPageGetInitialProps } from './tasksPageGetInitialProps'

export const TasksPage: Page<TasksPageProps> = ({ selectedStatus, page }) => {
  const variables = getTasksWithCountQueryVariables(
    selectedStatus,
    page,
    tasksPageSize,
  )

  const response = useTasksWithCountQuery({
    variables,
    pollInterval: 60000,
  })

  const tasks = response.data?.tasks || []
  const totalCount = response.data?.tasksCount || 0
  const totalPages = Math.ceil(totalCount / tasksPageSize)

  return (
    <>
      <SeoHeaders title="Tasks" />
      <TasksView
        tasks={tasks}
        loading={response.loading}
        currentPage={page}
        totalPages={totalPages}
      />
    </>
  )
}

TasksPage.getInitialProps = tasksPageGetInitialProps
