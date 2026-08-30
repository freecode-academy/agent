import React, { useCallback, useState } from 'react'
import {
  GetReferrerTokenRowStyled,
  GetReferrerTokenStyled,
  GetReferrerTokenTextStyled,
} from './styles'
import { Button } from 'src/ui-kit/Button'
import { useCreateReferrerTokenMutation } from 'src/gql/generated'
import { useSnackbar } from 'src/ui-kit/Snackbar'
import { useCopy } from 'src/hooks/useCopy'
import { ComponentVariant } from 'src/ui-kit/interfaces'
import { GET_PARAM_REFERRERTOKEN_NAME } from 'src/components/Auth/SignUpForm/interfaces'
import { useLexicon } from 'src/Custom/Lexicon'
import { getReferrerTokenLexicon } from './lexicon'

export const GetReferrerToken: React.FC = () => {
  const { t } = useLexicon(getReferrerTokenLexicon)
  const { addMessage } = useSnackbar() || {}

  const [token, tokenSetter] = useState<string>()

  const [mutation, { loading }] = useCreateReferrerTokenMutation()

  const onClickGetToken = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation()

      mutation()
        .then((r) => {
          if (r.data?.createReferrerToken) {
            tokenSetter(r.data?.createReferrerToken)
          } else {
            addMessage?.(t('getReferrerToken.errors.cannotGetToken'), {
              variant: 'error',
            })
          }
        })
        .catch((error: Error) => {
          addMessage?.(
            error.message || t('getReferrerToken.errors.unknownError'),
            {
              variant: 'error',
            },
          )
        })
    },
    [addMessage, mutation, t],
  )

  const { onClickCopy } = useCopy()

  return (
    <GetReferrerTokenStyled>
      <div>
        <Button onClick={onClickGetToken} disabled={loading}>
          {t('getReferrerToken.createToken')}
        </Button>
      </div>

      {token && (
        <GetReferrerTokenRowStyled>
          <GetReferrerTokenTextStyled>{token}</GetReferrerTokenTextStyled>
          <Button onClick={onClickCopy} value={token}>
            {t('getReferrerToken.copyToken')}
          </Button>
          <Button
            onClick={onClickCopy}
            value={`${global.window.origin}/signup?${GET_PARAM_REFERRERTOKEN_NAME}=${token}`}
            variant={ComponentVariant.SUCCESS}
          >
            {t('getReferrerToken.copyLink')}
          </Button>
        </GetReferrerTokenRowStyled>
      )}
    </GetReferrerTokenStyled>
  )
}
