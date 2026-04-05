import { LearnStrategyFragment, MeUserFragment } from 'src/gql/generated'

export type LearnStrategyViewProps = {
  /**
   * Флаг того, что это корневой компонент
   */
  isRoot: boolean

  // learnStrategy: LearnStrategyFragment

  // ID запрашиваемого объекта
  id: LearnStrategyFragment['id']

  // Массив загруженных элементов, чтобы исключить дублирование объектов
  loadedIDs: LearnStrategyFragment['id'][]

  currentUser: MeUserFragment | null | undefined

  /**
   * Выводить ли дочерние. В режиме редактирования лучше не надо
   */
  showChilds: boolean

  /**
   * Можно ли редактировать (Сейчас запрещается дочерние)
   */
  editable: boolean
}
