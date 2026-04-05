import React from 'react'
import { UserLink as UikitUserLink } from 'src/components/Link/User'
import { LearnStrategiesViewMembersProps } from './interfaces'
import { LearnStrategiesViewMembersStyled } from './styles'

export const LearnStrategiesViewMembers: React.FC<
  LearnStrategiesViewMembersProps
> = ({ learnStrategy }) => {
  return (
    <LearnStrategiesViewMembersStyled>
      {learnStrategy.UserLearnStrategies?.map((n) => {
        return n.CreatedBy ? (
          <div key={n.id}>
            <UikitUserLink user={n.CreatedBy} size="small" />
          </div>
        ) : null
      })}
    </LearnStrategiesViewMembersStyled>
  )
}
