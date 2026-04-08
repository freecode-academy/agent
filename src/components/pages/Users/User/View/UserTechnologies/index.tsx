import {
  MeDocument,
  TechnologyNoNestingFragment,
  useCreateUserTechnologyMutation,
  useDeleteUserTechnologyMutation,
  useUpdateUserTechnologyMutation,
  UserFragment,
  UserTechnologyFragment,
  UserTechnologyHiringStatus,
  UserTechnologyStatus,
  UserTechnologyUpdateInput,
  useTechnologiesQuery,
} from 'src/gql/generated'
import {
  UserTechnologiesRowHeaderStyled,
  UserTechnologiesStyled,
  UserTechnologiesGridStyled,
  UserTechnologiesCellStyled,
  UserTechnologiesButtonsStyled,
} from './styles'
import { useCallback, useMemo } from 'react'
import { useBoolean } from 'src/hooks/useBoolean'
import { Button } from 'src/ui-kit/Button'
import { ComponentVariant } from 'src/ui-kit/interfaces'
import { UserTechnologiesRow } from './UserTechnologiesRow'

type UserTechnologiesProps = {
  userTechnologies: NonNullable<UserFragment['UserTechnologies']>
  isCurrentUser: boolean
}

export const UserTechnologies: React.FC<UserTechnologiesProps> = ({
  userTechnologies,
  isCurrentUser,
}) => {
  const [inEditMode, startEdit, stopEdit] = useBoolean()

  const technologiesResponse = useTechnologiesQuery({
    skip: !inEditMode,
    ssr: false,
  })

  const [createUserTechnologyMutation] = useCreateUserTechnologyMutation({
    refetchQueries: [MeDocument],
  })

  const [deleteUserTechnologyMutation] = useDeleteUserTechnologyMutation({
    refetchQueries: [MeDocument],
  })

  const [updateUserTechnologyMutation] = useUpdateUserTechnologyMutation({
    refetchQueries: [MeDocument],
  })

  const onClickConnectTechnology = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()

      const technologyId = event.currentTarget.value

      createUserTechnologyMutation({
        variables: {
          data: {
            technologyId,
          },
        },
      })
    },
    [createUserTechnologyMutation],
  )

  const onClickDisconnectTechnology = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()

      const userTechnologyId = event.currentTarget.value

      deleteUserTechnologyMutation({
        variables: {
          where: {
            id: userTechnologyId,
          },
        },
      })
    },
    [deleteUserTechnologyMutation],
  )

  const onUpdateUserTechnology = useCallback(
    (userTechnologyId: string, data: UserTechnologyUpdateInput) => {
      updateUserTechnologyMutation({
        variables: {
          where: {
            id: userTechnologyId,
          },
          data,
        },
      })
    },
    [updateUserTechnologyMutation],
  )

  const onChangeField = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.currentTarget
      const userTechnologyId = event.currentTarget.dataset.id

      if (!userTechnologyId) {
        return
      }

      let data: UserTechnologyUpdateInput = {}

      if (name === 'level') {
        data = { level: parseInt(value, 10) }
      } else if (name === 'status') {
        data = { status: value as UserTechnologyStatus }
      } else if (name === 'hiring_status') {
        data = {
          hiring_status: value ? (value as UserTechnologyHiringStatus) : null,
        }
      }

      onUpdateUserTechnology(userTechnologyId, data)
    },
    [onUpdateUserTechnology],
  )

  const technologies = useMemo(
    () => technologiesResponse.data?.technologies ?? [],
    [technologiesResponse.data?.technologies],
  )

  const technologyItems = useMemo(() => {
    const items: Array<{
      technology: TechnologyNoNestingFragment
      userTechnology: UserTechnologyFragment | null | undefined
    }> = []

    if (inEditMode) {
      for (const tech of technologies) {
        const userTech = userTechnologies.find(
          (ut) => ut.Technology?.id === tech.id,
        )
        items.push({ technology: tech, userTechnology: userTech })
      }
    } else {
      for (const ut of userTechnologies) {
        if (ut.Technology) {
          items.push({ technology: ut.Technology, userTechnology: ut })
        }
      }
    }

    return items.sort(
      (a, b) =>
        (a.technology.name?.toLocaleLowerCase().charCodeAt(0) ?? 0) -
        (b.technology.name?.toLocaleLowerCase().charCodeAt(0) ?? 0),
    )
  }, [inEditMode, technologies, userTechnologies])

  if (!userTechnologies.length && !isCurrentUser) {
    return null
  }

  return (
    <UserTechnologiesStyled>
      <UserTechnologiesGridStyled>
        <UserTechnologiesRowHeaderStyled>
          <UserTechnologiesCellStyled>Technology</UserTechnologiesCellStyled>
          <UserTechnologiesCellStyled>Level</UserTechnologiesCellStyled>
          <UserTechnologiesCellStyled>Period</UserTechnologiesCellStyled>
          <UserTechnologiesCellStyled>Status</UserTechnologiesCellStyled>
          <UserTechnologiesCellStyled>Hiring</UserTechnologiesCellStyled>
          <UserTechnologiesCellStyled></UserTechnologiesCellStyled>
        </UserTechnologiesRowHeaderStyled>

        {technologyItems.map((n) => (
          <UserTechnologiesRow
            key={`${n.technology.id}-${n.userTechnology?.id}`}
            item={n}
            inEditMode={inEditMode}
            onClickConnectTechnology={onClickConnectTechnology}
            onClickDisconnectTechnology={onClickDisconnectTechnology}
            onChangeField={onChangeField}
          />
        ))}
      </UserTechnologiesGridStyled>

      {isCurrentUser && (
        <>
          <UserTechnologiesButtonsStyled>
            <Button
              onClick={inEditMode ? stopEdit : startEdit}
              variant={ComponentVariant.PRIMARY}
            >
              {inEditMode ? 'Cancel' : 'Edit technologies'}
            </Button>
          </UserTechnologiesButtonsStyled>
        </>
      )}
    </UserTechnologiesStyled>
  )
}
