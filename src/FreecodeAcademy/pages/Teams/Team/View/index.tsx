import React, { useCallback, useMemo, useState } from 'react'
import { TeamViewProps } from './interfaces'
import { TeamViewStyled } from './styles'
import { TeamForm } from '../Form'
import { useAppContext } from 'src/components/AppContext'
import { Button } from 'src/ui-kit/Button'
import { ComponentSize } from 'src/ui-kit/interfaces'
import { Markdown } from 'src/components/Markdown'
import { TeamMembers } from './TeamMembers'
import { getResizedImagePath } from 'src/helpers/getResizedImagePath'

export const TeamView: React.FC<TeamViewProps> = ({ team }) => {
  const context = useAppContext()

  const { user: currentUser } = context

  const { image } = team

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
      <TeamViewStyled>
        {buttons}

        {editFormOpened ? (
          <TeamForm team={team} cancelHandler={editFormOpenedToggle} />
        ) : (
          <>
            <h1>{team.title}</h1>

            {image && (
              <div>
                <img
                  src={getResizedImagePath({
                    path: image,
                    size: 'middle',
                  })}
                  alt={team.title}
                />
              </div>
            )}

            <Markdown>{team.content}</Markdown>
          </>
        )}

        <TeamMembers team={team} currentUser={currentUser} />
      </TeamViewStyled>
    </>
  )
}
