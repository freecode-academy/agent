import React, { useCallback, useState } from 'react'
import {
  PhoneNumberStyled,
  PhoneNumberMaskedStyled,
  PhoneNumberLinkStyled,
  PhoneNumberRevealButtonStyled,
} from './styles'
import { ShowButton } from '../Button/ShowButton'
import { PhoneIcon } from '../icons/PhoneIcon'

interface PhoneNumberProps {
  value: string
  className?: string
  variant?: 'text' | 'icon'
}

const maskPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 4) {
    return '***'
  }
  const lastDigits = digits.slice(-4)
  return `*** *** ${lastDigits.slice(0, 2)} ${lastDigits.slice(2)}`
}

export const PhoneNumber: React.FC<PhoneNumberProps> = ({
  value,
  className,
  variant = 'text',
}) => {
  const [revealed, setRevealed] = useState(false)

  const handleReveal = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()
      setRevealed(true)
    },
    [],
  )

  if (revealed && variant === 'icon') {
    window.location.href = `tel:${value.replace(/[^+\d]/g, '')}`
    return null
  }

  if (variant === 'icon') {
    return (
      <PhoneNumberRevealButtonStyled
        onClick={handleReveal}
        type="button"
        aria-label="Позвонить нам"
        className={`icon-variant ${className || ''}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <circle cx="20" cy="20" r="20" fill="#90B820" />
          <path
            d="M22.8586 22.2647L22.4284 22.6909C22.4284 22.6909 21.406 23.704 18.6151 20.9386C15.8243 18.1732 16.8468 17.1601 16.8468 17.1601L17.1176 16.8917C17.785 16.2304 17.8479 15.1689 17.2656 14.3939L16.0747 12.8085C15.3541 11.8493 13.9617 11.7226 13.1358 12.541L11.6534 14.0099C11.2439 14.4157 10.9694 14.9417 11.0027 15.5253C11.0879 17.0182 11.7657 20.2303 15.5478 23.978C19.5586 27.9522 23.322 28.1102 24.8609 27.9672C25.3477 27.922 25.771 27.675 26.1121 27.3369L27.4538 26.0076C28.3594 25.1102 28.1041 23.5717 26.9453 22.944L25.141 21.9665C24.3801 21.5544 23.4532 21.6754 22.8586 22.2647Z"
            fill="white"
          />
        </svg>
      </PhoneNumberRevealButtonStyled>
    )
  }

  return (
    <PhoneNumberStyled className={className}>
      <ShowButton
        onClick={handleReveal}
        aria-label="Показать телефон"
        icon={<PhoneIcon crossed={!revealed} />}
      />
      {revealed ? (
        <PhoneNumberLinkStyled href={`tel:${value.replace(/[^+\d]/g, '')}`}>
          {value}
        </PhoneNumberLinkStyled>
      ) : (
        <PhoneNumberMaskedStyled>{maskPhone(value)}</PhoneNumberMaskedStyled>
      )}
    </PhoneNumberStyled>
  )
}
