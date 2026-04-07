import { SortOrder, useResourcesQuery } from 'src/gql/generated'
import { ResourceViewProps } from '../interfaces'
import { Resource } from 'src/components/Resource'
import { TopicViewStyled } from './styles'

export const TopicView: React.FC<ResourceViewProps> = ({ resource }) => {
  const response = useResourcesQuery({
    variables: {
      where: {
        topicId: resource.id,
      },
      orderBy: {
        createdAt: SortOrder.ASC,
      },
      resourceWithDetailes: true,
    },
  })

  const resources = response.data?.resources ?? []
  // const count = response.data?.resourcesCount ?? 0

  return (
    <TopicViewStyled>
      <Resource resource={resource} variant="full" />

      {resources.length > 0 && (
        <>
          <h3>Comments</h3>

          {resources.map((n) => (
            <Resource key={n.id} resource={n} variant="comment" />
          ))}
        </>
      )}
    </TopicViewStyled>
  )
}
