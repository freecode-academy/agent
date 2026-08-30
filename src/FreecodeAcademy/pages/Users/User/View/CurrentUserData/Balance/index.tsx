import React, { useCallback, useState } from 'react'
import {
  MeUserFragment,
  useRequestTopUpMutation,
  useTopUpBalanceMutation,
} from 'src/gql/generated'
import {
  BalanceStyled,
  BalanceAmountStyled,
  BalanceFormStyled,
  BalanceInputStyled,
  BalanceAddressStyled,
  BalanceStatusStyled,
} from './styles'
import { Button } from 'src/ui-kit/Button'
import { useSnackbar } from 'src/ui-kit/Snackbar'
import { ComponentVariant } from 'src/ui-kit/interfaces'
import { transactionsRefreshQueriesList } from '../Transactions/interfaces'
import { MetaMaskAuth } from 'src/components/Auth/MetaMaskAuth'
import { useLexicon } from 'src/Custom/Lexicon'
import { balanceLexicon } from './lexicon'

const CRYPTO_CHAIN_ID = process.env.NEXT_PUBLIC_CRYPTO_CHAIN_ID
const CRYPTO_CHAIN_ID_HEX = process.env.NEXT_PUBLIC_CRYPTO_CHAIN_ID_HEX

type BalanceProps = {
  currentUser: MeUserFragment
}

export const Balance: React.FC<BalanceProps> = ({ currentUser }) => {
  const { t } = useLexicon(balanceLexicon)
  const ethAccount = currentUser.EthAccount

  const { addMessage } = useSnackbar() || {}
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const [requestTopUp] = useRequestTopUpMutation()
  const [topUpBalance] = useTopUpBalanceMutation({
    refetchQueries: transactionsRefreshQueriesList,
  })

  const handleTopUp = useCallback(async () => {
    if (!window.ethereum?.isMetaMask) {
      addMessage?.(t('balance.errors.metaMaskNotInstalled'), {
        variant: 'error',
      })
      return
    }

    const amountNum = parseFloat(amount)
    if (!amountNum || amountNum <= 0) {
      addMessage?.(t('balance.errors.enterValidAmount'), { variant: 'error' })
      return
    }

    setLoading(true)

    try {
      const accounts = (await window.ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[]

      if (!accounts || accounts.length === 0) {
        throw new Error(t('balance.errors.noAccountsFound'))
      }

      const userAddress = accounts[0]

      if (userAddress.toLowerCase() !== ethAccount?.address?.toLowerCase()) {
        throw new Error(t('balance.errors.walletMismatch'))
      }

      const chainId = (await window.ethereum.request({
        method: 'eth_chainId',
      })) as string

      if (
        CRYPTO_CHAIN_ID &&
        CRYPTO_CHAIN_ID_HEX &&
        parseInt(chainId, 16) !== parseInt(CRYPTO_CHAIN_ID, 10)
      ) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: CRYPTO_CHAIN_ID_HEX }],
        })
      }

      const topUpRequest = await requestTopUp()

      const requestData = topUpRequest.data?.requestTopUp
      if (!requestData?.message) {
        throw new Error(t('balance.errors.failedToGetRequest'))
      }

      const signature = (await window.ethereum.request({
        method: 'personal_sign',
        params: [requestData.message, userAddress],
      })) as string

      const amountWei = BigInt(Math.floor(amountNum * 1e6)).toString(16)

      const txHash = (await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: userAddress,
            to: requestData.usdtContractAddress,
            data:
              '0xa9059cbb' +
              requestData.recipientAddress?.slice(2).padStart(64, '0') +
              amountWei.padStart(64, '0'),
          },
        ],
      })) as string

      setStatus(t('balance.verifyingTransaction'))

      const result = await topUpBalance({
        variables: {
          data: {
            message: requestData.message,
            signature,
            txHash,
          },
        },
      })

      if (result.data?.topUpBalance) {
        addMessage?.(t('balance.success.balanceTopUp'), { variant: 'success' })
        setAmount('')
        setStatus(null)
      }
    } catch (error) {
      addMessage?.(
        (error as Error).message || t('balance.errors.topUpFailed'),
        {
          variant: 'error',
        },
      )
      setStatus(null)
    } finally {
      setLoading(false)
    }
  }, [amount, ethAccount?.address, addMessage, requestTopUp, topUpBalance, t])

  const onChangeAmount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(event.target.value)
    },
    [],
  )

  return (
    process.env.NEXT_PUBLIC_CRYPTO_ENABLED === 'true' && (
      <BalanceStyled>
        {ethAccount && (
          <BalanceAddressStyled>{ethAccount.address}</BalanceAddressStyled>
        )}
        <BalanceAmountStyled>
          {t('balance.yourBalance')}: {currentUser.Balance?.amount ?? 0}{' '}
          {t('balance.coins')}
        </BalanceAmountStyled>
        {ethAccount ? (
          <BalanceFormStyled>
            <BalanceInputStyled
              type="number"
              placeholder={t('balance.usdtAmount')}
              value={amount}
              onChange={onChangeAmount}
              disabled={loading}
              min="0"
              step="1"
            />
            <Button
              type="button"
              onClick={handleTopUp}
              disabled={loading || !amount}
              variant={ComponentVariant.PRIMARY}
            >
              {loading ? t('balance.processing') : t('balance.topUp')}
            </Button>
          </BalanceFormStyled>
        ) : (
          <>
            {t('balance.connectMetaMask')}
            <MetaMaskAuth referrerToken={null} />
          </>
        )}
        {status && <BalanceStatusStyled>{status}</BalanceStatusStyled>}
      </BalanceStyled>
    )
  )
}
