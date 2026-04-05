import React from 'react'

// import Typography from 'material-ui/Typography'

import { ProjectsList } from './List'

import {
  ProjectsConnectionProjectFragment,
  ProjectsConnectionQueryVariables,
} from 'src/gql/generated'

import { ProjectsViewStyled } from './styles'
import { Pagination } from 'src/components/Pagination'
// import Link from 'next/link'
// import { ProjectsConnectionProjectFragment } from 'src/gql/generated'

export type ProjectsViewProps = {
  objects: ProjectsConnectionProjectFragment[]
  variables?: ProjectsConnectionQueryVariables
  page?: number
  count?: number
  loading: boolean
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  page,
  objects: projects,
  variables,
  count = 0,
  ...other
}) => {
  const limit = variables?.first ?? 0

  const totalPages = count ? Math.floor(count / limit) + 1 : 0

  return (
    <ProjectsViewStyled {...other}>
      <ProjectsList projects={projects} />

      <Pagination currentPage={page || 1} totalPages={totalPages} />
    </ProjectsViewStyled>
  )
}
