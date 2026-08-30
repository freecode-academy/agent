import {
  Card,
  CardBody,
  CardImg,
  // CardLink,
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
import { OffersPageViewProps } from './interfaces'
import {
  WhyItem,
  WhyStrip,
} from 'src/FreecodeAcademy/Layout/components/WhyStrip'

import offersImg from '@/assets/offers.jpg'
import { Badge, BadgeRow } from 'src/FreecodeAcademy/Layout/components/Badge'
import {
  CrossCard,
  CrossLinks,
} from 'src/FreecodeAcademy/Layout/components/CrossLinks'
import { getResizedImagePath } from 'src/helpers/getResizedImagePath'
import { UserLink } from 'src/components/Link/User'
import Link from 'next/link'
import { Markdown } from 'src/components/Markdown'
import { Pagination } from 'src/components/Pagination'
import { makeOfferLink } from 'src/components/Link/Offer'
import { useAppContext } from 'src/components/AppContext'

export const OffersPageView: React.FC<OffersPageViewProps> = ({
  offers,
  count,
  page,
  limit,
}) => {
  const { user: currentUser } = useAppContext()

  const showContent = page < 2 && !currentUser

  const totalPages = count ? Math.ceil(count / limit) : 0

  return (
    <>
      <Hero>
        <HeroInner>
          <div>
            <Eyebrow>Offers</Eyebrow>

            {showContent && (
              <>
                <H1>Anything you want to propose. In one format.</H1>
                <Sub>
                  An offer is a free-form proposal from a member. A service, a
                  collaboration, a research partnership, a hiring intent — same
                  simple structure: what it is, who it's from, why it exists.
                </Sub>
              </>
            )}
          </div>

          {showContent && (
            <>
              <WhyStrip>
                <WhyItem>
                  <strong>Service</strong>
                  <span>Sell what you do, with a clear scope.</span>
                </WhyItem>
                <WhyItem>
                  <strong>Collaboration</strong>
                  <span>Find a co-founder or build something together.</span>
                </WhyItem>
                <WhyItem>
                  <strong>Research / Hiring</strong>
                  <span>Joint study, contract role, anything in between.</span>
                </WhyItem>
              </WhyStrip>
              <HeroImage
                $src={offersImg.src}
                role="img"
                aria-label="Offers and proposals"
              />
            </>
          )}
        </HeroInner>
      </Hero>

      <Section>
        <Container>
          {showContent && (
            <>
              <H2>Open offers</H2>
              <SectionLede>
                Real proposals from real members. Click through to see the full
                pitch and (if you have access) write directly.
              </SectionLede>
            </>
          )}

          <Grid $cols={3}>
            {offers.map((n) => {
              const { id, title, image, intro, CreatedBy } = n

              const kind: string = ''

              return (
                <Card key={id}>
                  <CardImg
                    $src={
                      (image &&
                        getResizedImagePath({
                          path: image,
                          size: 'middle',
                        })) ||
                      offersImg.src
                    }
                  />
                  <CardBody>
                    {kind && (
                      <BadgeRow>
                        <Badge
                          tone={
                            kind === 'Service'
                              ? 'brand'
                              : kind === 'Collaboration'
                                ? 'blue'
                                : kind === 'Research'
                                  ? 'amber'
                                  : 'green'
                          }
                        >
                          {kind}
                        </Badge>
                        {/* {rate && <Badge>{rate}</Badge>} */}
                      </BadgeRow>
                    )}
                    <CardTitle as={Link} href={makeOfferLink(n)}>
                      {title}
                    </CardTitle>
                    <Markdown>{intro}</Markdown>
                    {/* {author && (
                      <CardMeta>
                        By {author.name} · {author.role}
                      </CardMeta>
                    )} */}
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
              <CrossCard href="/people">
                <strong>Behind every offer is a person →</strong>
                <span>Check who's writing before you reply.</span>
                <em>See members</em>
              </CrossCard>
              <CrossCard href="/teams">
                <strong>Team offers carry more weight →</strong>
                <span>A team can promise delivery, not just hours.</span>
                <em>See teams</em>
              </CrossCard>
              <CrossCard href="/projects">
                <strong>Offers often spawn projects →</strong>
                <span>
                  And projects spawn tasks. The full chain works here.
                </span>
                <em>See projects</em>
              </CrossCard>
            </CrossLinks>
          )}
        </Container>
      </Section>
    </>
  )
}
