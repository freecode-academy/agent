import {
  ResourcesConnectionQueryVariables,
  ResourceWhereInput,
} from 'src/gql/generated'

type getResourcesConnectionQueryVariablesProps = {
  where?: Partial<ResourceWhereInput>
  page: number
  first?: number
}

export function getResourcesConnectionQueryVariables({
  where,
  page,
  first = 10,
}: getResourcesConnectionQueryVariablesProps): ResourcesConnectionQueryVariables {
  return {
    where: { ...where },
    skip: (page - 1) * first,
    first,
  }
}
