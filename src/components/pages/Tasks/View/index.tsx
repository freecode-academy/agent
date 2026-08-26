import React from 'react'
import { WhyItem, WhyStrip } from 'src/components/LayoutV2/components/WhyStrip'
import {
  Card,
  CardBody,
  CardImg,
  CardMeta,
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
import { createTaskLink } from 'src/components/Link/Task'
import { Markdown } from 'src/components/Markdown'
import { Pagination } from 'src/components/Pagination'
import { UserLink } from 'src/components/Link/User'
import Link from 'next/link'
import { BadgeRow } from '@/components/Badge'
import { TaskStatusBadge } from 'src/components/TaskStatusBadge'

type TasksViewProps = {
  tasks: TaskFragment[]
  page: number
  count: number
  limit: number
  showContent: boolean
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  count,
  limit,
  page,
  showContent,
}) => {
  const totalPages = count ? Math.floor(count / limit) : 0

  return (
    <>
      <Hero>
        <HeroInner>
          <div>
            <Eyebrow>Tasks</Eyebrow>
            {showContent && (
              <>
                <H1>Ship small. In public. Get hired.</H1>
                <Sub>
                  Tasks are the smallest unit of work in the network. Owners
                  scope them inside projects; anyone with access can claim one.
                  The result becomes a public worklog — the most honest
                  portfolio that exists.
                </Sub>
              </>
            )}
          </div>

          {showContent && (
            <>
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
              <HeroImage
                $src={tasksImg.src}
                role="img"
                aria-label="Task board"
              />
            </>
          )}
        </HeroInner>
      </Hero>

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
              const { id, title, description: intro, status, CreatedBy } = n

              // const project = projectBySlug(projectSlug)
              return (
                <Card key={id}>
                  <CardImg $src={tasksImg.src} />
                  <CardBody>
                    {status && (
                      <BadgeRow>
                        {/* <Badge tone={stateTone(state)}>{state}</Badge>
                      <Badge>{effort}</Badge> */}
                        <TaskStatusBadge status={status} />
                      </BadgeRow>
                    )}

                    <Link href={createTaskLink(n)} title={n.title ?? undefined}>
                      <CardTitle>{title}</CardTitle>
                    </Link>
                    <Markdown>{intro}</Markdown>
                    {/* {project && <CardMeta>Project: {project.title}</CardMeta>} */}

                    {CreatedBy && (
                      <CardMeta>
                        By <UserLink user={CreatedBy} />
                      </CardMeta>
                    )}
                  </CardBody>
                </Card>
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
