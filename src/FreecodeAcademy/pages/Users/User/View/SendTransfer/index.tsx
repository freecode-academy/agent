import React, { useCallback, useState } from 'react'
import {
  MeUserFragment,
  UserFragment,
  useCreateTransferMutation,
} from 'src/gql/generated'
import {
  SendTransferStyled,
  SendTransferHeaderStyled,
  SendTransferFormStyled,
  SendTransferFieldStyled,
  SendTransferLabelStyled,
  SendTransferInputStyled,
  SendTransferActionsStyled,
  SendTransferErrorStyled,
  SendTransferSuccessStyled,
} from './styles'
import { Button } from 'src/ui-kit/Button'
import { ComponentVariant } from 'src/ui-kit/interfaces'
import { Balance } from '../CurrentUserData/Balance'
import { transactionsRefreshQueriesList } from '../CurrentUserData/Transactions/interfaces'
import { useLexicon } from 'src/Custom/Lexicon'
import { sendTransferLexicon } from './lexicon'

type SendTransferProps = {
  currentUser: MeUserFragment
  recipient: UserFragment
}

export const SendTransfer: React.FC<SendTransferProps> = ({
  currentUser,
  recipient,
}) => {
  const { t } = useLexicon(sendTransferLexicon)
  const balance = currentUser.Balance

  const [amount, setAmount] = useState('')
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [createTransfer, { loading }] = useCreateTransferMutation()

  const handleSubmit = useCallback(
    async (e: React.SubmitEvent) => {
      e.preventDefault()
      setError(null)
      setSuccess(null)

      const amountNum = parseFloat(amount)
      if (!amountNum || amountNum <= 0) {
        setError(t('sendTransfer.errors.enterValidAmount'))
        return
      }

      const currentBalance = currentUser?.Balance?.amount ?? 0
      if (amountNum > currentBalance) {
        setError(t('sendTransfer.errors.insufficientFunds'))
        return
      }

      if (!recipient.id) {
        setError(t('sendTransfer.errors.invalidRecipient'))
        return
      }

      const confirm = window.confirm(
        t('sendTransfer.confirm', { amount: amountNum }),
      )

      if (!confirm) {
        return
      }

      try {
        const result = await createTransfer({
          variables: {
            data: {
              toUserId: recipient.id,
              amount: amountNum,
              title: title || null,
            },
          },
          refetchQueries: transactionsRefreshQueriesList,
        })

        if (result.data?.createTransfer) {
          setSuccess(t('sendTransfer.success', { amount: amountNum }))
          setAmount('')
          setTitle('')
        }
      } catch (err) {
        setError(
          (err as Error).message || t('sendTransfer.errors.transferFailed'),
        )
      }
    },
    [
      amount,
      title,
      recipient.id,
      currentUser?.Balance?.amount,
      createTransfer,
      t,
    ],
  )

  const onChangeAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(e.target.value)
      setError(null)
      setSuccess(null)
    },
    [],
  )

  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value)
    },
    [],
  )

  const recipientName = recipient.fullname || recipient.username || 'User'

  return process.env.NEXT_PUBLIC_CRYPTO_ENABLED === 'true' && balance ? (
    <SendTransferStyled>
      <Balance currentUser={currentUser} />

      <SendTransferHeaderStyled>
        {t('sendTransfer.title')}
      </SendTransferHeaderStyled>

      <SendTransferFormStyled onSubmit={handleSubmit}>
        <SendTransferFieldStyled>
          <SendTransferLabelStyled>
            {t('sendTransfer.fields.to')}
          </SendTransferLabelStyled>
          <SendTransferInputStyled type="text" value={recipientName} disabled />
        </SendTransferFieldStyled>

        <SendTransferFieldStyled>
          <SendTransferLabelStyled>
            {t('sendTransfer.fields.amount')}
          </SendTransferLabelStyled>
          <SendTransferInputStyled
            type="number"
            placeholder="0"
            value={amount}
            onChange={onChangeAmount}
            disabled={loading}
            min="0"
            step="0.0001"
          />
        </SendTransferFieldStyled>

        <SendTransferFieldStyled>
          <SendTransferLabelStyled>
            {t('sendTransfer.fields.comment')}
          </SendTransferLabelStyled>
          <SendTransferInputStyled
            type="text"
            placeholder={t('sendTransfer.fields.commentPlaceholder')}
            value={title}
            onChange={onChangeTitle}
            disabled={loading}
          />
        </SendTransferFieldStyled>

        {error && <SendTransferErrorStyled>{error}</SendTransferErrorStyled>}
        {success && (
          <SendTransferSuccessStyled>{success}</SendTransferSuccessStyled>
        )}

        <SendTransferActionsStyled>
          <Button
            type="submit"
            disabled={loading || !amount}
            variant={ComponentVariant.PRIMARY}
          >
            {loading
              ? t('sendTransfer.buttons.sending')
              : t('sendTransfer.buttons.send')}
          </Button>
        </SendTransferActionsStyled>
      </SendTransferFormStyled>
    </SendTransferStyled>
  ) : null
}
