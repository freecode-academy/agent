import { UserTechnology } from 'src/gql/generated'

export type UserTechnologyStatusViewProps = {
  inEditMode?: boolean
  value: UserTechnology['status']
  error?: string | undefined
}
