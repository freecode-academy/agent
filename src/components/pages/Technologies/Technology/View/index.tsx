import React, { useCallback, useMemo, useState } from 'react'
// import ReactDecliner from 'react-decliner'
import { TechnologyViewProps } from './interfaces'
import { TechnologyGridTableStyled, TechnologyViewStyled } from './styles'
import Link from 'next/link'
// import ConnectUserTechnology from './ConnectUserTechnology'
import {
  GridTableAttributeStyled,
  GridTableItemStyled,
  GridTableAttributesContainerStyled,
} from 'src/components/GridTable/styles'
import UserTechnologyRow from './UserTechnologyRow'
import { TechnologyForm } from '../Form'
import { TechnologyLearnStrategyStages } from './LearnStrategyStages'
import { useAppContext } from 'src/components/AppContext'
import { Button } from 'src/ui-kit/Button'
import { ComponentSize } from 'src/ui-kit/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { Markdown } from 'src/components/Markdown'

export const TechnologyView: React.FC<TechnologyViewProps> = ({
  technology,
}) => {
  const context = useAppContext()

  const { user: currentUser } = context

  const showActions = currentUser ? true : false

  const header = useMemo(() => {
    return (
      <GridTableItemStyled>
        {showActions ? <GridTableAttributeStyled /> : null}

        <GridTableAttributeStyled>Пользователь</GridTableAttributeStyled>

        <GridTableAttributeStyled>Уровень</GridTableAttributeStyled>

        <GridTableAttributeStyled>Статус</GridTableAttributeStyled>

        <GridTableAttributeStyled>Готовность к найму</GridTableAttributeStyled>

        <GridTableAttributeStyled>Менторство</GridTableAttributeStyled>

        <GridTableAttributesContainerStyled>
          <GridTableAttributeStyled>Используется С</GridTableAttributeStyled>

          <GridTableAttributeStyled>Используется До</GridTableAttributeStyled>
        </GridTableAttributesContainerStyled>
      </GridTableItemStyled>
    )
  }, [showActions])

  const items = technology.UserTechnologies?.map((n) => {
    return (
      <UserTechnologyRow
        key={n.id}
        userTechnology={n}
        currentUser={currentUser}
        showCreateBy={true}
        showTechnology={false}
        showActions={showActions}
      />
    )
  })

  // const content = useMemo(() => {
  //   const components = technology.components

  //   if (!components) {
  //     return null
  //   }

  //   return (
  //     <SiteFrontEditor
  //       // object={undefined}
  //       inEditMode={false}
  //       itemsOnly
  //       // onChangeState={onChangeState}
  //       object={components}
  //       className=""
  //     />
  //   )
  // }, [technology.components])

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

  /**
   * Примерное время освоения технологии
   */
  const learnTimes = useMemo(() => {
    const items: React.ReactNode[] = []

    // if(technology.level1hours)

    const levels: number[] = [1, 2, 3, 4, 5]

    levels.forEach((level) => {
      if (
        level !== 1 &&
        level !== 2 &&
        level !== 3 &&
        level !== 4 &&
        level !== 5
      ) {
        return
      }

      const time = technology[`level${level}hours`]

      if (time) {
        items.push(
          <div key={level}>
            Уровень {level}: {time} час
          </div>,
        )
      }
    })

    if (items.length) {
      return (
        <div>
          <div>
            <h3>Примерно время освоения</h3>
          </div>
          <div></div>

          {items}
        </div>
      )
    }
  }, [technology])

  return (
    <>
      <SeoHeaders
        title={technology.name || ''}
        description={
          technology.description ||
          `${technology.name} — find experts, learning resources, and community insights.`
        }
      />

      {editButton}

      {editFormOpened ? (
        <TechnologyForm
          technology={technology}
          cancelHandler={editFormOpenedToggle}
        />
      ) : null}

      <TechnologyViewStyled>
        <div>
          <div>
            <p>{technology.name}</p>
            {technology.description ? <p>{technology.name}</p> : null}
          </div>
          <div></div>

          {technology.site_url ? (
            <div>
              <Link href={technology.site_url} target="_blank">
                {technology.site_url}
              </Link>
            </div>
          ) : null}

          <Markdown>{technology.content}</Markdown>
        </div>

        {learnTimes}

        {technology.LearnStrategyStages ? (
          <TechnologyLearnStrategyStages
            LearnStrategyStages={technology.LearnStrategyStages}
          />
        ) : null}

        <div className="technology--used-by">
          <div>
            <div>
              <p>Кто использует</p>
            </div>
            <div>
              {/* <ConnectUserTechnology
                  technology={technology}
                  currentUser={context.user}
                /> */}
            </div>
          </div>

          <TechnologyGridTableStyled
            showActions={showActions}
            showCreateBy={true}
            showTechnology={false}
          >
            {header}
            {items}
          </TechnologyGridTableStyled>
        </div>
      </TechnologyViewStyled>
    </>
  )
}
