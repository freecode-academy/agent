import {
  MeUserFragment,
  TechnologyNoNestingFragment,
  TechnologyUserTechnologyFragment,
} from 'src/gql/generated'

export type UserTechnologyRowProps = {
  userTechnology: TechnologyUserTechnologyFragment

  currentUser: MeUserFragment | null | undefined

  showActions: boolean

  /**
   * Выводить ли технологию
   */
  showTechnology: boolean
  technology?: TechnologyNoNestingFragment | null

  /**
   * Показывать ли колонку владельца.
   * На странице пользователя эта колонка не выводится.
   */
  showCreateBy: boolean
}
