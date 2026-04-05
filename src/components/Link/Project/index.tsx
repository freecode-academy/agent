import React from 'react'

import { ProjectLinkProps } from './interfaces'
import Link from 'next/link'

export function makeProjectLink(
  project: NonNullable<ProjectLinkProps['object']>,
) {
  const { id, Resource } = project

  const { uri: resourceUri } = Resource || {}

  return resourceUri || `/projects/id/${id}`
}

export const ProjectLink: React.FC<ProjectLinkProps> = ({
  object,
  children,
  ...other
}) => {
  if (!object) {
    return null
  }

  const { name } = object

  const href = makeProjectLink(object)

  return (
    <Link href={href} title={name} {...other}>
      {children ?? name}
    </Link>
  )
}
