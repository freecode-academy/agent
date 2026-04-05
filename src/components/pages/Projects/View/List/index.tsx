import React from 'react'

import { ProjectListProject as Project } from './Project'
import { ProjectsListProps } from './interfaces'
import { ProjectsListStyled } from './styles'

export const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  ...other
}) => {
  return (
    <ProjectsListStyled {...other}>
      {projects?.map((n) => {
        return <Project key={n.id} project={n} />
      })}
    </ProjectsListStyled>
  )
}
