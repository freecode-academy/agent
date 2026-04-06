import { UserTechnologyHiringStatus as UserTechnologyHiringStatusEnum } from 'src/gql/generated'
import { UserTechnologyHiringStatusStyled } from './styles'

type UserTechnologyHiringStatusProps = {
  status: UserTechnologyHiringStatusEnum | null | undefined
}

const statusConfig: Record<
  UserTechnologyHiringStatusEnum,
  { label: string; color: string; bgColor: string }
> = {
  [UserTechnologyHiringStatusEnum.ACTIVE]: {
    label: 'Open to Work',
    color: '#166534',
    bgColor: '#dcfce7',
  },
  [UserTechnologyHiringStatusEnum.NEUTRAL]: {
    label: 'Neutral',
    color: '#6b7280',
    bgColor: '#f3f4f6',
  },
  [UserTechnologyHiringStatusEnum.NEGATIVE]: {
    label: 'Not Looking',
    color: '#991b1b',
    bgColor: '#fee2e2',
  },
}

export const UserTechnologyHiringStatus: React.FC<
  UserTechnologyHiringStatusProps
> = ({ status }) => {
  if (!status) {
    return null
  }

  const config = statusConfig[status]

  return (
    <UserTechnologyHiringStatusStyled
      $color={config.color}
      $bgColor={config.bgColor}
    >
      {config.label}
    </UserTechnologyHiringStatusStyled>
  )
}
