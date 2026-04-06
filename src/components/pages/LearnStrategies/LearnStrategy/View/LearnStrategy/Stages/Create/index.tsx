import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  CreateLearnStrategyStageMutationVariables,
  useCreateLearnStrategyStageMutation,
} from 'src/gql/generated'
import { CreateLearnStrategyStageProps } from './interfaces'
import { CreateLearnStrategyStageLearnStrategy } from './LearnStage'
import { CreateLearnStrategyStageStyled } from './styles'
import { CreateLearnStrategyStageTechnology } from './Technology'
import { Button } from 'src/ui-kit/Button'
import { TabProps, Tabs } from 'src/components/Tabs'

enum StrategyStageType {
  // LearnStrategy = 'LearnStrategy',
  // Technology = 'Technology',
  LearnStrategy,
  Technology,
}

/**
 * Создание этапа стратегии развития
 */
export const CreateLearnStrategyStage: React.FC<
  CreateLearnStrategyStageProps
> = ({ learnStrategy }) => {
  const [createMutation, { loading: inRequest, client }] =
    useCreateLearnStrategyStageMutation()

  const defaultVariables =
    useMemo<CreateLearnStrategyStageMutationVariables>(() => {
      return {
        data: {
          LearnStrategy: {
            id: learnStrategy.id,
          },
        },
      }
    }, [learnStrategy.id])

  const [variables, variablesSetter] =
    useState<CreateLearnStrategyStageMutationVariables>(defaultVariables)

  const [stageType, stageTypeSetter] = useState(StrategyStageType.LearnStrategy)

  const [opened, openedSetter] = useState(false)

  const toggleOpened = useCallback(() => {
    openedSetter(!opened)
  }, [opened])

  /**
   * При изменении типа этапа или закрытии формы, сбрасываем параметры
   */
  useEffect(() => {
    // TODO Cleanup

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    stageType
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    opened

    variablesSetter(defaultVariables)
  }, [defaultVariables, opened, stageType])

  const onChangeTabIndex = useCallback((index: number) => {
    stageTypeSetter(index)
  }, [])

  const submit = useCallback(() => {
    if (inRequest) {
      return
    }

    createMutation({
      variables,
    })
      .then(async (r) => {
        /**
         * Если запрос выполнился успешно, закрываем форму и перезапрашиваем данные
         */
        if (r.data?.createLearnStrategyStage) {
          openedSetter(false)

          await client.resetStore().catch(console.error)
        }
      })
      .catch(alert)
  }, [client, createMutation, inRequest, variables])

  const tabs = useMemo(() => {
    const tabs: TabProps[] = [
      {
        label: 'Технология',
        content: (
          <div>
            <h3>Выберите нужную технологию</h3>
            <div>
              <CreateLearnStrategyStageTechnology
                submit={submit}
                variables={variables}
                variablesSetter={variablesSetter}
                inRequest={inRequest}
                learnStrategy={learnStrategy}
              />
            </div>
          </div>
        ),
      },
      {
        label: 'Стратегия развития',
        content: (
          <div>
            <h3>Выберите нужную стратегию развития</h3>
            <div>
              <CreateLearnStrategyStageLearnStrategy
                submit={submit}
                variables={variables}
                variablesSetter={variablesSetter}
                inRequest={inRequest}
                learnStrategy={learnStrategy}
              />
            </div>
          </div>
        ),
      },
    ]

    return tabs
  }, [inRequest, learnStrategy, submit, variables])

  return useMemo(() => {
    return (
      <>
        <Button onClick={toggleOpened}>
          {!opened ? 'Добавить этап' : 'Отмена'}
        </Button>
        {opened ? (
          <CreateLearnStrategyStageStyled>
            <Tabs
              tabs={tabs}
              tabIndex={stageType}
              onChangeTabIndex={onChangeTabIndex}
            />
          </CreateLearnStrategyStageStyled>
        ) : null}
      </>
    )
  }, [onChangeTabIndex, opened, stageType, tabs, toggleOpened])
}
