import React from 'react'
import Link from 'next/link'
import { TeamFragment } from 'src/gql/generated'
import { useAppContext } from 'src/components/AppContext'
import { Button } from 'src/ui-kit/Button'
import { TeamsViewStyled, TeamsGridStyled } from './styles'
import { Pagination } from 'src/components/Pagination'
import { TeamCard } from './TeamCard'

type TeamsViewProps = {
  objects: TeamFragment[]
  count: number | undefined
  page: number
  limit: number | undefined | null
}

export const TeamsView: React.FC<TeamsViewProps> = ({
  objects,
  count,
  page,
  limit,
}) => {
  const { user: currentUser } = useAppContext()
  const totalPages = count ? Math.floor(count / (limit ?? 10)) + 1 : 0

  return (
    <TeamsViewStyled>
      {currentUser?.sudo && (
        <div>
          <Link href={'/teams/create'}>
            <Button>Create new team</Button>
          </Link>
        </div>
      )}

      <TeamsGridStyled>
        {objects.map((n) => {
          return <TeamCard key={n.id} team={n} />
        })}
      </TeamsGridStyled>

      <Pagination currentPage={page || 1} totalPages={totalPages} />
    </TeamsViewStyled>
  )
}
