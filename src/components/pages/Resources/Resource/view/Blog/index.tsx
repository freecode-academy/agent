import { ResourcesPageView } from 'src/components/pages/Topics/View'
import { getResourcesConnectionQueryVariables } from 'src/components/Resource/helpers'
import { useResourcesConnectionQuery } from 'src/gql/generated'
import { ResourceViewProps } from '../interfaces'

type BlogViewProps = ResourceViewProps & {
  page: number
}

export const BlogView: React.FC<BlogViewProps> = ({ resource, page }) => {
  const response = useResourcesConnectionQuery({
    variables: getResourcesConnectionQueryVariables({
      page: page || 1,
      where: {
        blogId: resource.id,
      },
    }),
  })

  const resources = response.data?.resources ?? []
  const count = response.data?.resourcesCount ?? 0

  return (
    <>
      <ResourcesPageView resources={resources} count={count} page={page || 1} />
    </>
  )
}
