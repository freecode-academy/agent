import React, { useMemo } from 'react'

import { TechnologyLinkProps } from './interfaces'
import Link from 'next/link'

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
        href={`/technologies/${object.id}`}
        title={object?.name || ''}
        {...other}
      >
        {object?.name}
      </Link>
    )
  }, [object?.id, object?.name, other])
}

export default TechnologyLink
