import { UserTechnologyStatus } from 'src/gql/generated'

/**
 * Возвращает перевод статуса
 */
export const getUserTechnologyStatusText = (
  status: UserTechnologyStatus,
): string => {
  switch (status) {
    case UserTechnologyStatus.ACTIVEUSE:
      return 'Активно использую'

    case UserTechnologyStatus.NOLONGERUSE:
      return 'Больше не использую'

    case UserTechnologyStatus.PLANTOSTUDY:
      return 'Планирую изучать'

    case UserTechnologyStatus.RARELYUSE:
      return 'Иногда использую'

    case UserTechnologyStatus.REFUSEDTOSTUDY:
      return 'Отказался изучать'

    case UserTechnologyStatus.STUDY:
      return 'Изучаю'

    default:
      return ''
  }
}
