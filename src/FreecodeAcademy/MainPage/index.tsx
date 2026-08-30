import Link from 'next/link'

import { Page } from 'src/components/pages/_App/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import { JsonLd } from 'src/components/seo/JsonLd'
import { createWebSite } from 'src/components/seo/JsonLd/helpers'

import styled from 'styled-components'

import networkImg from '@/assets/network.jpg'
import labImg from '@/assets/lab.jpg'
import executionImg from '@/assets/execution.jpg'
import trustImg from '@/assets/trust.jpg'
import membersImg from '@/assets/members.jpg'
import teamsImg from '@/assets/teams.jpg'
import offersImg from '@/assets/offers.jpg'
import projectsImg from '@/assets/projects.jpg'
import tasksImg from '@/assets/tasks.jpg'
import communityImg from '@/assets/community.jpg'

import { theme } from 'src/theme'
import {
  Card,
  CardIcon,
  CardText,
  CardTitle,
  Container,
  CTAGroup,
  Eyebrow,
  GhostBtn,
  Grid,
  H1,
  H2,
  Hero,
  HeroBg,
  HeroInner,
  Kicker,
  Lead,
  // PrimaryBtn,
  Section,
  SectionHead,
  Split,
  SplitImage,
  SplitText,
  Sub,
  Support,
} from 'src/components/LayoutV2/styles'
import { Authority } from '@/components/Authority'

/* TRUST */
const Trust = styled.section`
  padding: 56px 0 24px;
`
const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  text-align: center;
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`
const Stat = styled.div`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: ${theme.radius};
  padding: 28px 18px;
`
const StatNum = styled.div`
  font-family: ${theme.serif};
  font-size: 44px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${theme.ink};
`
const StatLbl = styled.div`
  color: ${theme.muted};
  font-size: 14px;
  margin-top: 4px;
`
const TrustNote = styled.p`
  text-align: center;
  color: ${theme.muted};
  margin-top: 22px;
  font-size: 15px;
`

/* ENTITY OVERVIEW (links to dedicated sections) */
const EntityGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`
const EntityCard = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: 22px;
  overflow: hidden;
  transition:
    transform 0.25s,
    box-shadow 0.25s,
    border-color 0.25s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 50px -28px rgba(14, 15, 18, 0.22);
    border-color: #d8d3c5;
  }
`
const EntityImg = styled.div<{ $src: string }>`
  background:
    url(${(p) => p.$src}) center/cover no-repeat,
    ${theme.cream};
  aspect-ratio: 16 / 9;
  border-bottom: 1px solid ${theme.line};
`
const EntityBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`
const EntityKicker = styled.div`
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.brand};
  font-weight: 600;
`
const EntityArrow = styled.span`
  margin-top: auto;
  font-weight: 600;
  color: ${theme.ink};
  &::after {
    content: ' →';
  }
`

