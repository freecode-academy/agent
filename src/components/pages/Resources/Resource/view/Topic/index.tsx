import { SortOrder, useResourcesQuery } from 'src/gql/generated'
import { ResourceViewProps } from '../interfaces'
import { Resource } from 'src/components/Resource'

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
    <>
      {resources.map((n) => (
        <Resource key={n.id} resource={n} variant="comment" />
      ))}
    </>
  )
}
