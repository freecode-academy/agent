import {
  TechnologyNoNestingFragment,
  UserTechnologyFragment,
  UserTechnologyHiringStatus as UserTechnologyHiringStatusEnum,
  UserTechnologyStatus as UserTechnologyStatusEnum,
} from 'src/gql/generated'
import {
  UserTechnologiesDateRangeStyled,
  UserTechnologiesLabelStyled,
  UserTechnologiesLevelStyled,
  UserTechnologiesRowStyled,
  UserTechnologiesTechNameStyled,
} from './styles'
import TechnologyLink from 'src/components/Link/Technology'
import { FormattedDate } from 'src/ui-kit/format/FormattedDate'
import { UserTechnologyStatus } from '../UserTechnologyStatus'
import { UserTechnologyHiringStatus } from '../UserTechnologyHiringStatus'
import { UserTechnologiesCellStyled } from '../styles'
import { Button } from 'src/ui-kit/Button'
import { ComponentSize, ComponentVariant } from 'src/ui-kit/interfaces'
import { Select } from 'src/ui-kit/controls/Select'
import { useLexicon } from 'src/Custom/Lexicon'
import { userTechnologiesRowLexicon } from './lexicon'

const LEVEL_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
]

const STATUS_OPTIONS = Object.values(UserTechnologyStatusEnum).map(
  (status) => ({
    value: status,
    label: status,
  }),
)

const HIRING_STATUS_OPTIONS = [
  { value: '', label: '—' },
  ...Object.values(UserTechnologyHiringStatusEnum).map((status) => ({
    value: status,
    label: status,
  })),
]

export type UserTechnologyItem = {
  technology: TechnologyNoNestingFragment
  userTechnology: UserTechnologyFragment | null | undefined
}

type UserTechnologiesRowProps = {
  item: UserTechnologyItem
  inEditMode: boolean
  onClickConnectTechnology: (event: React.MouseEvent<HTMLButtonElement>) => void
  onClickDisconnectTechnology: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void
  onChangeField: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const UserTechnologiesRow: React.FC<UserTechnologiesRowProps> = ({
  item,
  inEditMode,
  onClickConnectTechnology,
  onClickDisconnectTechnology,
  onChangeField,
}) => {
  const { t } = useLexicon(userTechnologiesRowLexicon)
  const { technology, userTechnology } = item

  return (
    <UserTechnologiesRowStyled key={technology.id}>
      <UserTechnologiesCellStyled>
        <UserTechnologiesTechNameStyled>
          <TechnologyLink object={technology} />
        </UserTechnologiesTechNameStyled>
      </UserTechnologiesCellStyled>

      <UserTechnologiesCellStyled>
        <UserTechnologiesLabelStyled>
          {t('userTechnologiesRow.labels.level')}
        </UserTechnologiesLabelStyled>
        {inEditMode && userTechnology ? (
          <Select
            name="level"
            data-id={userTechnology.id}
            value={userTechnology.level?.toString() ?? ''}
            options={LEVEL_OPTIONS}
            onChange={onChangeField}
          />
        ) : (
          <UserTechnologiesLevelStyled $level={userTechnology?.level ?? 0}>
            {userTechnology?.level ?? '—'}
          </UserTechnologiesLevelStyled>
        )}
      </UserTechnologiesCellStyled>

      <UserTechnologiesCellStyled>
        <UserTechnologiesLabelStyled>
          {t('userTechnologiesRow.labels.period')}
        </UserTechnologiesLabelStyled>
        <UserTechnologiesDateRangeStyled>
          {userTechnology?.date_from ? (
            <FormattedDate value={userTechnology.date_from} />
          ) : (
            '—'
          )}
          <span>→</span>
          {userTechnology?.date_till ? (
            <FormattedDate value={userTechnology.date_till} />
          ) : (
            t('userTechnologiesRow.present')
          )}
        </UserTechnologiesDateRangeStyled>
      </UserTechnologiesCellStyled>

      <UserTechnologiesCellStyled>
        {inEditMode && userTechnology ? (
          <Select
            name="status"
            data-id={userTechnology.id}
            value={userTechnology.status ?? ''}
            options={STATUS_OPTIONS}
            onChange={onChangeField}
          />
        ) : (
          <UserTechnologyStatus status={userTechnology?.status} />
        )}
      </UserTechnologiesCellStyled>

      <UserTechnologiesCellStyled>
        {inEditMode && userTechnology ? (
          <Select
            name="hiring_status"
            data-id={userTechnology.id}
            value={userTechnology.hiring_status ?? ''}
            options={HIRING_STATUS_OPTIONS}
            onChange={onChangeField}
          />
        ) : (
          <UserTechnologyHiringStatus status={userTechnology?.hiring_status} />
        )}
      </UserTechnologiesCellStyled>

      <UserTechnologiesCellStyled>
        {inEditMode && (
          <>
            {!userTechnology && (
              <Button
                variant={ComponentVariant.PRIMARY}
                size={ComponentSize.SM}
                onClick={onClickConnectTechnology}
                value={technology.id}
              >
                {t('userTechnologiesRow.buttons.connect')}
              </Button>
            )}
            {userTechnology && (
              <Button
                variant={ComponentVariant.DANGER}
                size={ComponentSize.SM}
                onClick={onClickDisconnectTechnology}
                value={userTechnology.id}
              >
                {t('userTechnologiesRow.buttons.disconnect')}
              </Button>
            )}
          </>
        )}
      </UserTechnologiesCellStyled>
    </UserTechnologiesRowStyled>
  )
}
