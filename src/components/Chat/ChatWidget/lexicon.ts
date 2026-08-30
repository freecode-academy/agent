import { LexiconDict } from 'src/Custom/Lexicon'

export const chatLexicon: LexiconDict = {
  en: {
    chat: {
      welcomeTitle: 'Hello! How can I help?',
      welcomeText: 'Ask anything',
      placeholder: 'Type your message...',
    },
    error: {
      unknown: 'Unknown error',
      somethingWentWrong: 'Sorry, something went wrong. Please try again.',
    },
  },
  ru: {
    chat: {
      welcomeTitle: 'Привет! Чем могу помочь?',
      welcomeText: 'Спросите что угодно',
      placeholder: 'Введите ваше сообщение...',
    },
    error: {
      unknown: 'Неизвестная ошибка',
      somethingWentWrong: 'Извините, что-то пошло не так. Попробуйте снова.',
    },
  },
}
