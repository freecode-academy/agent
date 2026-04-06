import { UserFragment } from 'src/gql/generated'
import {
  UserTechnologiesCellStyled,
  UserTechnologiesRowHeaderStyled,
  UserTechnologiesRowStyled,
  UserTechnologiesStyled,
  UserTechnologiesLevelStyled,
  UserTechnologiesDateRangeStyled,
  UserTechnologiesTechNameStyled,
  UserTechnologiesLabelStyled,
} from './styles'
import { FormattedDate } from 'src/ui-kit/format/FormattedDate'
import { UserTechnologyStatus } from './UserTechnologyStatus'
import { UserTechnologyHiringStatus } from './UserTechnologyHiringStatus'
import TechnologyLink from 'src/components/Link/Technology'
import { useMemo } from 'react'

type UserTechnologiesProps = {
  userTechnologies: NonNullable<UserFragment['UserTechnologies']>
}

export const UserTechnologies: React.FC<UserTechnologiesProps> = ({
  userTechnologies: userTechnologiesProps,
}) => {
  const userTechnologies = useMemo(() => {
    return [...userTechnologiesProps].sort(
      (a, b) =>
        (a.Technology?.name?.toLocaleLowerCase().charCodeAt(0) ?? 0) -
        (b.Technology?.name?.toLocaleLowerCase().charCodeAt(0) ?? 0),
    )
  }, [userTechnologiesProps])

  return (
    <UserTechnologiesStyled>
      <UserTechnologiesRowHeaderStyled>
        <UserTechnologiesCellStyled>Technology</UserTechnologiesCellStyled>
        <UserTechnologiesCellStyled>Level</UserTechnologiesCellStyled>
        <UserTechnologiesCellStyled>Period</UserTechnologiesCellStyled>
        <UserTechnologiesCellStyled>Status</UserTechnologiesCellStyled>
      </UserTechnologiesRowHeaderStyled>

      {userTechnologies.map((n) => (
        <UserTechnologiesRowStyled key={n.id}>
          <UserTechnologiesCellStyled>
            <UserTechnologiesTechNameStyled>
              <TechnologyLink object={n.Technology} />
            </UserTechnologiesTechNameStyled>
          </UserTechnologiesCellStyled>

          <UserTechnologiesCellStyled>
            <UserTechnologiesLabelStyled>Level:</UserTechnologiesLabelStyled>
            <UserTechnologiesLevelStyled $level={n.level ?? 0}>
              {n.level ?? '—'}
            </UserTechnologiesLevelStyled>
          </UserTechnologiesCellStyled>

          <UserTechnologiesCellStyled>
            <UserTechnologiesLabelStyled>Period:</UserTechnologiesLabelStyled>
            <UserTechnologiesDateRangeStyled>
              {n.date_from ? <FormattedDate value={n.date_from} /> : '—'}
              <span>→</span>
              {n.date_till ? <FormattedDate value={n.date_till} /> : 'Present'}
            </UserTechnologiesDateRangeStyled>
          </UserTechnologiesCellStyled>

          <UserTechnologiesCellStyled>
            <UserTechnologyStatus status={n.status} />
            <UserTechnologyHiringStatus status={n.hiring_status} />
          </UserTechnologiesCellStyled>
        </UserTechnologiesRowStyled>
      ))}
    </UserTechnologiesStyled>
  )
}
