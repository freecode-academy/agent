import React from 'react'

import Link from 'next/link'
import { LearnStrategyNoNestingFragment } from 'src/gql/generated'

export function makeLearnStrategyLink(
  object: NonNullable<LearnStrategyLinkProps['object']>,
) {
  const { id } = object

  return `/learnstrategies/${id}`
}

export interface LearnStrategyLinkProps extends React.PropsWithChildren {
  object: LearnStrategyNoNestingFragment | null | undefined
}

export const LearnStrategyLink: React.FC<LearnStrategyLinkProps> = ({
  object,
  children,
  ...other
}) => {
  if (!object) {
    return null
  }

  const { name } = object

  const href = makeLearnStrategyLink(object)

  return (
    <Link href={href} title={name} {...other}>
      {children ?? name}
    </Link>
  )
}
