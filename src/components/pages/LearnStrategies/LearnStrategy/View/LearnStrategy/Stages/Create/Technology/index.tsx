import React, { useCallback, useMemo } from 'react'

import {
  LearnStrategyStageCreateInput,
  // LearnStrategyStageCreateTechnologyInput,
  useTechnologiesQuery,
} from 'src/gql/generated'
import { CreateLearnStrategyStageTechnologyProps } from './interfaces'
import { Button } from 'src/ui-kit/Button'
import { TextField } from 'src/ui-kit/controls/TextField'
import { ComponentSize, ComponentVariant } from 'src/ui-kit/interfaces'
import { CreateLearnStrategyStageListStyled } from '../styles'

/**
 * Выбор технологии
 */
export const CreateLearnStrategyStageTechnology: React.FC<
  CreateLearnStrategyStageTechnologyProps
> = ({ variables, variablesSetter, submit, inRequest, learnStrategy }) => {
  const technologiesResponse = useTechnologiesQuery({
    variables: {
      // orderBy: {
      //   name: SortOrder.ASC,
      // },
    },
  })

  const currentTechnology = useMemo(() => {
    return variables.data.TechnologyTarget?.id
      ? technologiesResponse.data?.technologies?.find(
          (n) => n.id === variables.data.TechnologyTarget?.id,
        )
      : null
  }, [
    technologiesResponse.data?.technologies,
    variables.data.TechnologyTarget?.id,
  ])

  const setTechnology = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const value = event.currentTarget.value

      if (value) {
        const newVariables = { ...variables }

        newVariables.data = {
          ...newVariables.data,
          TechnologyTarget: {
            ...newVariables.data.TechnologyTarget,
            id: value,
            level: newVariables.data.TechnologyTarget?.level || 1,
          },
        }

        variablesSetter(newVariables)
      }
    },
    [variables, variablesSetter],
  )

  const onChangeLevel = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value

      if (value) {
        const newVariables = { ...variables }

        if (newVariables.data.TechnologyTarget) {
          newVariables.data.TechnologyTarget.level = parseInt(
            value,
          ) as NonNullable<
            LearnStrategyStageCreateInput['TechnologyTarget']
          >['level']

          variablesSetter(newVariables)
        }
      }
    },
    [variables, variablesSetter],
  )

  const valid = currentTechnology && variables.data.TechnologyTarget?.level

  /**
   * Получаем список только тех технологий, что не указаны в текущей стратегии
   */
  const technologiesFiltered = useMemo(() => {
    return (
      technologiesResponse.data?.technologies?.filter(
        (n) =>
          learnStrategy.LearnStrategyStages?.findIndex(
            (ls) => ls.technologyId === n.id,
          ) === -1,
      ) || []
    )
  }, [
    learnStrategy.LearnStrategyStages,
    technologiesResponse.data?.technologies,
  ])

  return useMemo(() => {
    return (
      <>
        <CreateLearnStrategyStageListStyled>
          {technologiesFiltered.map((n) => {
            const isCurrent = currentTechnology?.id === n.id

            return (
              <div key={n.id}>
                <Button
                  size={ComponentSize.SM}
                  variant={isCurrent ? ComponentVariant.SUCCESS : undefined}
                  value={n.id}
                  onClick={setTechnology}
                >
                  {n.name}
                </Button>

                {isCurrent ? (
                  <TextField
                    title="Уровень"
                    type="number"
                    value={variables.data.TechnologyTarget?.level || '1'}
                    // fullWidth
                    onChange={onChangeLevel}
                  />
                ) : null}
              </div>
            )
          })}
        </CreateLearnStrategyStageListStyled>

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
    technologiesFiltered,
    submit,
    valid,
    inRequest,
    currentTechnology?.id,
    setTechnology,
    variables.data.TechnologyTarget?.level,
    onChangeLevel,
  ])
}
