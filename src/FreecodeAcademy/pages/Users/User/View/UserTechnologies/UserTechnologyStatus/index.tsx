import { UserTechnologyStatus as UserTechnologyStatusEnum } from 'src/gql/generated'
import { UserTechnologyStatusStyled } from './styles'

type UserTechnologyStatusProps = {
  status: UserTechnologyStatusEnum | null | undefined
}

const statusConfig: Record<
  UserTechnologyStatusEnum,
  { label: string; color: string; bgColor: string }
> = {
  [UserTechnologyStatusEnum.ACTIVEUSE]: {
    label: 'Active Use',
    color: '#166534',
    bgColor: '#dcfce7',
  },
  [UserTechnologyStatusEnum.STUDY]: {
    label: 'Studying',
    color: '#1e40af',
    bgColor: '#dbeafe',
  },
  [UserTechnologyStatusEnum.PLANTOSTUDY]: {
    label: 'Plan to Study',
    color: '#6b21a8',
    bgColor: '#f3e8ff',
  },
  [UserTechnologyStatusEnum.RARELYUSE]: {
    label: 'Rarely Use',
    color: '#92400e',
    bgColor: '#fef3c7',
  },
  [UserTechnologyStatusEnum.NOLONGERUSE]: {
    label: 'No Longer Use',
    color: '#6b7280',
    bgColor: '#f3f4f6',
  },
  [UserTechnologyStatusEnum.REFUSEDTOSTUDY]: {
    label: 'Refused',
    color: '#991b1b',
    bgColor: '#fee2e2',
  },
}

export const UserTechnologyStatus: React.FC<UserTechnologyStatusProps> = ({
  status,
}) => {
  if (!status) {
    return null
  }

  const config = statusConfig[status]

  return (
    <UserTechnologyStatusStyled $color={config.color} $bgColor={config.bgColor}>
      {config.label}
    </UserTechnologyStatusStyled>
  )
}
