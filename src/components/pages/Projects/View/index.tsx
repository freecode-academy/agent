import React from 'react'

import {
  MeUserFragment,
  ProjectsConnectionProjectFragment,
} from 'src/gql/generated'

import projectsImg from '@/assets/projects.jpg'
import {
  CardBody,
  CardImg,
  Card,
  CardMeta,
  // CardText,
  CardTitle,
  Container,
  Eyebrow,
  Grid,
  H1,
  H2,
  Hero,
  HeroImage,
  HeroInner,
  Sub,
  Section,
  SectionLede,
} from 'src/FreecodeAcademy/Layout/styles'
import {
  WhyItem,
  WhyStrip,
} from 'src/FreecodeAcademy/Layout/components/WhyStrip'
// import {
//   Badge,
//   BadgeRow,
//   badgeTone,
// } from 'src/FreecodeAcademy/Layout/components/Badge'
import {
  CrossCard,
  CrossLinks,
} from 'src/FreecodeAcademy/Layout/components/CrossLinks'
import { UserLink } from 'src/components/Link/User'
import Link from 'next/link'
import { makeProjectLink } from 'src/components/Link/Project'
import { Markdown } from 'src/components/Markdown'
import { Pagination } from 'src/components/Pagination'

export type ProjectsViewProps = {
  projects: ProjectsConnectionProjectFragment[]
  page: number
  count: number
  limit: number
  currentUser: MeUserFragment | null | undefined
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  count,
  page,
  limit,
  currentUser,
}) => {
  const showContent = page < 2 && !currentUser

  const totalPages = count ? Math.ceil(count / limit) : 0

  return (
    <>
      <Hero>
        <HeroInner>
          <div>
            <Eyebrow>
              Projects{' '}
              {currentUser && (
                <Link href={`/projects/create`} rel="noindex nofollow">
                  <em>Create</em>
                </Link>
              )}
            </Eyebrow>

            {showContent && (
              <>
                <H1>Portfolio that works while you sleep.</H1>
                <Sub>
                  A project here is more than a case study. It's a public
                  surface to attract partners, signal to investors, document how
                  you solve real problems, and hand out small, scoped tasks the
                  network can pick up.
                </Sub>
              </>
            )}
          </div>

          {showContent && (
            <>
              <WhyStrip>
                <WhyItem>
                  <strong>Find partners</strong>
                  <span>
                    Open a project for co-builders, not just employees.
                  </span>
                </WhyItem>
                <WhyItem>
                  <strong>Attract investors</strong>
                  <span>Show traction, not slides.</span>
                </WhyItem>
                <WhyItem>
                  <strong>Document your work</strong>
                  <span>Worklogs become case studies become inbound.</span>
                </WhyItem>
              </WhyStrip>
              <HeroImage
                $src={projectsImg.src}
                role="img"
                aria-label="Project plans"
              />
            </>
          )}
        </HeroInner>
      </Hero>

      <Section>
        <Container>
          {showContent && (
            <>
              <H2>What's being built</H2>
              <SectionLede>
                Each project shows clear intent — partners wanted, investor
                open, help needed. No silent listings.
              </SectionLede>
            </>
          )}

          <Grid $cols={3}>
            {projects.map((n) => {
              const { id, name: title, description: intro, CreatedBy } = n

              // const owner = memberBySlug(ownerSlug)
              // const team = teamSlug ? teamBySlug(teamSlug) : undefined
              return (
                <Card key={id}>
                  <CardImg $src={projectsImg.src} />
                  <CardBody>
                    {/* <BadgeRow>
                      <Badge tone="ink">{status}</Badge>
                      {badges.map((b) => (
                        <Badge key={b} tone={badgeTone(b)}>
                          {b}
                        </Badge>
                      ))}
                    </BadgeRow> */}
                    <CardTitle as={Link} href={makeProjectLink(n)}>
                      {title}
                    </CardTitle>
                    <Markdown>{intro}</Markdown>
                    <CardMeta>
                      {CreatedBy ? (
                        <>
                          By <UserLink user={CreatedBy} />
                        </>
                      ) : (
                        ''
                      )}
                      {/* {team ? ` · ${team.title}` : ''} */}
                      {/* {taskSlugs.length > 0
                        ? ` · ${taskSlugs.length} open task(s)`
                        : ''} */}
                    </CardMeta>
                  </CardBody>
                </Card>
              )
            })}
          </Grid>

          <Pagination currentPage={page} totalPages={totalPages} />

          {showContent && (
            <CrossLinks>
              <CrossCard href="/tasks">
                <strong>Pick up a project task →</strong>
                <span>
                  Small, scoped pieces of real work. Build reputation by
                  shipping.
                </span>
                <em>See tasks</em>
              </CrossCard>
              <CrossCard href="/teams">
                <strong>Run projects as a team →</strong>
                <span>Investors trust units, not individuals.</span>
                <em>See teams</em>
              </CrossCard>
              <CrossCard href="/offers">
                <strong>Looking for collaborators? →</strong>
                <span>
                  Post an offer instead — it shows up in the public feed.
                </span>
                <em>Post an offer</em>
              </CrossCard>
            </CrossLinks>
          )}
        </Container>
      </Section>
    </>
  )
}
