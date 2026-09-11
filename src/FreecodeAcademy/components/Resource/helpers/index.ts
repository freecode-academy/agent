import { ResourcesConnectionQueryVariables, SortOrder } from 'src/gql/generated'

type getResourcesConnectionQueryVariablesProps =
  Partial<ResourcesConnectionQueryVariables> & {
    page: number
    first?: number
  }

export function getResourcesConnectionQueryVariables({
  page,
  first = 10,
  ...other
}: getResourcesConnectionQueryVariablesProps): ResourcesConnectionQueryVariables {
  return {
    skip: (page - 1) * first,
    first,
    orderBy: {
      createdAt: SortOrder.DESC,
    },
    ...other,
  }
}
