import {
  TeamCardAddressStyled,
  TeamCardAuthorStyled,
  TeamCardMembersStyled,
  TeamCardStyled,
  TeamCardTitleStyled,
  TeamCardWebsitetyled,
} from './styles'
import { UserLink } from 'src/components/Link/User'
import { TeamFragment } from 'src/gql/generated'
import { WebSiteLink } from 'src/components/Link/WebSite'
import { TeamLink } from 'src/components/Link/Team'

type TeamCardProps = {
  team: TeamFragment
}

export const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const membersCount = 0

  return (
    <TeamCardStyled>
      <TeamCardTitleStyled>
        <TeamLink team={team} />
      </TeamCardTitleStyled>

      {team.CreatedBy && (
        <TeamCardAuthorStyled>
          <UserLink user={team.CreatedBy} size="small" />
        </TeamCardAuthorStyled>
      )}

      <TeamCardAddressStyled>{team.address}</TeamCardAddressStyled>

      <TeamCardWebsitetyled>
        {team.website && <WebSiteLink url={team.website} />}
      </TeamCardWebsitetyled>

      {membersCount > 0 && (
        <TeamCardMembersStyled>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          {membersCount}
        </TeamCardMembersStyled>
      )}
    </TeamCardStyled>
  )
}
