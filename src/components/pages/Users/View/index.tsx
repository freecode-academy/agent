import React from 'react'
import { UserFragment } from 'src/gql/generated'
import {
  UsersViewStyled,
  UsersViewGridStyled,
  UsersViewCardStyled,
  UsersViewCardToolbarStyled,
} from './styles'
import { SeparatorStyled } from 'src/components/Separator/styles'
import { StatusToggler } from '../User/View/StatusToggler'
import { FormattedDate } from 'src/ui-kit/format/FormattedDate'
import { Pagination } from 'src/components/Pagination'
import { UserLink } from 'src/components/Link/User'
import { Markdown } from 'src/components/Markdown'

type UsersViewProps = {
  users: UserFragment[]
  count: number
  page: number
  limit: number
}

export const UsersView: React.FC<UsersViewProps> = ({
  users,
  count,
  limit,
  page,
}) => {
  const totalPages = count ? Math.floor(count / limit) + 1 : 0

  return (
    <UsersViewStyled>
      <h1>Users</h1>

      <UsersViewGridStyled>
        {users.map((user) => (
          <UsersViewCardStyled key={user.id}>
            <UsersViewCardToolbarStyled>
              <UserLink user={user} />

              <SeparatorStyled />

              <FormattedDate value={user.createdAt} />
              <StatusToggler user={user} />
            </UsersViewCardToolbarStyled>

            {user.intro && <Markdown>{user.intro}</Markdown>}
          </UsersViewCardStyled>
        ))}
      </UsersViewGridStyled>

      <Pagination currentPage={page} totalPages={totalPages} />
    </UsersViewStyled>
  )
}
