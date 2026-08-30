import { Markdown } from 'src/components/Markdown'
import { ResourceViewProps } from '../interfaces'
import { TeamResourceViewStyled } from './styles'
import { PhoneNumber } from 'src/components/PhoneNumber'
import { EmailAddress } from 'src/components/EmailAddress'
import Link from 'next/link'

export const TeamResourceView: React.FC<ResourceViewProps> = ({ resource }) => {
  const { Team } = resource

  return (
    <TeamResourceViewStyled>
      <h1>{resource.name}</h1>

      {/* <div>Team status: {resource.stat}</div> */}

      {Team && (
        <>
          <div>Team status: {Team.status}</div>

          {Team.website && (
            <div>
              <Link
                href={Team.website}
                target="_blank"
                rel="noindex nofollow norefferer"
              >
                {Team.website}
              </Link>
            </div>
          )}

          {Team.address && <div>{Team.address}</div>}
          {Team.email && (
            <div>
              <EmailAddress value={Team.email} />
            </div>
          )}
          {Team.phone?.split(',').map((n) => {
            const phone = n.trim()

            return phone ? <PhoneNumber key={phone} value={phone} /> : null
          })}

          {Team.content && <Markdown>{Team.content}</Markdown>}
        </>
      )}
    </TeamResourceViewStyled>
  )
}
