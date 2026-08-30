import {
  ProjectFragment,
  SortOrder,
  useTasksWithCountQuery,
} from 'src/gql/generated'

import Link from 'next/link'
import { Buttons, PrimaryBtn } from '@/Layout/styles'
import { TasksView } from '@/pages/Tasks/View'

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

  const count = tasksResponse.data?.tasksCount ?? 0

  return (
    <>
      {tasks.length > 0 && (
        <TasksView
          tasks={tasks}
          count={tasks.length}
          limit={tasksResponse.variables.take ?? 3}
          page={1}
          showContent={false}
        />
      )}

      <Buttons>
        {count > 3 && (
          <div>
            <Link href={`/tasks?projectId=${project.id}`}>
              View all {count} tasks
            </Link>
          </div>
        )}
        <Link
          href={`/tasks/create?projectId=${project.id}`}
          rel="noindex nofollow"
        >
          <PrimaryBtn>Create task</PrimaryBtn>
        </Link>
      </Buttons>
    </>
  )
}
