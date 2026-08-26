import Link from 'next/link'
import { TagFragment } from 'src/gql/generated'

export function createTagLink(tag: TagFragment) {
  const { name } = tag

  return `/tag/${encodeURIComponent(name)}`
}

type TagLinkProps = {
  tag: TagFragment | null | undefined
}

export const TagLink: React.FC<TagLinkProps> = ({ tag, ...other }) => {
  return tag ? (
    <Link href={createTagLink(tag)} title={tag?.name || undefined} {...other}>
      {tag?.name}
    </Link>
  ) : undefined
}
