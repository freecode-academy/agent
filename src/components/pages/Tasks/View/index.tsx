import React from 'react'
import { WhyItem, WhyStrip } from 'src/components/LayoutV2/components/WhyStrip'
import {
  CardBody,
  CardImg,
  CardLink,
  // CardMeta,
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
  Section,
  SectionLede,
  Sub,
} from 'src/components/LayoutV2/styles'

import { TaskFragment } from 'src/gql/generated'

import tasksImg from '@/assets/tasks.jpg'
// import { projectBySlug, tasks } from '@/lib/mock-data'
// import {
//   Badge,
//   BadgeRow,
//   stateTone,
// } from 'src/components/LayoutV2/components/Badge'
import {
  CrossCard,
  CrossLinks,
} from 'src/components/LayoutV2/components/CrossLinks'
import { makeTaskLink } from 'src/components/Link/Task'
import { Markdown } from 'src/components/Markdown'
import { Pagination } from 'src/components/Pagination'

type TasksViewProps = {
  tasks: TaskFragment[]
  page: number
  count: number
  limit: number
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  count,
  limit,
  page,
}) => {
  const showContent = page < 2

  const totalPages = count ? Math.floor(count / limit) + 1 : 0

  return (
    <>
      {showContent && (
        <Hero>
          <HeroInner>
            <div>
              <Eyebrow>Tasks</Eyebrow>
              <H1>Ship small. In public. Get hired.</H1>
              <Sub>
                Tasks are the smallest unit of work in the network. Owners scope
                them inside projects; anyone with access can claim one. The
                result becomes a public worklog — the most honest portfolio that
                exists.
              </Sub>
            </div>
            <WhyStrip>
              <WhyItem>
                <strong>Real scope</strong>
                <span>Effort, deliverable, owner — visible upfront.</span>
              </WhyItem>
              <WhyItem>
                <strong>Public worklog</strong>
                <span>How you solved it, not just that you did.</span>
              </WhyItem>
              <WhyItem>
                <strong>Reputation</strong>
                <span>Closed tasks compound into trust.</span>
              </WhyItem>
            </WhyStrip>
            <HeroImage $src={tasksImg.src} role="img" aria-label="Task board" />
          </HeroInner>
        </Hero>
      )}

      <Section>
        <Container>
          {showContent && (
            <>
              <H2>Open and recent tasks</H2>
              <SectionLede>
                Pulled from active projects in the network.
              </SectionLede>
            </>
          )}

          <Grid $cols={3}>
            {tasks.map((n) => {
              const { id, title, description: intro } = n

              // const project = projectBySlug(projectSlug)
              return (
                <CardLink key={id} href={makeTaskLink(n)}>
                  <CardImg $src={tasksImg.src} />
                  <CardBody>
                    {/* <BadgeRow>
                      <Badge tone={stateTone(state)}>{state}</Badge>
                      <Badge>{effort}</Badge>
                    </BadgeRow> */}
                    <CardTitle>{title}</CardTitle>
                    <Markdown>{intro}</Markdown>
                    {/* {project && <CardMeta>Project: {project.title}</CardMeta>} */}
                  </CardBody>
                </CardLink>
              )
            })}
          </Grid>

          <Pagination currentPage={page} totalPages={totalPages} />

          {showContent && (
            <CrossLinks>
              <CrossCard href="/projects">
                <strong>Tasks live inside projects →</strong>
                <span>See the bigger context before you claim one.</span>
                <em>See projects</em>
              </CrossCard>
              <CrossCard href="/people">
                <strong>Who claims tasks →</strong>
                <span>
                  Verified members. Each closed task hardens their reputation.
                </span>
                <em>See members</em>
              </CrossCard>
              <CrossCard href="/offers">
                <strong>Got a skill? →</strong>
                <span>
                  Turn it into an offer so others come to you instead.
                </span>
                <em>See offers</em>
              </CrossCard>
            </CrossLinks>
          )}
        </Container>
      </Section>
    </>
  )
}
