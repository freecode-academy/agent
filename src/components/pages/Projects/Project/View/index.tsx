import React from 'react'
import { ProjectViewStyled } from './styles'
import { ProjectFragment } from 'src/gql/generated'
// import { useRouter } from 'next/router'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { H2 } from 'src/components/LayoutV2/styles'
import { Markdown } from 'src/components/Markdown'
import { ProjectTasks } from './Tasks'
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

        <ProjectTasks project={project} />
      </ProjectViewStyled>
    </>
  )
}
