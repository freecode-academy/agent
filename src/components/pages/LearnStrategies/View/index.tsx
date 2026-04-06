import Link from 'next/link'
import React from 'react'
import { UserLink as UikitUserLink } from 'src/components/Link/User'

import { LearnStrategiesViewProps } from './interfaces'
import {
  LearnStrategiesViewStyled,
  StrategiesGrid,
  StrategyCard,
  StrategyCardTitle,
  StrategyCardDescription,
  StrategyCardLevel,
  StrategyCardAuthor,
  StrategyCardMembers,
} from './styles'
import { LevelIcon } from 'src/components/LevelIcon'
import { getUserTechnologyLevelText } from '../../UserTechnologies/helpers/getUserTechnologyLevelText'
import { useAppContext } from 'src/components/AppContext'
import { Button } from 'src/ui-kit/Button'

export const LearnStrategiesView: React.FC<LearnStrategiesViewProps> = ({
  learnStrategies,
}) => {
  const { user: currentUser } = useAppContext()

  return (
    <LearnStrategiesViewStyled>
      {currentUser?.sudo && (
        <div>
          <Link href={'/learnstrategies/create'}>
            <Button>Create new strategy</Button>
          </Link>
        </div>
      )}

      <StrategiesGrid>
        {learnStrategies.map((n) => {
          const membersCount = n.UserLearnStrategies?.length || 0

          return (
            <StrategyCard key={n.id}>
              {n.level && (
                <StrategyCardLevel title={getUserTechnologyLevelText(n.level)}>
                  <LevelIcon level={n.level} />
                </StrategyCardLevel>
              )}

              <StrategyCardTitle>
                <Link href={`/learnstrategies/${n.id}`}>{n.name}</Link>
              </StrategyCardTitle>

              {n.description && (
                <StrategyCardDescription>
                  {n.description}
                </StrategyCardDescription>
              )}

              {n.CreatedBy && (
                <StrategyCardAuthor>
                  <UikitUserLink user={n.CreatedBy} size="small" />
                </StrategyCardAuthor>
              )}

              {membersCount > 0 && (
                <StrategyCardMembers>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  {membersCount}
                </StrategyCardMembers>
              )}
            </StrategyCard>
          )
        })}
      </StrategiesGrid>
    </LearnStrategiesViewStyled>
  )
}
