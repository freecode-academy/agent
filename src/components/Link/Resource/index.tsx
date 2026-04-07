import Link from 'next/link'
import { ResourceNoNestingFragment } from 'src/gql/generated'

export function makeResourceLink(resource: ResourceNoNestingFragment) {
  const { uri } = resource

  return uri
}

type ResourceLinkProps = React.PropsWithChildren<{
  resource: ResourceNoNestingFragment | null | undefined
}>

export const ResourceLink: React.FC<ResourceLinkProps> = ({
  resource,
  children,
  ...other
}) => {
  return resource ? (
    <Link
      href={makeResourceLink(resource)}
      title={resource?.name || undefined}
      {...other}
    >
      {children || resource?.name}
    </Link>
  ) : undefined
}
