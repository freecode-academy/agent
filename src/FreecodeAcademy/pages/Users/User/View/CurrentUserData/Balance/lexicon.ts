import { LexiconDict } from 'src/Custom/Lexicon'

export const balanceLexicon: LexiconDict = {
  ru: {
    balance: {
      yourBalance: 'Ваш баланс',
      coins: 'Coins',
      usdtAmount: 'Сумма USDT',
      processing: 'Обработка...',
      topUp: 'Пополнить',
      connectMetaMask:
        'Подключите MetaMask, чтобы иметь возможность пополнить баланс',
      verifyingTransaction: 'Проверка транзакции в блокчейне...',
      errors: {
        metaMaskNotInstalled: 'MetaMask не установлен',
        enterValidAmount: 'Введите корректную сумму',
        noAccountsFound: 'Аккаунты не найдены',
        walletMismatch: 'Подключённый кошелёк не соответствует вашему аккаунту',
        failedToGetRequest: 'Не удалось получить запрос на пополнение',
        topUpFailed: 'Пополнение не удалось',
      },
      success: {
        balanceTopUp: 'Баланс успешно пополнен!',
      },
    },
  },
  en: {
    balance: {
      yourBalance: 'Your balance',
      coins: 'Coins',
      usdtAmount: 'USDT amount',
      processing: 'Processing...',
      topUp: 'Top up',
      connectMetaMask: 'Connect MetaMask to be able to top up your balance',
      verifyingTransaction: 'Verifying transaction in blockchain...',
      errors: {
        metaMaskNotInstalled: 'MetaMask is not installed',
        enterValidAmount: 'Enter a valid amount',
        noAccountsFound: 'No accounts found',
        walletMismatch: 'Connected wallet does not match your account',
        failedToGetRequest: 'Failed to get top-up request',
        topUpFailed: 'Top-up failed',
      },
      success: {
        balanceTopUp: 'Balance successfully topped up!',
      },
    },
  },
}
