import { ResourceFragment } from 'src/gql/generated'

export type ResourcesPageViewProps = {
  resources: ResourceFragment[]
  count: number
  page: number
}
