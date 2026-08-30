import React from 'react'
import { TransactionType } from 'src/gql/generated'
import { TransactionTypeStyled } from '../styles'
import { useLexicon } from 'src/Custom/Lexicon'
import { transactionTypeLexicon } from './lexicon'
import { TFunction } from 'i18next'

interface TransactionTypeProps {
  type: TransactionType
  title?: string | null
  isIncoming: boolean
}

const getTransactionTypeName = (
  type: TransactionType,
  t: TFunction,
): string => {
  switch (type) {
    case TransactionType.TRANSFERIN:
      return t('transactionType.topUp')
    case TransactionType.TRANSFEROUT:
      return t('transactionType.transfer')
    case TransactionType.TOPUP:
      return t('transactionType.balanceTopUp')
  }
}

export const TransactionTypeComponent: React.FC<TransactionTypeProps> = ({
  type,
  title,
  isIncoming,
}) => {
  const { t } = useLexicon(transactionTypeLexicon)
  const typeName = getTransactionTypeName(type, t)

  return (
    <TransactionTypeStyled $isIncoming={isIncoming}>
      {typeName}
      {title && `: ${title}`}
    </TransactionTypeStyled>
  )
}
