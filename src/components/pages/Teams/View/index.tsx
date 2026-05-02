import React from 'react'
import { WhyItem, WhyStrip } from 'src/components/LayoutV2/components/WhyStrip'
import {
  CardBody,
  CardImg,
  CardLink,
  CardTitle,
  Container,
  Eyebrow,
  Grid,
  H1,
  H2,
  Hero,
  HeroImage,
  HeroInner,
  Section,
  SectionLede,
  Sub,
} from 'src/components/LayoutV2/styles'

import { TeamFragment } from 'src/gql/generated'

import teamsImg from '@/assets/teams.jpg'
// import { memberBySlug } from '@/lib/mock-data'
// import { Badge, BadgeRow } from 'src/components/LayoutV2/components/Badge'
import {
  CrossCard,
  CrossLinks,
} from 'src/components/LayoutV2/components/CrossLinks'
import { makeTeamLink } from 'src/components/Link/Team'
import { getResizedImagePath } from 'src/helpers/getResizedImagePath'
import { Markdown } from 'src/components/Markdown'
import { Pagination } from 'src/components/Pagination'

type TeamsViewProps = {
  teams: TeamFragment[]
  count: number | undefined
  page: number
  limit: number
}

export const TeamsView: React.FC<TeamsViewProps> = ({
  teams,
  count,
  page,
  limit,
}) => {
  const showContent = page < 2

  const totalPages = count ? Math.floor(count / limit) : 0

  return (
    <>
      {showContent && (
        <Hero>
          <HeroInner>
            <div>
              <Eyebrow>Teams</Eyebrow>
              <H1>One profile is a CV. A team is a company.</H1>
              <Sub>
                Teams let members combine portfolios, services and skills into a
                single unit. Clients see a real delivery group. Investors see
                who actually executes. You see who you can delegate to without
                explaining context twice.
              </Sub>
            </div>
            <WhyStrip>
              <WhyItem>
                <strong>Shared portfolio</strong>
                <span>Show the full body of work, not fragments.</span>
              </WhyItem>
              <WhyItem>
                <strong>Easier hiring</strong>
                <span>Clients hire a team, not a stranger.</span>
              </WhyItem>
              <WhyItem>
                <strong>Internal delegation</strong>
                <span>Hand off tasks to people you trust.</span>
              </WhyItem>
            </WhyStrip>
            <HeroImage
              $src={teamsImg.src}
              role="img"
              aria-label="A working team"
            />
          </HeroInner>
        </Hero>
      )}

      <Section>
        <Container>
          {showContent && (
            <>
              <H2>Active teams</H2>
              <SectionLede>
                Each team is a real working unit with shared accountability —
                not a logo collection.
              </SectionLede>
            </>
          )}

          <Grid $cols={3}>
            {teams.map((n) => {
              const { id, title, intro, image } = n

              return (
                <CardLink key={id} href={makeTeamLink(n)}>
                  <CardImg
                    $src={
                      (image &&
                        getResizedImagePath({
                          path: image,
                          size: 'middle',
                        })) ||
                      teamsImg.src
                    }
                  />
                  <CardBody>
                    {/* <CardMeta>{focus}</CardMeta> */}
                    <CardTitle>{title}</CardTitle>
                    <Markdown>{intro}</Markdown>
                    {/* <BadgeRow>
                      {services.slice(0, 3).map((s) => (
                        <Badge key={s} tone="brand">
                          {s}
                        </Badge>
                      ))}
                    </BadgeRow> */}
                    {/* <CardMeta>
                      Members:{' '}
                      {memberSlugs
                        .map((s) => memberBySlug(s)?.name)
                        .filter(Boolean)
                        .join(', ')}
                    </CardMeta> */}
                  </CardBody>
                </CardLink>
              )
            })}
          </Grid>

          <Pagination currentPage={page} totalPages={totalPages} />

          {showContent && (
            <CrossLinks>
              <CrossCard href="/people">
                <strong>Find people for your team →</strong>
                <span>
                  Browse verified members and invite them in (after access).
                </span>
                <em>See members</em>
              </CrossCard>
              <CrossCard href="/projects">
                <strong>Run projects as a team →</strong>
                <span>
                  Ship together, build a joint case study, attract investors.
                </span>
                <em>Explore projects</em>
              </CrossCard>
              <CrossCard href="/offers">
                <strong>Publish a team offer →</strong>
                <span>Sell a complete service, not freelance hours.</span>
                <em>See offers</em>
              </CrossCard>
            </CrossLinks>
          )}
        </Container>
      </Section>
    </>
  )
}
