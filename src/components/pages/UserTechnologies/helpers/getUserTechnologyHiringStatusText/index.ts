import { UserTechnologyHiringStatus } from 'src/gql/generated'

/**
 * Возвращает перевод статуса заинтересованности в трудоустройстве
 */
export const getUserTechnologyHiringStatusText = (
  status: UserTechnologyHiringStatus,
): string => {
  switch (status) {
    case UserTechnologyHiringStatus.ACTIVE:
      return 'Очень заинтересован'

    case UserTechnologyHiringStatus.NEGATIVE:
      return 'Не заинтересован'

    case UserTechnologyHiringStatus.NEUTRAL:
      return 'Не против'

    default:
      return ''
  }
}
