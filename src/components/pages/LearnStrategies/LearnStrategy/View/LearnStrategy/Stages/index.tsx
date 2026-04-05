import React, { useMemo } from 'react'
import { LearnStrategyView } from '..'
import { LearnStageTechnology } from './LearnStageTechnology'
import { LearnStrategyViewStagesProps } from './interfaces'
import { CreateLearnStrategyStage } from './Create'

export const LearnStrategyViewStages: React.FC<
  LearnStrategyViewStagesProps
> = ({ learnStrategy, loadedIDsWithCurrent, currentUser, inEditMode }) => {
  /**
   * Технологии
   */
  const technologies = useMemo(() => {
    const items: React.ReactNode[] = []

    learnStrategy?.LearnStrategyStages?.forEach((learnStrategyStage) => {
      if (learnStrategyStage.Technology) {
        items.push(
          <LearnStageTechnology
            key={learnStrategyStage.id}
            learnStrategyStage={learnStrategyStage}
            technology={learnStrategyStage.Technology}
            currentUser={currentUser}
            inEditMode={inEditMode}
            learnStrategy={learnStrategy}
          />,
        )
      }
    })

    return items
  }, [inEditMode, learnStrategy, currentUser])

  /**
   * Дочерние стратегии
   */
  const subStrategies = useMemo(() => {
    const subStrategies: React.ReactNode[] = []

    learnStrategy?.LearnStrategyStages?.forEach((n) => {
      if (n.learnStrategyTargetId) {
        subStrategies.push(
          <LearnStrategyView
            key={n.id}
            isRoot={false}
            id={n.learnStrategyTargetId}
            loadedIDs={loadedIDsWithCurrent}
            currentUser={currentUser}
            showChilds={!inEditMode}
            editable={false}
          />,
        )
      }
    })

    return subStrategies
  }, [
    inEditMode,
    learnStrategy?.LearnStrategyStages,
    loadedIDsWithCurrent,
    currentUser,
  ])

  /**
   * Создание этапа развития
   */
  const createForm = useMemo(() => {
    if (!inEditMode) {
      return null
    }

    return <CreateLearnStrategyStage learnStrategy={learnStrategy} />
  }, [inEditMode, learnStrategy])

  return useMemo(() => {
    return (
      <>
        {technologies}
        {subStrategies}
        {createForm}
      </>
    )
  }, [createForm, subStrategies, technologies])
}
