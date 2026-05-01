import React from 'react'

import {
  ProjectsConnectionProjectFragment,
  ProjectsConnectionQueryVariables,
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
} from 'src/components/LayoutV2/styles'
import { WhyItem, WhyStrip } from 'src/components/LayoutV2/components/WhyStrip'
// import {
//   Badge,
//   BadgeRow,
//   badgeTone,
// } from 'src/components/LayoutV2/components/Badge'
import {
  CrossCard,
  CrossLinks,
} from 'src/components/LayoutV2/components/CrossLinks'
import { UserLink } from 'src/components/Link/User'
import Link from 'next/link'
import { makeProjectLink } from 'src/components/Link/Project'
import { Markdown } from 'src/components/Markdown'

export type ProjectsViewProps = {
  projects: ProjectsConnectionProjectFragment[]
  variables?: ProjectsConnectionQueryVariables
  page?: number
  count?: number
  loading: boolean
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ projects }) => {
  return (
    <>
      <Hero>
        <HeroInner>
          <div>
            <Eyebrow>Projects</Eyebrow>
            <H1>Portfolio that works while you sleep.</H1>
            <Sub>
              A project here is more than a case study. It's a public surface to
              attract partners, signal to investors, document how you solve real
              problems, and hand out small, scoped tasks the network can pick
              up.
            </Sub>
          </div>
          <WhyStrip>
            <WhyItem>
              <strong>Find partners</strong>
              <span>Open a project for co-builders, not just employees.</span>
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
        </HeroInner>
      </Hero>

      <Section>
        <Container>
          <H2>What's being built</H2>
          <SectionLede>
            Each project shows clear intent — partners wanted, investor open,
            help needed. No silent listings.
          </SectionLede>
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

          <CrossLinks>
            <CrossCard href="/tasks">
              <strong>Pick up a project task →</strong>
              <span>
                Small, scoped pieces of real work. Build reputation by shipping.
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
        </Container>
      </Section>
    </>
  )
}
