import { UserTechnology } from 'src/gql/generated'

export type UserTechnologyLevelProps = {
  inEditMode?: boolean
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: number | null,
  ) => void
  value?: UserTechnology['level'] | undefined
  error?: string | undefined
  name: string
}
