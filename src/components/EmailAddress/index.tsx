import React, { useCallback, useState } from 'react'
import {
  EmailAddressStyled,
  EmailAddressMaskedStyled,
  EmailAddressLinkStyled,
} from './styles'
import { ShowButton } from '../Button/ShowButton'
import { EmailIcon } from '../icons/EmailIcon'

interface EmailAddressProps {
  value: string
  className?: string
}

const maskEmail = (email: string): string => {
  const [local, domain] = email.split('@')
  if (!domain) {
    return '***'
  }
  const maskedLocal = local.length > 1 ? local[0] + '***' : '***'
  return `${maskedLocal}@${domain}`
}

export const EmailAddress: React.FC<EmailAddressProps> = ({
  value,
  className,
}) => {
  const [revealed, setRevealed] = useState(false)

  const handleReveal = useCallback(() => {
    setRevealed(true)
  }, [])

  return (
    <EmailAddressStyled className={className}>
      <ShowButton
        onClick={handleReveal}
        type="button"
        aria-label="Показать email"
        icon={<EmailIcon crossed={!revealed} />}
      />
      {revealed ? (
        <EmailAddressLinkStyled href={`mailto:${value}`}>
          {value}
        </EmailAddressLinkStyled>
      ) : (
        <EmailAddressMaskedStyled>{maskEmail(value)}</EmailAddressMaskedStyled>
      )}
    </EmailAddressStyled>
  )
}
