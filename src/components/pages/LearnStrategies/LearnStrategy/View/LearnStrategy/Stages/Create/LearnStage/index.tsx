import React, { useCallback, useMemo } from 'react'

import {
  LearnStrategyNoNestingFragment,
  // SortOrder,
  useLearnStrategiesQuery,
} from 'src/gql/generated'
import { UserLink as UikitUserLink } from 'src/components/Link/User'
import { CreateLearnStrategyStageLearnStrategyProps } from './interfaces'
import { Button } from 'src/ui-kit/Button'
import { ComponentSize, ComponentVariant } from 'src/ui-kit/interfaces'

/**
 * Выбор стратегии развития
 */
export const CreateLearnStrategyStageLearnStrategy: React.FC<
  CreateLearnStrategyStageLearnStrategyProps
> = ({ variables, variablesSetter, submit, inRequest, learnStrategy }) => {
  const learnStrategiesResponse = useLearnStrategiesQuery({
    variables: {
      // orderBy: {
      //   name: SortOrder.ASC,
      // },
    },
  })

  const currentLearnStrategy = useMemo<
    LearnStrategyNoNestingFragment | null | undefined
  >(() => {
    return variables.data.LearnStrategyTarget?.id
      ? learnStrategiesResponse.data?.learnStrategies?.find(
          (n) => n.id === variables.data.LearnStrategyTarget?.id,
        )
      : null
  }, [
    learnStrategiesResponse.data?.learnStrategies,
    variables.data.LearnStrategyTarget?.id,
  ])

  const setLearnStrategy = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const value = event.currentTarget.value

      if (value) {
        const newVariables = { ...variables }

        newVariables.data = {
          ...newVariables.data,
          LearnStrategyTarget: {
            id: value,
          },
        }

        variablesSetter(newVariables)
      }
    },
    [variables, variablesSetter],
  )

  const valid = !!currentLearnStrategy

  /**
   * Получаем список только тех технологий, что не указаны в текущей стратегии
   */
  const learnStrategiesFiltered = useMemo(() => {
    return (
      learnStrategiesResponse.data?.learnStrategies?.filter(
        (n) =>
          learnStrategy.LearnStrategyStages?.findIndex(
            (ls) => ls.learnStrategyId === n.id,
          ) === -1,
      ) || []
    )
  }, [
    learnStrategy.LearnStrategyStages,
    learnStrategiesResponse.data?.learnStrategies,
  ])

  return useMemo(() => {
    return (
      <>
        <div className="list">
          {learnStrategiesFiltered.map((n) => {
            const isCurrent = currentLearnStrategy?.id === n.id

            return (
              <div key={n.id}>
                <Button
                  size={ComponentSize.SM}
                  variant={isCurrent ? ComponentVariant.SUCCESS : undefined}
                  value={n.id}
                  onClick={setLearnStrategy}
                >
                  {n.name}
                </Button>
                {n.CreatedBy ? (
                  <UikitUserLink user={n.CreatedBy} showName={false} />
                ) : null}
              </div>
            )
          })}
        </div>

        <Button
          onClick={submit}
          disabled={!valid || inRequest}
          variant={valid ? ComponentVariant.SUCCESS : undefined}
        >
          Сохранить
        </Button>
      </>
    )
  }, [
    currentLearnStrategy?.id,
    inRequest,
    learnStrategiesFiltered,
    setLearnStrategy,
    submit,
    valid,
  ])
}
