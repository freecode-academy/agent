import {
  ProjectFragment,
  SortOrder,
  useTasksWithCountQuery,
} from 'src/gql/generated'

import { TasksView } from 'src/components/pages/Tasks/View'
import Link from 'next/link'
import { PrimaryBtn } from '@/styles'

type ProjectTasksProps = {
  project: ProjectFragment
}

export const ProjectTasks: React.FC<ProjectTasksProps> = ({ project }) => {
  const tasksResponse = useTasksWithCountQuery({
    variables: {
      orderBy: {
        createdAt: SortOrder.DESC,
      },
      where: {
        projectId: {
          equals: project.id,
        },
      },
      take: 3,
      skip: 0,
    },
  })

  const tasks = tasksResponse.data?.tasks ?? []

  return (
    <>
      {tasks.length > 0 && (
        <TasksView
          tasks={tasks}
          count={0}
          limit={tasksResponse.variables.take ?? 3}
          page={1}
          showContent={false}
        />
      )}

      <div>
        <Link
          href={`/tasks/create?projectId=${project.id}`}
          rel="noindex nofollow"
        >
          <PrimaryBtn>Create task</PrimaryBtn>
        </Link>
      </div>
    </>
  )
}
