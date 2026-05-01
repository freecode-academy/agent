import { Page } from '../_App/interfaces'
import { SeoHeaders } from 'src/components/seo/SeoHeaders'
import {
  Container,
  Eyebrow,
  H1,
  H2,
  Hero,
  HeroInner,
  Kicker,
  Lead,
  Section,
  SectionHead,
  // Split,
  Sub,
} from 'src/components/LayoutV2/styles'
import styled from 'styled-components'
import { theme } from 'src/theme'

import founderImg from '@/assets/about-founder.jpg'
import missionImg from '@/assets/about-mission.jpg'
import philosophyImg from '@/assets/about-philosophy.jpg'
import labImg from '@/assets/lab.jpg'
import Link from 'next/link'
// import networkImg from '@/assets/network.jpg'
// import communityImg from '@/assets/community.jpg'

/* SPLIT */
const Split = styled.div<{ $reverse?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
  ${(p) => p.$reverse && `direction: rtl; & > * { direction: ltr; }`}
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    direction: ltr;
    gap: 32px;
  }
`
const SplitImg = styled.div`
  border-radius: 26px;
  overflow: hidden;
  aspect-ratio: 4/3;
  box-shadow: 0 30px 60px -30px rgba(14, 15, 18, 0.25);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const SplitText = styled.div`
  p {
    color: ${theme.ink2};
    font-size: 17px;
    margin: 0 0 14px;
  }
  strong {
    color: ${theme.ink};
  }
`

/* PILLARS */
const Pillars = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  @media (max-width: 980px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`
const Pillar = styled.div`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: 22px;
  padding: 28px 22px;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -20px rgba(14, 15, 18, 0.18);
  }
`
const PillarTag = styled.div`
  font-family: ${theme.serif};
  font-size: 36px;
  font-weight: 500;
  color: ${theme.brand};
  letter-spacing: -0.02em;
  margin-bottom: 10px;
`
const PillarTitle = styled.h3`
  font-family: ${theme.serif};
  font-weight: 600;
  font-size: 20px;
  margin: 0 0 8px;
`
const PillarText = styled.p`
  color: ${theme.ink2};
  font-size: 14.5px;
  margin: 0;
`

/* ROLES — partnership */
const Roles = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 980px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`
const Role = styled.article`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: 22px;
  padding: 28px 26px;
  display: flex;
  flex-direction: column;
  transition:
    border-color 0.25s ease,
    transform 0.25s ease;
  &:hover {
    border-color: #d8d3c5;
    transform: translateY(-3px);
  }
`
const RoleBadge = styled.div`
  display: inline-flex;
  align-self: flex-start;
  padding: 6px 12px;
  border-radius: 999px;
  background: ${theme.brandSoft};
  color: ${theme.brand};
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 16px;
`
const RoleTitle = styled.h3`
  font-family: ${theme.serif};
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 8px;
  letter-spacing: -0.01em;
`
const RoleText = styled.p`
  color: ${theme.ink2};
  font-size: 15px;
  margin: 0 0 16px;
`
const RoleList = styled.ul`
  list-style: none;
  padding: 0;
  margin: auto 0 0;
  li {
    font-size: 14px;
    color: ${theme.ink2};
    padding: 6px 0;
    display: flex;
    gap: 10px;
  }
  li::before {
    content: '→';
    color: ${theme.brand};
    font-weight: 700;
  }
`

/* MANIFESTO */
const Manifesto = styled.div`
  background: linear-gradient(135deg, #0e0f12 0%, #1a1c22 100%);
  color: #fff;
  border-radius: 32px;
  padding: 72px 56px;
  text-align: center;
  h2 {
    color: #fff;
    max-width: 18ch;
    margin: 0 auto 22px;
  }
  p {
    color: rgba(255, 255, 255, 0.78);
    font-size: 19px;
    max-width: 680px;
    margin: 0 auto;
  }
  @media (max-width: 720px) {
    padding: 48px 28px;
  }
`

/* TIMELINE */
const Timeline = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`
const TimeCard = styled.div`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: 22px;
  padding: 28px;
`
const TimeYear = styled.div`
  font-family: ${theme.serif};
  font-size: 28px;
  font-weight: 600;
  color: ${theme.brand};
  margin-bottom: 8px;
