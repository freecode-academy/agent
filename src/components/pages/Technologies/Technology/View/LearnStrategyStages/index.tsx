import React from 'react'
import { TechnologyLearnStrategyStagesProps } from './interfaces'
import { TechnologyLearnStrategyStagesStyled } from './styles'
import Link from 'next/link'

export const TechnologyLearnStrategyStages: React.FC<
  TechnologyLearnStrategyStagesProps
> = ({ LearnStrategyStages }) => {
  if (!LearnStrategyStages.length) {
    return null
  }

  return (
    <TechnologyLearnStrategyStagesStyled>
      <h2>Стратегии развития</h2>

      {LearnStrategyStages.map((n) => {
        if (!n.LearnStrategy) {
          return null
        }

        return (
          <div key={n.id}>
            <Link
              href={`/learnstrategies/${n.LearnStrategy.id}`}
              title={n.LearnStrategy.name ?? undefined}
            >
              {n.LearnStrategy.name}
            </Link>
          </div>
        )
      })}
    </TechnologyLearnStrategyStagesStyled>
  )
}
