import React, { useCallback, useMemo, useState } from 'react'
import { TeamViewProps } from './interfaces'
import { TeamViewStyled } from './styles'
import { TeamForm } from '../Form'
import { useAppContext } from 'src/components/AppContext'
import { Button } from 'src/ui-kit/Button'
import { ComponentSize } from 'src/ui-kit/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { Markdown } from 'src/components/Markdown'
import { TeamMembers } from './TeamMembers'

export const TeamView: React.FC<TeamViewProps> = ({ team }) => {
  const context = useAppContext()

  const { user: currentUser } = context

  const canEdit = useMemo(() => {
    return currentUser?.sudo === true
  }, [currentUser?.sudo])

  const [editFormOpened, editFormOpenedSetter] = useState(false)

  const editFormOpenedToggle = useCallback(() => {
    editFormOpenedSetter(!editFormOpened)
  }, [editFormOpened])

  const buttons = useMemo(() => {
    const buttons: React.ReactNode[] = []

    if (canEdit) {
      buttons.push(
        <Button
          key="edit"
          size={ComponentSize.SM}
          onClick={editFormOpenedToggle}
        >
          {editFormOpened ? 'Закрыть' : 'Редактировать'}
        </Button>,
      )
    }

    if (!buttons.length) {
      return null
    }

    return <div>{buttons}</div>
  }, [canEdit, editFormOpened, editFormOpenedToggle])

  return (
    <>
      <SeoHeaders
        title={team.name || ''}
        // description={
        //   team.description ||
        //   `${team.name} — find experts, learning resources, and community insights.`
        // }
      />

      <TeamViewStyled>
        {buttons}

        {editFormOpened ? (
          <TeamForm team={team} cancelHandler={editFormOpenedToggle} />
        ) : (
          <>
            <h1>{team.name}</h1>

            <Markdown>{team.content}</Markdown>
          </>
        )}

        <TeamMembers team={team} currentUser={currentUser} />
      </TeamViewStyled>
    </>
  )
}
