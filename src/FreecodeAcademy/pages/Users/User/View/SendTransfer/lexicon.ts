import { LexiconDict } from 'src/Custom/Lexicon'

export const sendTransferLexicon: LexiconDict = {
  ru: {
    sendTransfer: {
      title: 'Отправить перевод пользователю',
      fields: {
        to: 'Кому',
        amount: 'Сумма (Coins)',
        comment: 'Комментарий (необязательно)',
        commentPlaceholder: 'Для чего этот перевод?',
      },
      buttons: {
        send: 'Отправить',
        sending: 'Отправка...',
      },
      confirm: 'Отправить перевод на {{amount}} coins?',
      success: 'Успешно отправлено {{amount}} Coins!',
      errors: {
        enterValidAmount: 'Введите корректную сумму',
        insufficientFunds: 'Недостаточно средств',
        invalidRecipient: 'Некорректный получатель',
        transferFailed: 'Перевод не удался',
      },
    },
  },
  en: {
    sendTransfer: {
      title: 'Send transfer to user',
      fields: {
        to: 'To',
        amount: 'Amount (Coins)',
        comment: 'Comment (optional)',
        commentPlaceholder: 'What is this transfer for?',
      },
      buttons: {
        send: 'Send',
        sending: 'Sending...',
      },
      confirm: 'Send transfer for {{amount}} coins?',
      success: 'Successfully sent {{amount}} Coins!',
      errors: {
        enterValidAmount: 'Enter a valid amount',
        insufficientFunds: 'Insufficient funds',
        invalidRecipient: 'Invalid recipient',
        transferFailed: 'Transfer failed',
      },
    },
  },
}
