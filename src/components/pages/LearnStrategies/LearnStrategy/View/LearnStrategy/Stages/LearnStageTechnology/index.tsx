import React, { useCallback, useMemo } from 'react'
import { useDeleteLearnStrategyStageMutation } from 'src/gql/generated'
import TechnologyLink from 'src/components/Link/Technology'
import { LearnStageTechnologyProps } from './interfaces'
import {
  LearnStageTechnologyStyled,
  TechnologyName,
  TechnologyLevel,
} from './styles'
import { LevelIcon } from 'src/components/LevelIcon'
import { Button } from 'src/ui-kit/Button'
import { ComponentSize } from 'src/ui-kit/interfaces'

/**
 * Этап стретегии развития - Технология
 */
export const LearnStageTechnology: React.FC<LearnStageTechnologyProps> = ({
  learnStrategyStage,
  learnStrategy,
  technology,
  currentUser,
  inEditMode,
}) => {
  const currentUserUserTechnology = useMemo(() => {
    return currentUser?.UserTechnologies?.find(
      (n) => n.technologyId === technology.id,
    )
  }, [technology.id, currentUser?.UserTechnologies])

  const canEdit = useMemo<boolean>(() => {
    return currentUser && currentUser.id === learnStrategy.createdById
      ? true
      : false
  }, [learnStrategy.createdById, currentUser])

  /**
   * Удаление этапа
   */

  const [deleteMutation, deleteState] = useDeleteLearnStrategyStageMutation()

  const deleteStage = useCallback(() => {
    if (deleteState.loading) {
      return
    }

    if (global.window.confirm('Удалить этот этап?')) {
      deleteMutation({
        variables: {
          where: {
            id: learnStrategyStage.id,
          },
        },
      }).then(async (r) => {
        if (r.data?.deleteLearnStrategyStage) {
          try {
            await deleteState.client.resetStore()
          } catch (error) {
            console.error(error)
          }
        }
      })
    }
  }, [
    deleteMutation,
    deleteState.client,
    deleteState.loading,
    learnStrategyStage.id,
  ])

  const buttons = useMemo(() => {
    if (!inEditMode || !canEdit) {
      return null
    }

    return (
      <Button key="delete" size={ComponentSize.SM} onClick={deleteStage}>
        Удалить
      </Button>
    )
  }, [canEdit, deleteStage, inEditMode])

  const levelTitle = useMemo(() => {
    const requiredLevel = learnStrategyStage.level || 0
    const userLevel = currentUserUserTechnology?.level || 0
    if (userLevel >= requiredLevel) {
      return `Требуется: ${requiredLevel}, ваш: ${userLevel} (достаточный)`
    }
    if (userLevel > 0) {
      return `Требуется: ${requiredLevel}, ваш: ${userLevel} (недостаточный)`
    }
    return `Требуется: ${requiredLevel}, ваш уровень не указан`
  }, [learnStrategyStage.level, currentUserUserTechnology?.level])

  return useMemo(() => {
    const requiredLevel = learnStrategyStage.level || 0
    const userLevel = currentUserUserTechnology?.level ?? 0

    return (
      <LearnStageTechnologyStyled>
        <TechnologyLevel title={levelTitle}>
          <LevelIcon level={requiredLevel} userLevel={userLevel} />
        </TechnologyLevel>
        <TechnologyName>
          <TechnologyLink object={technology}>{technology.name}</TechnologyLink>
        </TechnologyName>
        <div className="flex-1" />
        {buttons}
      </LearnStageTechnologyStyled>
    )
  }, [
    learnStrategyStage.level,
    currentUserUserTechnology?.level,
    levelTitle,
    technology,
    buttons,
  ])
}
