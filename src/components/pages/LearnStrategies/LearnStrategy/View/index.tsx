import React, { useMemo } from 'react'
import { LearnStrategyPageViewProps } from './interfaces'
import { LearnStrategyView } from './LearnStrategy'
import { useAppContext } from 'src/components/AppContext'

export const LearnStrategyPageView: React.FC<LearnStrategyPageViewProps> = ({
  learnStrategy,
}) => {
  const { user: currentUser } = useAppContext()

  return useMemo(() => {
    return (
      <>
        <LearnStrategyView
          // learnStrategy={learnStrategy}
          /**
           * Ключ здесь нужен, так как неправильно обрабатывается стейт при переходе
           * из одной стратегии в другую.
           */
          key={learnStrategy.id}
          isRoot={true}
          id={learnStrategy.id}
          loadedIDs={[]}
          currentUser={currentUser}
          showChilds={true}
          editable={true}
        />
      </>
    )
  }, [learnStrategy.id, currentUser])
}