`
const TimeTitle = styled.h3`
  font-family: ${theme.serif};
  font-size: 20px;
  margin: 0 0 8px;
  font-weight: 600;
`
const TimeText = styled.p`
  color: ${theme.ink2};
  font-size: 15px;
  margin: 0;
`

/* FOUNDER QUOTE */
const QuoteWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 0;
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  border-radius: 28px;
  overflow: hidden;
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`
const QuoteImg = styled.div`
  background: url(${founderImg.src}) center/cover no-repeat;
  min-height: 380px;
`
const QuoteBody = styled.div`
  padding: 56px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  blockquote {
    font-family: ${theme.serif};
    font-size: clamp(22px, 2.4vw, 30px);
    line-height: 1.3;
    letter-spacing: -0.015em;
    margin: 0 0 24px;
    color: ${theme.ink};
  }
  cite {
    font-style: normal;
    color: ${theme.muted};
    font-size: 14px;
    strong {
      color: ${theme.ink};
      display: block;
      font-size: 16px;
      margin-bottom: 2px;
    }
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
  h2 {
    max-width: 18ch;
    margin: 0 auto 18px;
  }
`
const CTAGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 32px;
`
const PrimaryBtn = styled(Link)`
  background: ${theme.ink};
  color: #fff;
  padding: 14px 26px;
  border-radius: 999px;
  font-weight: 500;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 10px 30px rgba(14, 15, 18, 0.18);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(14, 15, 18, 0.22);
  }
`
const GhostBtn = styled(Link)`
  background: ${theme.surface};
  border: 1px solid ${theme.line};
  color: ${theme.ink};
  padding: 14px 26px;
  border-radius: 999px;
  font-weight: 500;
  font-size: 15px;
  &:hover {
    background: ${theme.cream};
  }
