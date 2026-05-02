import React from 'react'
import {
  CardBody,
  CardImg,
  CardLink,
  CardMeta,
  CardTitle,
  Container,
  Eyebrow,
  Grid,
  H1,
  H2,
  Hero,
  HeroImage,
  HeroInner,
  LockedNotice,
  Section,
  SectionLede,
  Sub,
} from 'src/components/LayoutV2/styles'

import { UserFragment } from 'src/gql/generated'

import membersImg from '@/assets/members.jpg'
import { Badge, BadgeRow } from 'src/components/LayoutV2/components/Badge'
import {
  CrossCard,
  CrossLinks,
} from 'src/components/LayoutV2/components/CrossLinks'
import { WhyItem, WhyStrip } from 'src/components/LayoutV2/components/WhyStrip'
import { getResizedImagePath } from 'src/helpers/getResizedImagePath'
import { createUserLink } from 'src/components/Link/User'
import { Markdown } from 'src/components/Markdown'
import { useAppContext } from 'src/components/AppContext'
import { Pagination } from 'src/components/Pagination'

type UsersViewProps = {
  users: UserFragment[]
  count: number
  page: number
  limit: number
}

export const UsersView: React.FC<UsersViewProps> = ({
  users,
  page,
  count,
  limit,
}) => {
  const { user: currentUser } = useAppContext()

  const showContent = page < 2 && !currentUser

  const totalPages = count ? Math.floor(count / limit) : 0

  return (
    <>
      <Hero>
        <HeroInner>
          <div>
            <Eyebrow>Members</Eyebrow>

            {showContent && (
              <>
                <H1>People you can actually reach.</H1>
                <Sub>
                  Every profile is a real, verified human — vetted before they
                  get in. Browsing is open. Writing to anyone, joining a team,
                  or proposing work requires an invite.
                </Sub>
              </>
            )}
          </div>

          {showContent && (
            <>
              <WhyStrip>
                <WhyItem>
                  <strong>Read everything</strong>
                  <span>Profiles, work, history — public.</span>
                </WhyItem>
                <WhyItem>
                  <strong>Contact = invite-only</strong>
                  <span>No spam. No cold outreach inflation.</span>
                </WhyItem>
                <WhyItem>
                  <strong>Form teams</strong>
                  <span>Once inside, build a unit and publish it.</span>
                </WhyItem>
              </WhyStrip>

              <LockedNotice>
                Contact details are hidden until you have access. Request an
                invite to unlock direct messaging.
              </LockedNotice>

              <HeroImage
                $src={membersImg.src}
                role="img"
                aria-label="Freecode Academy members"
              />
            </>
          )}
        </HeroInner>
      </Hero>

      <Section>
        <Container>
          {showContent && (
            <>
              <H2>Who's inside</H2>
              <SectionLede>
                A small slice of the network. Six personas, one shared standard:
                people who finish things.
              </SectionLede>
            </>
          )}

          <Grid $cols={3}>
            {users.map((n) => {
              const { id, username, fullname, image, intro } = n

              const name = fullname || username

              const skills: string[] = []
              const teamSlugs: {
                title?: string
              }[] = []

              return (
                <CardLink key={id} href={createUserLink(n)}>
                  <CardImg
                    $src={
                      (image &&
                        getResizedImagePath({
                          path: image,
                          size: 'middle',
                        })) ||
                      membersImg.src
                    }
                  />

                  <CardBody>
                    {/* <CardMeta>
                      {role} · {location}
                    </CardMeta> */}
                    <CardTitle>{name}</CardTitle>
                    <Markdown>{intro}</Markdown>
                    <BadgeRow>
                      {/* {verified && <Badge tone="green">Verified</Badge>} */}
                      {skills.slice(0, 2).map((s) => (
                        <Badge key={s}>{s}</Badge>
                      ))}
                    </BadgeRow>
                    {teamSlugs.length > 0 && (
                      <CardMeta>
                        Teams:{' '}
                        {/* {teamSlugs
                          .map((s) => teamBySlug(s)?.title)
                          .filter(Boolean)
                          .join(', ')} */}
                      </CardMeta>
                    )}
                  </CardBody>
                </CardLink>
              )
            })}
          </Grid>

          <Pagination currentPage={page} totalPages={totalPages} />

          {showContent && (
            <CrossLinks>
              <CrossCard href="/teams">
                <strong>Form a team →</strong>
                <span>
                  Combine portfolios and services into one unit clients can
                  hire.
                </span>
                <em>Why teams matter</em>
              </CrossCard>
              <CrossCard href="/offers">
                <strong>Browse member offers →</strong>
                <span>
                  What people inside are actually selling, hiring or proposing.
                </span>
                <em>See offers</em>
              </CrossCard>
              <CrossCard href="/about">
                <strong>How we vet members →</strong>
                <span>
                  14 years of curation, six clear roles, zero scoring theatre.
                </span>
                <em>About the network</em>
              </CrossCard>
            </CrossLinks>
          )}
        </Container>
      </Section>
    </>
  )
}
