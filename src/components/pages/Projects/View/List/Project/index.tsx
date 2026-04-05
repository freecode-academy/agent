import { ProjectsConnectionProjectFragment } from 'src/gql/generated'
import {
  ProjectListProjectStyled,
  ProjectListProjectTitleStyled,
  ProjectTitleWrapper,
  ProjectStatusWrapper,
  ProjectAuthorWrapper,
  ProjectDescriptionWrapper,
  ProjectStatusBadge,
} from './styles'
import { UserLink } from 'src/components/Link/User'

type ProjectViewProps = {
  project: ProjectsConnectionProjectFragment
}

export const ProjectListProject: React.FC<ProjectViewProps> = ({
  project,
  ...other
}) => {
  const { CreatedBy, description, status } = project

  return (
    <ProjectListProjectStyled {...other}>
      <ProjectTitleWrapper>
        <ProjectListProjectTitleStyled object={project} />
      </ProjectTitleWrapper>

      <ProjectStatusWrapper>
        {status && (
          <ProjectStatusBadge $status={status}>{status}</ProjectStatusBadge>
        )}
      </ProjectStatusWrapper>

      <ProjectAuthorWrapper>
        {CreatedBy && <UserLink user={CreatedBy} size="small" />}
      </ProjectAuthorWrapper>

      {description && (
        <ProjectDescriptionWrapper>{description}</ProjectDescriptionWrapper>
      )}
    </ProjectListProjectStyled>
  )
}