`

export const AboutPage: Page = () => {
  return (
    <>
      <SeoHeaders
        title="About Us — FreeCode.Academy Expert Network"
        description="Discover how FreeCode.Academy connects clients with verified tech experts through AI-powered agents. Join our community of developers and mentors."
      />

      {/* HERO */}
      <Hero>
        <HeroInner>
          <div>
            <Eyebrow>About Freecode Academy · Est. 2012</Eyebrow>
            <H1>
              A network built on <em>trust</em>, sharpened by AI.
            </H1>
            <Sub>
              We are not a marketplace. We are a private execution network — a
              virtual company of independent professionals who deliver real
              outcomes together, with shared responsibility for the result.
            </Sub>
          </div>
        </HeroInner>
      </Hero>

      {/* MISSION */}
      <Section $tone="bg">
        <Container>
          <Split>
            <SplitImg>
              <img
                src={missionImg.src}
                alt="Network of connected nodes"
                loading="lazy"
                width={1024}
                height={1024}
              />
            </SplitImg>
            <SplitText>
              <Kicker>Our Mission</Kicker>
              <H2>Turn AI chaos into clear, executed outcomes.</H2>
              <p>
                The world is overloaded with AI noise, half-finished tools, and
                marketplaces drowning in spam. Real businesses still struggle to
                find people they can <strong>actually trust</strong> to ship.
              </p>
              <p>
                Our mission is to bring back the missing layer: a curated
                environment where serious professionals, studios, founders and
                clients meet — and where every project carries collective
                accountability.
              </p>
            </SplitText>
          </Split>
        </Container>
      </Section>

      {/* PHILOSOPHY */}
      <Section $tone="cream">
        <Container>
          <SectionHead>
            <Kicker>Our Philosophy</Kicker>
            <H2>Substance over noise. People over platforms.</H2>
            <Lead>
              Four principles shape every decision we make — and every member we
              accept.
            </Lead>
          </SectionHead>
          <Pillars>
            <Pillar>
              <PillarTag>01</PillarTag>
              <PillarTitle>Curation</PillarTitle>
              <PillarText>
                Invite-only. We protect the signal so members never waste time
                on noise.
              </PillarText>
            </Pillar>
            <Pillar>
              <PillarTag>02</PillarTag>
              <PillarTitle>Responsibility</PillarTitle>
              <PillarText>
                We don't just connect people — we stand behind the work that
                gets shipped.
              </PillarText>
            </Pillar>
            <Pillar>
              <PillarTag>03</PillarTag>
              <PillarTitle>AI-Native</PillarTitle>
              <PillarText>
                Our own AI agent matches people, projects and offers. No endless
                feeds.
              </PillarText>
            </Pillar>
            <Pillar>
              <PillarTag>04</PillarTag>
              <PillarTitle>Longevity</PillarTitle>
              <PillarText>
                14 years in. We move slow on principles, fast on execution.
              </PillarText>
            </Pillar>
          </Pillars>
        </Container>
      </Section>

      {/* WHAT WE GIVE — partnership/roles */}
      <Section $tone="bg" id="join">
        <Container>
          <SectionHead>
            <Kicker>What We Offer</Kicker>
            <H2>One network, six ways to participate.</H2>
            <Lead>
              Freecode Academy is a partnership ecosystem. Whatever role you
              take, you get direct access to people, projects and deal flow that
              don't exist on public platforms.
            </Lead>
          </SectionHead>
          <Roles>
            <Role>
              <RoleBadge>Member</RoleBadge>
              <RoleTitle>Community Participant</RoleTitle>
              <RoleText>
                Read insights, publish your work, follow people who actually
                ship. Stay close to a real signal.
              </RoleText>
              <RoleList>
                <li>Curated publications</li>
                <li>Direct member messaging</li>
                <li>Early access to offers</li>
              </RoleList>
            </Role>
            <Role>
              <RoleBadge>Client</RoleBadge>
              <RoleTitle>Project Owner</RoleTitle>
              <RoleText>
                Bring a problem. We help define it, assemble the right team, and
                deliver — with accountability for the outcome.
              </RoleText>
              <RoleList>
                <li>AI-assisted brief refinement</li>
                <li>Verified teams, not gigs</li>
                <li>Shared quality guarantee</li>
              </RoleList>
            </Role>
            <Role>
              <RoleBadge>Team Lead</RoleBadge>
              <RoleTitle>Studio &amp; Crew Lead</RoleTitle>
              <RoleText>
                Run your projects, assemble cross-studio teams, take on work
                bigger than you could deliver alone.
              </RoleText>
              <RoleList>
                <li>New deal flow</li>
                <li>Cross-studio collaboration</li>
                <li>Co-delivery infrastructure</li>
              </RoleList>
            </Role>
            <Role>
              <RoleBadge>Founder</RoleBadge>
              <RoleTitle>Builder &amp; Operator</RoleTitle>
              <RoleText>
                Find co-founders, technical partners and early operators inside
                a network that has shipped together for years.
              </RoleText>
              <RoleList>
                <li>Founder-to-founder intros</li>
                <li>Talent for early traction</li>
                <li>Investor & mentor access</li>
              </RoleList>
            </Role>
            <Role>
              <RoleBadge>Investor</RoleBadge>
              <RoleTitle>Angel &amp; Backer</RoleTitle>
              <RoleText>
                Get a private window into projects before they hit the open
                market. Back people we already vouch for.
              </RoleText>
              <RoleList>
                <li>Curated deal pipeline</li>
                <li>Operator-level diligence</li>
                <li>Discreet, signal-only updates</li>
              </RoleList>
            </Role>
            <Role>
              <RoleBadge>Mentor</RoleBadge>
              <RoleTitle>Advisor &amp; Guide</RoleTitle>
              <RoleText>
                Share what you know with people who actually do the work, and
                shape the next generation of operators.
              </RoleText>
              <RoleList>
                <li>Match with relevant builders</li>
                <li>Lightweight, on-demand format</li>
                <li>Reputation that compounds</li>
              </RoleList>
            </Role>
          </Roles>
        </Container>
      </Section>

      {/* THE OFFER ENTITY */}
      <Section $tone="white">
        <Container>
          <Split $reverse>
            <SplitImg>
              <img
                src={labImg.src}
                alt="AI lab workspace"
                loading="lazy"
                width={1024}
                height={1024}
              />
            </SplitImg>
            <SplitText>
              <Kicker>Universal Currency</Kicker>
              <H2>Everything starts with an Offer.</H2>
              <p>
                One simple, universal entity —{' '}
                <strong>title, image, description, story</strong> — that any
                active member can publish.
              </p>
              <p>
                A collaboration. A job. A joint venture. A piece of research. An
                investment thesis. Mentorship. Whatever you bring to the table,
                Offers are how the network sees you.
              </p>
              <p>
                Our AI agent reads every Offer, every member, every project —
                and quietly connects the right people.{' '}
                <strong>No feeds. No noise. No cold pitches.</strong>
              </p>
            </SplitText>
          </Split>
        </Container>
      </Section>

      {/* MANIFESTO */}
      <Section $tone="bg">
        <Container>
          <Manifesto>
            <Kicker style={{ color: theme.brand }}>Why Now</Kicker>
            <H2>
              Public marketplaces are drowning. We chose the opposite path.
            </H2>
            <p>
              While open platforms collapse under spam and AI slop, we stay
              small, curated and accountable. A quiet oasis — where work still
              happens, and where talent still gets paid.
            </p>
          </Manifesto>
        </Container>
      </Section>

      {/* TIMELINE */}
      <Section $tone="cream">
        <Container>
          <SectionHead>
            <Kicker>Our Story</Kicker>
            <H2>14 years of building, one quiet network.</H2>
          </SectionHead>
          <Timeline>
            <TimeCard>
              <TimeYear>2012</TimeYear>
              <TimeTitle>The seed</TimeTitle>
              <TimeText>
                Started as a closed circle for studios and engineers tired of
                public marketplaces and lowest-bid culture.
              </TimeText>
            </TimeCard>
            <TimeCard>
              <TimeYear>2018 — 2023</TimeYear>
              <TimeTitle>Quiet growth</TimeTitle>
              <TimeText>
                4,000+ members and 100+ studios joined organically — built on
                referrals, real projects, and reputation.
              </TimeText>
            </TimeCard>
            <TimeCard>
              <TimeYear>2026</TimeYear>
              <TimeTitle>The AI relaunch</TimeTitle>
              <TimeText>
                Rebuilt for the AI era: an AI-native chat, the Offer entity, and
                shared responsibility at the core.
              </TimeText>
            </TimeCard>
          </Timeline>
        </Container>
      </Section>

      {/* PHILOSOPHY IMAGE */}
      <Section $tone="bg">
        <Container>
          <Split>
            <SplitText>
              <Kicker>How We Work</Kicker>
              <H2>A virtual company, not a freelance pool.</H2>
              <p>
                Members are independent — but when a project starts, we operate
                as <strong>one company</strong>. Defined roles, defined quality,
                shared responsibility.
              </p>
              <p>
                That's the line we draw between us and every other "talent
                platform" you've used before.
              </p>
            </SplitText>
            <SplitImg>
              <img
                src={philosophyImg.src}
                alt="Team collaborating"
                loading="lazy"
                width={1024}
                height={1024}
              />
            </SplitImg>
          </Split>
        </Container>
      </Section>

      {/* FOUNDER */}
      <Section $tone="white">
        <Container>
          <SectionHead>
            <Kicker>Founder</Kicker>
            <H2>Built by an operator, not a marketer.</H2>
          </SectionHead>
          <QuoteWrap>
            <QuoteImg aria-label="Founder portrait" />
            <QuoteBody>
              <blockquote>
                "I left a stable job to focus on this fully. While everyone
                complains the market is dying, my own client work keeps growing
                — because AI lets a small, sharp team do what teams of twenty
                used to do. I'm opening the door for people who want to build
                inside that reality with me."
              </blockquote>
              <cite>
                <strong>Founder, Nikolai Lanets</strong>
                18+ years in engineering, design and AI delivery
              </cite>
            </QuoteBody>
          </QuoteWrap>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <FinalCTA>
        <Container>
          <Eyebrow>Invite-only · Curated · Real outcomes</Eyebrow>
          <H2 style={{ marginTop: 22 }}>
            Want to be part of the next chapter?
          </H2>
          <Lead>
            Membership is by invitation. If our philosophy resonates with how
            you already work — let's talk.
          </Lead>
          <CTAGroup>
            <PrimaryBtn href="#">Request an Invite →</PrimaryBtn>
            <GhostBtn href="https://t.me/freecode_academy">
              Join Telegram Channel
            </GhostBtn>
          </CTAGroup>
        </Container>
      </FinalCTA>
    </>
  )
}
