import React from 'react'
import { ProjectViewStyled } from './styles'
import { ProjectFragment, useTasksWithCountQuery } from 'src/gql/generated'
import { useRouter } from 'next/router'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { TasksView } from 'src/components/pages/Tasks/View'
// import { useTasksFilter } from 'src/hooks/useTasksFilter'

type ProjectViewProps = {
  project: ProjectFragment
}

const TASKS_PER_PAGE = 10

export const ProjectView: React.FC<ProjectViewProps> = ({
  project,
  ...other
}) => {
  const router = useRouter()
  const page = Number(router.query.page) || 1
  const skip = (page - 1) * TASKS_PER_PAGE

  const name = project.Resource?.name || project.name || ''

  // const { where } = useTasksFilter({
  //   baseWhere: {
  //     projectId: {
  //       equals: project.id,
  //     },
  //   },
  // })

  const tasksResponse = useTasksWithCountQuery({
    variables: {
      // orderBy: {
      //   updatedAt: SortOrder.DESC,
      // },
      // where,
      take: TASKS_PER_PAGE,
      skip,
    },
  })

  const tasks = tasksResponse.data?.tasks ?? []
  const total = tasksResponse.data?.tasksCount ?? 0

  const totalPages = total ? Math.floor(total / TASKS_PER_PAGE) + 1 : 0

  return (
    <>
      <SeoHeaders
        title={name}
        description={
          name
            ? `Project "${name}" — tasks, progress, and collaboration details.`
            : ''
        }
        // canonical={makeProjectLink(project)}
      />
      <ProjectViewStyled {...other}>
        <h2>{name}</h2>

        <TasksView tasks={tasks} currentPage={page} totalPages={totalPages} />
      </ProjectViewStyled>
    </>
  )
}
