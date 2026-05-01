import Link from 'next/link'
import { Logo, NavInner, NavLinks } from '../../styles'
import { Authority } from '../Authority'
import { BurgerCheckbox, BurgerLabel, HeaderStyled, MobileMenu } from './styles'
import { useCallback, useEffect, useRef } from 'react'

const togglerId = 'burger-toggle'

export const Header: React.FC = () => {
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
        <Logo href="/">Freecode Academy</Logo>
        <MobileMenu>
          <NavLinks>
            <Link href="/about">About</Link>
            <Link href="/people">Members</Link>
            <Link href="/teams">Teams</Link>
            <Link href="/offers">Offers</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/tasks">Tasks</Link>
          </NavLinks>
          <Authority>Get Access</Authority>
        </MobileMenu>
        <BurgerLabel
          ref={burgerRef}
          htmlFor={togglerId}
          aria-label="Menu"
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
