import React, { useCallback, useMemo, useState } from 'react'
import { TeamViewProps } from './interfaces'
import { TeamViewStyled } from './styles'
import { TeamForm } from '../Form'
import { useAppContext } from 'src/components/AppContext'
import { Button } from 'src/ui-kit/Button'
import { ComponentSize } from 'src/ui-kit/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { Markdown } from 'src/components/Markdown'

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

  const editButton = useMemo(() => {
    if (!canEdit) {
      return null
    }

    return (
      <div>
        <Button size={ComponentSize.SM} onClick={editFormOpenedToggle}>
          {editFormOpened ? 'Закрыть' : 'Редактировать'}
        </Button>
      </div>
    )
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
        {editButton}

        {editFormOpened ? (
          <TeamForm team={team} cancelHandler={editFormOpenedToggle} />
        ) : (
          <>
            <h1>{team.name}</h1>

            <Markdown>{team.content}</Markdown>
          </>
        )}
      </TeamViewStyled>
    </>
  )
}
