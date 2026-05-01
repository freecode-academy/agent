import Link from 'next/link'
import { TeamNoNestingFragment } from 'src/gql/generated'

export function makeTeamLink(team: TeamNoNestingFragment) {
  const { id } = team

  return `/teams/${id}`
}

type TeamLinkProps = {
  team: TeamNoNestingFragment | null | undefined
}

export const TeamLink: React.FC<TeamLinkProps> = ({ team, ...other }) => {
  return team ? (
    <Link href={makeTeamLink(team)} title={team?.title || undefined} {...other}>
      {team?.title}
    </Link>
  ) : undefined
}
