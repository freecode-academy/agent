import React, { useMemo } from 'react'
import Link from 'next/link'
import { TechnologyNoNestingFragment } from 'src/gql/generated'

export function makeTechnologyLink(
  object: NonNullable<TechnologyLinkProps['object']>,
) {
  const { id } = object

  return `/technologies/${id}`
}

export interface TechnologyLinkProps extends React.PropsWithChildren {
  object: TechnologyNoNestingFragment | null | undefined
}

const TechnologyLink: React.FC<TechnologyLinkProps> = ({
  object,
  ...other
}) => {
  return useMemo(() => {
    if (!object?.id) {
      return null
    }

    return (
      <Link
        href={makeTechnologyLink(object)}
        title={object?.name || ''}
        {...other}
      >
        {object?.name}
      </Link>
    )
  }, [object, other])
}

export default TechnologyLink