/* HOW IT WORKS - timeline */
const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  @media (max-width: 880px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`
const Step = styled.div`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: 22px;
  padding: 28px 22px;
  position: relative;
`
const StepNum = styled.div`
  font-family: ${theme.serif};
  font-size: 40px;
  font-weight: 500;
  color: ${theme.brand};
  letter-spacing: -0.02em;
  margin-bottom: 8px;
`

/* AI LAB BLOCK */
const LabWrap = styled.div`
  background: linear-gradient(135deg, #0e0f12 0%, #1a1c22 100%);
  color: #fff;
  border-radius: 32px;
  padding: 64px;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 48px;
  align-items: center;
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    padding: 40px 28px;
  }
  h2 {
    color: #fff;
  }
  p {
    color: rgba(255, 255, 255, 0.75);
    font-size: 17px;
  }
`
const LabList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  li {
    padding: 14px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    gap: 14px;
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
  }
  li::before {
    content: '→';
    color: ${theme.brand};
    font-weight: 600;
  }
`
const LabImg = styled.div`
  border-radius: 22px;
  overflow: hidden;
  aspect-ratio: 4/3;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

/* FOR WHO */
const Personas = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`
const Persona = styled.div`
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid ${theme.line};
  background: ${theme.surface};
`
const PersonaImg = styled.div<{ $src: string }>`
  height: 200px;
  background: url(${(p) => p.$src}) center/cover no-repeat;
`
const PersonaBody = styled.div`
  padding: 22px 24px 26px;
  h3 {
    font-family: ${theme.serif};
    font-size: 22px;
    margin: 0 0 6px;
    font-weight: 600;
  }
  p {
    margin: 0;
    color: ${theme.ink2};
    font-size: 15px;
  }
`

/* COMMUNITY */
const CommBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid ${theme.line};
  background: ${theme.surface};
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`
const CommImg = styled.div`
  background: url(${communityImg.src}) center/cover no-repeat;
  min-height: 360px;
`
const CommText = styled.div`
  padding: 56px 48px;
  ul {
    list-style: none;
    padding: 0;
    margin: 22px 0 0;
  }
  li {
    padding: 10px 0;
    color: ${theme.ink2};
    display: flex;
    gap: 12px;
  }
  li::before {
    content: '✓';
    color: ${theme.brand};
    font-weight: 700;
  }
  @media (max-width: 880px) {
    padding: 36px 28px;
  }
`

/* FINAL CTA */
const FinalCTA = styled.section`
  padding: 120px 24px;
  text-align: center;
  background:
    radial-gradient(ellipse at top, ${theme.brandSoft} 0%, transparent 60%),
    ${theme.bg};
`

export const MainPageFreecode: Page = ({ siteOrigin }) => {
  const siteTitle = process.env.NEXT_PUBLIC_MAIN_PAGE_TITLE
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

  return (
    <>
      {siteTitle && (
        <SeoHeaders title={siteTitle} canonical={'/'} siteOrigin={siteOrigin} />
      )}
      <JsonLd
        data={createWebSite({
          name: siteTitle || '',
          url: siteUrl,
        })}
      />

      {/* HERO */}
      <Hero>
        <HeroBg aria-hidden />
        <HeroInner>
          <div>
            <Eyebrow>AI R&D Lab · Execution Network</Eyebrow>
            <H1>
              An AI R&D Lab That <em>Actually</em> Delivers
            </H1>
            <Sub>
              We cut through AI chaos, define the right solutions, and execute
              them with Link distributed network of verified professionals.
            </Sub>
          </div>
          <Support>
            Not Link freelance marketplace. A coordinated team with shared
            responsibility for real outcomes.
          </Support>
          <CTAGroup>
            {/* <PrimaryBtn href="#cta">Get Access →</PrimaryBtn> */}
            <Authority>Get Access →</Authority>
            <GhostBtn href="https://t.me/freecode_academy">
              Join Telegram Channel
            </GhostBtn>
          </CTAGroup>
        </HeroInner>
      </Hero>

      {/* TRUST */}
      <Trust>
        <Container>
          <Stats>
            <Stat as={Link} href={'/people'}>
              <StatNum>4,000+</StatNum>
              <StatLbl>Members</StatLbl>
            </Stat>
            <Stat as={Link} href={'/teams'}>
              <StatNum>100+</StatNum>
              <StatLbl>Studios & Teams</StatLbl>
            </Stat>
            <Stat>
              <StatNum>14+</StatNum>
              <StatLbl>Years of Experience</StatLbl>
            </Stat>
          </Stats>
          <TrustNote>
            A curated network built over more than Link decade — now reimagined
            for the AI era.
          </TrustNote>
        </Container>
      </Trust>

      {/* CORE IDEA */}
      <Section $tone="bg" id="core">
        <Container>
          <Split>
            <SplitText>
              <Kicker>Core Idea</Kicker>
              <H2>From AI Hype to Real Execution</H2>
              <p>
                Most platforms connect people.{' '}
                <strong>We take it further</strong> — we define problems,
                assemble teams, and stay responsible until delivery.
              </p>
              <p>
                This is not an open marketplace. It’s Link{' '}
                <strong>private, AI-native execution network</strong> where
                professionals collaborate as one coordinated system.
              </p>
            </SplitText>
            <SplitImage>
              <img
                src={networkImg.src}
                alt="Distributed team collaborating"
                loading="lazy"
              />
            </SplitImage>
          </Split>
        </Container>
      </Section>

      {/* WHAT MAKES DIFFERENT */}
      <Section $tone="cream">
        <Container>
          <SectionHead>
            <Kicker>What Makes Us Different</Kicker>
            <H2>Not Just Link Platform</H2>
          </SectionHead>
          <Grid $cols={2}>
            {[
              {
                i: 'AI',
                t: 'AI-Native Approach',
                d: 'We work at the edge of modern AI and technology — not just using tools, but understanding how to apply them.',
              },
              {
                i: '✓',
                t: 'Verified Network',
                d: 'Every participant is known, vetted, and part of Link trusted environment.',
              },
              {
                i: '↔',
                t: 'Shared Responsibility',
                d: 'We don’t disappear after matching. We stay involved and accountable for results.',
              },
              {
                i: '◎',
                t: 'Real Collaboration',
                d: 'Not gigs. Not random hires. Teams form, execute, and deliver together.',
              },
            ].map((c) => (
              <Card key={c.t}>
                <CardIcon>{c.i}</CardIcon>
                <CardTitle>{c.t}</CardTitle>
                <CardText>{c.d}</CardText>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* HOW IT WORKS */}
      <Section $tone="bg" id="how">
        <Container>
          <SectionHead>
            <Kicker>How It Works</Kicker>
            <H2>From Idea to Delivery</H2>
          </SectionHead>
          <Steps>
            {[
              [
                '01',
                'Define the Problem',
                'We help turn vague ideas into clear, actionable project scopes.',
              ],
              [
                '02',
                'Assemble the Team',
                'We match the right experts and teams from within the network.',
              ],
              [
                '03',
                'Execute Together',
                'Work happens inside coordinated teams with shared goals and visibility.',
              ],
              [
                '04',
                'Deliver Results',
                'We stay involved until real outcomes are achieved.',
              ],
            ].map(([n, t, d]) => (
              <Step key={n}>
                <StepNum>{n}</StepNum>
                <CardTitle>{t}</CardTitle>
                <CardText>{d}</CardText>
              </Step>
            ))}
          </Steps>
        </Container>
      </Section>

      {/* WHAT YOU CAN DO */}
      <Section $tone="white" id="offer">
        <Container>
          <SectionHead>
            <Kicker>What We Offer</Kicker>
            <H2>What You Can Do</H2>
          </SectionHead>
          <Grid $cols={3}>
            {[
              [
                'Find Contractors',
                'Work with verified professionals and trusted teams.',
              ],
              [
                'Build Teams',
                'Create or join teams to execute complex projects together.',
              ],
              [
                'Publish & Showcase',
                'Share your cases, research, and portfolio to build reputation.',
              ],
              [
                'Manage Projects',
                'Organize tasks, collaborate, and track progress in one system.',
              ],
              [
                'Real Opportunities',
                'Discover projects, partnerships, and collaborations inside Link private network.',
              ],
              [
                'Global Collaboration',
                'Work with professionals from different countries and backgrounds.',
              ],
            ].map(([t, d]) => (
              <Card key={t}>
                <CardTitle>{t}</CardTitle>
                <CardText>{d}</CardText>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* AI LAB */}
      <Section $tone="bg" id="lab">
        <Container>
          <LabWrap>
            <div>
              <Kicker style={{ color: '#FF7E55' }}>AI Lab</Kicker>
              <H2>A Public AI Lab + Private Execution Network</H2>
              <p>
                We continuously research and publish insights on modern AI and
                technology. But we don’t stop at theory — we turn research into
                real-world execution.
              </p>
              <LabList>
                <li>experiments → prototypes</li>
                <li>prototypes → products</li>
                <li>ideas → working systems</li>
              </LabList>
            </div>
            <LabImg>
              <img src={labImg.src} alt="AI research lab" loading="lazy" />
            </LabImg>
          </LabWrap>
        </Container>
      </Section>

      {/* QUALITY & TRUST */}
      <Section $tone="cream">
        <Container>
          <Split>
            <SplitImage>
              <img
                src={trustImg.src}
                alt="Accountability and trust"
                loading="lazy"
              />
            </SplitImage>
            <SplitText>
              <Kicker>Quality & Trust</Kicker>
              <H2>Accountability Built-In</H2>
              <p>Unlike traditional platforms:</p>
              <ul
                style={{ listStyle: 'none', padding: 0, margin: '10px 0 18px' }}
              >
                {[
                  'we verify participants',
                  'we curate access',
                  'we stay involved in execution',
                ].map((x) => (
                  <li key={x} style={{ padding: '8px 0', color: theme.ink2 }}>
                    <span style={{ color: theme.brand, marginRight: 10 }}>
                      ✓
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
              <p>
                <strong>
                  We don’t just connect people — we stand behind the work.
                </strong>
              </p>
            </SplitText>
          </Split>
        </Container>
      </Section>

      {/* FOR WHO */}
      <Section $tone="bg">
        <Container>
          <SectionHead>
            <Kicker>Who It’s For</Kicker>
            <H2>Built for Three Kinds of Builders</H2>
          </SectionHead>
          <Personas>
            <Persona>
              <PersonaImg $src={executionImg.src} />
              <PersonaBody>
                <h3>Clients</h3>
                <p>Who need clarity in AI chaos and reliable execution.</p>
              </PersonaBody>
            </Persona>
            <Persona>
              <PersonaImg $src={networkImg.src} />
              <PersonaBody>
                <h3>Professionals</h3>
                <p>Who want access to real projects and strong teams.</p>
              </PersonaBody>
            </Persona>
            <Persona>
              <PersonaImg $src={labImg.src} />
              <PersonaBody>
                <h3>Studios & Teams</h3>
                <p>Who want to collaborate, scale, and access new deal flow.</p>
              </PersonaBody>
            </Persona>
          </Personas>
        </Container>
      </Section>

      {/* ENTITY OVERVIEW */}
      <Section $tone="bg" id="explore">
        <Container>
          <SectionHead>
            <Kicker>What lives inside</Kicker>
            <H2>Five things you can actually do here</H2>
            <Lead>
              Everyone reads. Members create. Each section answers one question:
              why should I bother?
            </Lead>
          </SectionHead>
          <EntityGrid>
            <EntityCard href="/people">
              <EntityImg $src={membersImg.src} />
              <EntityBody>
                <EntityKicker>Members</EntityKicker>
                <CardTitle>Reach real people</CardTitle>
                <CardText>
                  Browsing is open. Direct contact requires an invite — that's
                  the whole point of Link closed club.
                </CardText>
                <EntityArrow>See members</EntityArrow>
              </EntityBody>
            </EntityCard>
            <EntityCard href="/teams">
              <EntityImg $src={teamsImg.src} />
              <EntityBody>
                <EntityKicker>Teams</EntityKicker>
                <CardTitle>Build Link unit, not Link CV</CardTitle>
                <CardText>
                  Stack portfolios and services. Clients hire teams. Investors
                  back teams. Delegate inside.
                </CardText>
                <EntityArrow>See teams</EntityArrow>
              </EntityBody>
            </EntityCard>
            <EntityCard href="/offers">
              <EntityImg $src={offersImg.src} />
              <EntityBody>
                <EntityKicker>Offers</EntityKicker>
                <CardTitle>Anything you propose</CardTitle>
                <CardText>
                  Service, collaboration, research, hiring — one free-form
                  format. A real human behind every post.
                </CardText>
                <EntityArrow>See offers</EntityArrow>
              </EntityBody>
            </EntityCard>
            <EntityCard href="/projects">
              <EntityImg $src={projectsImg.src} />
              <EntityBody>
                <EntityKicker>Projects</EntityKicker>
                <CardTitle>Find partners. Attract investors.</CardTitle>
                <CardText>
                  Public badges signal intent:{' '}
                  <strong>Looking for partners</strong>,{' '}
                  <strong>Seeking investor</strong>,{' '}
                  <strong>Help wanted</strong>.
                </CardText>
                <EntityArrow>See projects</EntityArrow>
              </EntityBody>
            </EntityCard>
            <EntityCard href="/tasks">
              <EntityImg $src={tasksImg.src} />
              <EntityBody>
                <EntityKicker>Tasks</EntityKicker>
                <CardTitle>Ship small, in public</CardTitle>
                <CardText>
                  Scoped work attached to real projects. Closed tasks become
                  public worklogs and case studies.
                </CardText>
                <EntityArrow>See tasks</EntityArrow>
              </EntityBody>
            </EntityCard>
            <EntityCard href="/about">
              <EntityImg $src={networkImg.src} />
              <EntityBody>
                <EntityKicker>Why it works</EntityKicker>
                <CardTitle>An invite-only network</CardTitle>
                <CardText>
                  14 years of curation. No spam, no noise, no fake profiles.
                  Read the philosophy.
                </CardText>
                <EntityArrow>About Freecode Academy</EntityArrow>
              </EntityBody>
            </EntityCard>
          </EntityGrid>
        </Container>
      </Section>

      {/* COMMUNITY */}
      <Section $tone="white" id="community">
        <Container>
          <SectionHead>
            <Kicker>Community</Kicker>
            <H2>A Private Network, Not an Open Marketplace</H2>
            <Lead>Access is limited and curated.</Lead>
          </SectionHead>
          <CommBox>
            <CommImg />
            <CommText>
              <CardTitle style={{ fontSize: 26 }}>This ensures:</CardTitle>
              <ul>
                <li>higher signal, lower noise</li>
                <li>trusted interactions</li>
                <li>real opportunities instead of spam</li>
              </ul>
            </CommText>
          </CommBox>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <FinalCTA id="cta">
        <Container>
          <Kicker>Ready to Join?</Kicker>
          <H1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', maxWidth: '16ch' }}>
            A new kind of professional network.
          </H1>
          <Sub>
            Work on real projects. Collaborate with trusted professionals. Be
            part of Link system that actually delivers.
          </Sub>
          <CTAGroup style={{ marginTop: 28 }}>
            {/* <PrimaryBtn href="#">Get Access →</PrimaryBtn> */}
            <Authority>Get Access →</Authority>
            <GhostBtn href="https://t.me/freecode_academy">
              Join Telegram Channel
            </GhostBtn>
          </CTAGroup>
        </Container>
      </FinalCTA>
    </>
  )
}
