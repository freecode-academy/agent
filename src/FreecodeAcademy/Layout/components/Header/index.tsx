import Link from 'next/link'
import { Logo, NavInner, NavLinks } from '../../styles'
import { Authority } from '../Authority'
import { BurgerCheckbox, BurgerLabel, HeaderStyled, MobileMenu } from './styles'
import { useCallback, useEffect, useRef } from 'react'
import { useLexicon } from 'src/Custom/Lexicon'
import { headerLexicon } from './lexicon'

const togglerId = 'burger-toggle'

export const Header: React.FC = () => {
  const { t } = useLexicon(headerLexicon)
  const burgerRef = useRef<HTMLLabelElement>(null)

  const onClickBurger = useCallback(
    (event: React.MouseEvent<HTMLLabelElement>) => {
      event.preventDefault()
      event.stopPropagation()

      const checkbox = document.getElementById(
        togglerId,
      ) as HTMLInputElement | null

      if (checkbox) {
        checkbox.checked = !checkbox.checked
      }
    },
    [],
  )

  useEffect(() => {
    const handleClick = (_event: MouseEvent) => {
      const checkbox = document.getElementById(togglerId)

      if (
        !checkbox ||
        !(checkbox instanceof HTMLInputElement) ||
        !checkbox?.checked
      ) {
        return
      }

      checkbox.checked = false
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <HeaderStyled>
      <BurgerCheckbox type="checkbox" id={togglerId} />
      <NavInner>
        <Logo href="/">{t('header.logo')}</Logo>
        <MobileMenu>
          <NavLinks>
            <Link href="/about">{t('header.nav.about')}</Link>
            <Link href="/people">{t('header.nav.members')}</Link>
            <Link href="/teams">{t('header.nav.teams')}</Link>
            <Link href="/offers">{t('header.nav.offers')}</Link>
            <Link href="/projects">{t('header.nav.projects')}</Link>
            <Link href="/tasks">{t('header.nav.tasks')}</Link>
            <Link href="/topics">{t('header.nav.topics')}</Link>
          </NavLinks>
          <Authority>{t('header.getAccess')}</Authority>
        </MobileMenu>
        <BurgerLabel
          ref={burgerRef}
          htmlFor={togglerId}
          aria-label={t('header.menu')}
          onClick={onClickBurger}
        >
          <span />
          <span />
          <span />
        </BurgerLabel>
      </NavInner>
    </HeaderStyled>
  )
}
