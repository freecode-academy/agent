import React, { useCallback, useMemo } from 'react'
import { TeamMembersStyled } from './styles'
import { Button } from 'src/ui-kit/Button'
import { ComponentSize, ComponentVariant } from 'src/ui-kit/interfaces'
import {
  MeUserFragment,
  TeamFragment,
  TeamMemberStatus,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
} from 'src/gql/generated'
import { useSnackbar } from 'src/ui-kit/Snackbar'
import { useApolloClient } from '@apollo/client/react'
import {
  UsersViewCardStyled,
  UsersViewCardToolbarStyled,
  UsersViewGridStyled,
} from '../../../../Users/View/styles'
import { UserLink } from 'src/components/Link/User'
import { SeparatorStyled } from 'src/components/Separator/styles'
import { FormattedDate } from 'src/ui-kit/format/FormattedDate'
import { StatusToggler } from '../../../../Users/User/View/StatusToggler'
import { Markdown } from 'src/components/Markdown'

type TeamMembersProps = {
  team: TeamFragment
  currentUser: MeUserFragment | null | undefined
}

export const TeamMembers: React.FC<TeamMembersProps> = ({
  team,
  currentUser,
}) => {
  const { addMessage } = useSnackbar() || {}
  const client = useApolloClient()

  const [creatMutation, { loading }] = useCreateTeamMemberMutation()

  const createTeamMemberApply = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()

      creatMutation({
        variables: {
          data: {
            team: {
              id: team.id,
            },
          },
        },
      })
        .then((r) => {
          if (r.data?.response) {
            addMessage?.('Success', {
              variant: 'success',
            })

            client.resetStore().catch(console.error)
          } else {
            addMessage?.('Unexpected error', { variant: 'error' })
          }
        })
        .catch((error: Error) => {
          console.error(error)
          addMessage?.(error.message || 'Unexpected error', {
            variant: 'error',
          })
        })
    },
    [addMessage, client, creatMutation, team.id],
  )

  const buttons = useMemo(() => {
    const buttons: React.ReactNode[] = []

    if (
      !(currentUser && team.createdById === currentUser.id) &&
      team.Members?.findIndex((n) => n.userId === currentUser?.id) === -1
    ) {
      buttons.push(
        <Button
          key="member"
          size={ComponentSize.SM}
          onClick={createTeamMemberApply}
          disabled={loading}
        >
          Join team
        </Button>,
      )
    }

    return <div>{buttons}</div>
  }, [
    createTeamMemberApply,
    currentUser,
    loading,
    team.Members,
    team.createdById,
  ])

  const [updateMutation, { loading: updateLoading }] =
    useUpdateTeamMemberMutation()

  const updateTeammemberStatus = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()

      const status = event.currentTarget.value
      const id = event.currentTarget.dataset.id

      try {
        if (!id) {
          throw new Error('Can not get id')
        }

        await updateMutation({
          variables: {
            where: {
              id,
            },
            data: {
              status: status as TeamMemberStatus,
            },
          },
        })
      } catch (e) {
        const error = e as Error

        addMessage?.(error.message, {
          variant: 'error',
        })
      }
    },
    [addMessage, updateMutation],
  )

  return (
    <TeamMembersStyled>
      {buttons}

      {team.Members && team.Members.length > 0 && (
        <UsersViewGridStyled>
          {team.Members.map((n) => {
            const { User: user, status } = n

            if (!user) {
              return
            }

            if (
              status !== TeamMemberStatus.ACTIVE &&
              !(
                n.userId === currentUser?.id ||
                n.createdById === currentUser?.id ||
                team.createdById === currentUser?.id
              )
            ) {
              return
            }

            const statusBadge = (
              <Button
                disabled
                variant={
                  [TeamMemberStatus.FIRED, TeamMemberStatus.REJECTED].includes(
                    status,
                  )
                    ? ComponentVariant.DANGER
                    : status === TeamMemberStatus.ACTIVE
                      ? ComponentVariant.SUCCESS
                      : status === TeamMemberStatus.APPLIED
                        ? ComponentVariant.WARNING
                        : undefined
                }
              >
                {status}
              </Button>
            )

            return (
              <UsersViewCardStyled key={user.id}>
                <UsersViewCardToolbarStyled>
                  <UserLink user={user} />

                  <SeparatorStyled />

                  <FormattedDate value={n.createdAt} />
                  <StatusToggler user={user} />

                  {team.createdById === currentUser?.id ? (
                    <>
                      {status === TeamMemberStatus.APPLIED ? (
                        <>
                          <Button
                            variant={ComponentVariant.SUCCESS}
                            data-id={n.id}
                            value={TeamMemberStatus.ACTIVE}
                            disabled={updateLoading}
                            onClick={updateTeammemberStatus}
                          >
                            Accept
                          </Button>
                          <Button
                            variant={ComponentVariant.DANGER}
                            data-id={n.id}
                            value={TeamMemberStatus.REJECTED}
                            disabled={updateLoading}
                            onClick={updateTeammemberStatus}
                          >
                            Reject
                          </Button>
                        </>
                      ) : (
                        statusBadge
                      )}
                    </>
                  ) : user.id === currentUser?.id ? (
                    <>{statusBadge}</>
                  ) : undefined}
                </UsersViewCardToolbarStyled>

                {user.intro && <Markdown>{user.intro}</Markdown>}
              </UsersViewCardStyled>
            )
          })}
        </UsersViewGridStyled>
      )}
    </TeamMembersStyled>
  )
}
