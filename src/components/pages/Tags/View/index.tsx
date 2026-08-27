import Link from 'next/link'
import React from 'react'
import { createTagLink } from 'src/components/Link/Tag'
import { Pagination } from 'src/components/Pagination'
import { TagFragment, TagsConnectionQueryVariables } from 'src/gql/generated'

type TagsViewProps = {
  tags: TagFragment[]
  loading: boolean
  count: number
  page?: number
  variables?: TagsConnectionQueryVariables
}

export const TagsView: React.FC<TagsViewProps> = ({
  tags,
  variables,
  count,
  page,
}) => {
  const limit = variables?.first ?? 0

  const totalPages = count ? Math.ceil(count / limit) : 0

  return (
    <>
      {tags.map((n) => {
        return (
          <div key={n.id}>
            <Link href={createTagLink(n)}>{n.name}</Link>
          </div>
        )
      })}

      <Pagination currentPage={page || 1} totalPages={totalPages} />
    </>
  )
}
