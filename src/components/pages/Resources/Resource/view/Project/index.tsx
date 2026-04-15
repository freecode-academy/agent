import { useMemo } from 'react'
import { ResourceViewProps } from '../interfaces'
import { getResizedImagePath } from 'src/helpers/getResizedImagePath'
import { UserLink } from 'src/components/Link/User'
import { ProjectResourceViewStyled } from './styles'

export const ProjectResourceView: React.FC<ResourceViewProps> = ({
  resource,
}) => {
  const { imageSrc } = useMemo(() => {
    const { Files } = resource

    const Image = Files?.at(0)

    return {
      imageSrc: Image?.path
        ? getResizedImagePath({
            path: Image.path,
            size: 'middle',
          })
        : undefined,
    }
  }, [resource])

  return (
    <ProjectResourceViewStyled>
      <h1>{resource.name}</h1>

      {resource.CreatedBy && <UserLink user={resource.CreatedBy} />}

      {imageSrc && <img src={imageSrc} />}
    </ProjectResourceViewStyled>
  )
}
