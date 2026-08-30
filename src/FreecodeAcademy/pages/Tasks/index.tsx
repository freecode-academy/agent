import { useTasksWithCountQuery } from 'src/gql/generated'
import { Page } from 'src/components/pages/_App/interfaces'
import { TasksPageProps } from './interfaces'
import { TasksView } from './View'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { getTasksWithCountQueryVariables } from './helpers'
import { tasksPageGetInitialProps } from './tasksPageGetInitialProps'
import { useAppContext } from 'src/components/AppContext'

export const TasksPageFreecode: Page<TasksPageProps> = ({
  selectedStatus,
  page,
  projectId,
  siteOrigin,
}) => {
  const { user: currentUser } = useAppContext()

  const variables = getTasksWithCountQueryVariables(
    selectedStatus,
    page,
    projectId,
  )

  const response = useTasksWithCountQuery({
    variables,
    pollInterval: 60000,
    fetchPolicy: 'cache-and-network',
  })

  const tasks = response.data?.tasks || []

  return (
    <>
      <SeoHeaders
        title="Tasks"
        siteOrigin={siteOrigin}
        canonical={`/tasks${page > 1 ? `?page=${page}` : ''}`}
        nofollow
        noindex
      />
      <TasksView
        tasks={tasks}
        page={page}
        limit={response.variables.take ?? 0}
        count={response.data?.tasksCount ?? 0}
        showContent={page < 2 && !currentUser}
      />
    </>
  )
}

TasksPageFreecode.getInitialProps = tasksPageGetInitialProps
