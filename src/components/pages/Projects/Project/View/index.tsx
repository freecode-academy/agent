import React from 'react'
import { ProjectViewStyled } from './styles'
import {
  ProjectFragment,
  SortOrder,
  useTasksWithCountQuery,
} from 'src/gql/generated'
// import { useRouter } from 'next/router'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { H2 } from 'src/components/LayoutV2/styles'
import { Markdown } from 'src/components/Markdown'
import { TasksView } from 'src/components/pages/Tasks/View'
// import { TasksView } from 'src/components/pages/Tasks/View'
// import { useTasksFilter } from 'src/hooks/useTasksFilter'

type ProjectViewProps = {
  project: ProjectFragment
}

// const TASKS_PER_PAGE = 10

export const ProjectView: React.FC<ProjectViewProps> = ({
  project,
  ...other
}) => {
  // const router = useRouter()
  // const page = Number(router.query.page) || 1
  // const skip = (page - 1) * TASKS_PER_PAGE

  const { description, Resource } = project

  const name = Resource?.name || project.name || ''

  const content =
    project.content ||
    (Resource &&
      'contentV2' in Resource &&
      typeof Resource.contentV2 === 'string' &&
      Resource.contentV2)

  // const { where } = useTasksFilter({
  //   baseWhere: {
  //     projectId: {
  //       equals: project.id,
  //     },
  //   },
  // })

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
  // const total = tasksResponse.data?.tasksCount ?? 0

  // const totalPages = total ? Math.floor(total / TASKS_PER_PAGE) + 1 : 0

  return (
    <>
      <SeoHeaders
        title={name}
        description={
          description || name
            ? `Project "${name}" — tasks, progress, and collaboration details.`
            : ''
        }
        // canonical={makeProjectLink(project)}
      />
      <ProjectViewStyled {...other}>
        <H2>{name}</H2>

        {content && <Markdown>{content}</Markdown>}

        {tasks.length > 0 && (
          <TasksView
            tasks={tasks}
            // count={tasksResponse.data?.tasksCount ?? 0}
            count={0}
            limit={tasksResponse.variables.take ?? 3}
            page={1}
            showContent={false}
          />
        )}
      </ProjectViewStyled>
    </>
  )
}
