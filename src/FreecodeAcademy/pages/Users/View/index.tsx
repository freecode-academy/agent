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
} from 'src/FreecodeAcademy/Layout/styles'

import { UserFragment } from 'src/gql/generated'

import membersImg from '@/assets/members.jpg'
import { Badge, BadgeRow } from 'src/FreecodeAcademy/Layout/components/Badge'
import {
  CrossCard,
  CrossLinks,
} from 'src/FreecodeAcademy/Layout/components/CrossLinks'
import {
  WhyItem,
  WhyStrip,
} from 'src/FreecodeAcademy/Layout/components/WhyStrip'
import { getResizedImagePath } from 'src/helpers/getResizedImagePath'
import { createUserLink } from 'src/components/Link/User'
import { Markdown } from 'src/components/Markdown'
import { useAppContext } from 'src/components/AppContext'
import { Pagination } from 'src/components/Pagination'
import { useLexicon } from 'src/Custom/Lexicon'
import { usersViewLexicon } from './lexicon'

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
  const { t } = useLexicon(usersViewLexicon)
  const { user: currentUser } = useAppContext()

  const showContent = page < 2 && !currentUser

  const totalPages = count ? Math.ceil(count / limit) : 0

  return (
    <>
      <Hero>
        <HeroInner>
          <div>
            <Eyebrow>{t('usersView.hero.eyebrow')}</Eyebrow>

            {showContent && (
              <>
                <H1>{t('usersView.hero.title')}</H1>
                <Sub>{t('usersView.hero.sub')}</Sub>
              </>
            )}
          </div>

          {showContent && (
            <>
              <WhyStrip>
                <WhyItem>
                  <strong>{t('usersView.why.readEverything')}</strong>
                  <span>{t('usersView.why.readEverythingDesc')}</span>
                </WhyItem>
                <WhyItem>
                  <strong>{t('usersView.why.contactInviteOnly')}</strong>
                  <span>{t('usersView.why.contactInviteOnlyDesc')}</span>
                </WhyItem>
                <WhyItem>
                  <strong>{t('usersView.why.formTeams')}</strong>
                  <span>{t('usersView.why.formTeamsDesc')}</span>
                </WhyItem>
              </WhyStrip>

              <LockedNotice>{t('usersView.lockedNotice')}</LockedNotice>

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
              <H2>{t('usersView.section.title')}</H2>
              <SectionLede>{t('usersView.section.lede')}</SectionLede>
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
                        {t('usersView.card.teams')}:{' '}
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
                <strong>{t('usersView.crossLinks.formTeam.title')}</strong>
                <span>{t('usersView.crossLinks.formTeam.text')}</span>
                <em>{t('usersView.crossLinks.formTeam.cta')}</em>
              </CrossCard>
              <CrossCard href="/offers">
                <strong>{t('usersView.crossLinks.browseOffers.title')}</strong>
                <span>{t('usersView.crossLinks.browseOffers.text')}</span>
                <em>{t('usersView.crossLinks.browseOffers.cta')}</em>
              </CrossCard>
              <CrossCard href="/about">
                <strong>{t('usersView.crossLinks.howWeVet.title')}</strong>
                <span>{t('usersView.crossLinks.howWeVet.text')}</span>
                <em>{t('usersView.crossLinks.howWeVet.cta')}</em>
              </CrossCard>
            </CrossLinks>
          )}
        </Container>
      </Section>
    </>
  )
}
